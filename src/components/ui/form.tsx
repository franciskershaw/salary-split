import * as React from "react";

import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import {
  Controller,
  FormProvider,
  useFormContext,
  useFormState,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
  type UseFormReturn,
} from "react-hook-form";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type FormProps<TFieldValues extends FieldValues> = {
  onSubmit: (values: TFieldValues) => void | Promise<unknown> | unknown;
  form: UseFormReturn<TFieldValues>;
  children: React.ReactNode;
  className?: string;
  id?: string;
  /**
   * Enable protection against multiple submissions
   * @default true
   */
  preventMultipleSubmits?: boolean;
};

function Form<TFieldValues extends FieldValues>({
  onSubmit,
  form,
  children,
  className,
  preventMultipleSubmits = true,
  ...formProps
}: FormProps<TFieldValues>) {
  const isSubmittingRef = React.useRef(false);

  const handleSubmit = React.useCallback(
    (values: TFieldValues) => {
      if (preventMultipleSubmits && isSubmittingRef.current) {
        return;
      }

      if (preventMultipleSubmits) {
        isSubmittingRef.current = true;

        // Reset the flag after a short delay to ensure it resets even if there are errors
        setTimeout(() => {
          isSubmittingRef.current = false;
        }, 5000);
      }

      return onSubmit(values);
    },
    [onSubmit, preventMultipleSubmits]
  );

  return (
    <FormProvider {...form}>
      <form
        data-slot="form"
        onSubmit={form.handleSubmit(handleSubmit)}
        className={cn("space-y-4", className)}
        {...formProps}
      >
        {children}
      </form>
    </FormProvider>
  );
}

export default Form;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
);

function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ ...props }: ControllerProps<TFieldValues, TName>) {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
}

function useFormField() {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState } = useFormContext();
  const formState = useFormState({ name: fieldContext.name });
  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
}

type FormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
);

function FormItem({ className, ...props }: React.ComponentProps<"div">) {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div
        data-slot="form-item"
        className={cn("space-y-2", className)}
        {...props}
      />
    </FormItemContext.Provider>
  );
}

function FormLabel({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  const { error, formItemId } = useFormField();

  return (
    <Label
      data-slot="form-label"
      data-error={!!error}
      className={cn("data-[error=true]:text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    />
  );
}

function FormControl({ ...props }: React.ComponentProps<typeof Slot>) {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();

  return (
    <Slot
      data-slot="form-control"
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  );
}

function FormDescription({ className, ...props }: React.ComponentProps<"p">) {
  const { formDescriptionId } = useFormField();

  return (
    <p
      data-slot="form-description"
      id={formDescriptionId}
      className={cn("text-[0.8rem] text-muted-foreground", className)}
      {...props}
    />
  );
}

function FormMessage({
  className,
  children,
  ...props
}: React.ComponentProps<"p">) {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message) : children;

  if (!body) {
    return null;
  }

  return (
    <p
      data-slot="form-message"
      id={formMessageId}
      className={cn("text-[0.8rem] font-medium text-destructive", className)}
      {...props}
    >
      {body}
    </p>
  );
}

interface FormInputWrapperProps extends React.PropsWithChildren {
  name: string;
  label?: string;
  showMessage?: boolean;
  className?: string;
}

function FormInput({
  name,
  label,
  children,
  showMessage = true,
  className,
}: FormInputWrapperProps) {
  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormFieldContext.Provider value={{ name: field.name }}>
          <FormItem className={className}>
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>
              {React.cloneElement(children as React.ReactElement, {
                ...field,
              })}
            </FormControl>
            {showMessage && <FormMessage />}
          </FormItem>
        </FormFieldContext.Provider>
      )}
    />
  );
}

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
  FormInput,
};
