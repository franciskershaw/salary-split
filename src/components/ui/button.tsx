import * as React from "react";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/60",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        success: "bg-success text-white shadow-sm hover:bg-success/90",
        error:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        naked: "",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
        round: "h-12 w-12 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  /**
   * Prevents multiple rapid clicks on the button
   * @default false
   */
  throttleClicks?: boolean;
  /**
   * Time in milliseconds before the button can be clicked again when throttleClicks is true
   * @default 500
   */
  throttleTime?: number;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      throttleClicks = false,
      throttleTime = 500,
      onClick,
      disabled,
      ...props
    },
    ref
  ) => {
    const isThrottledRef = React.useRef(false);
    const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

    // Clear timeout on unmount
    React.useEffect(() => {
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }, []);

    const handleClick = React.useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        if ((throttleClicks && isThrottledRef.current) || disabled) {
          event.preventDefault();
          return;
        }

        if (throttleClicks) {
          // Clear any existing timeout
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }

          isThrottledRef.current = true;
          timeoutRef.current = setTimeout(() => {
            isThrottledRef.current = false;
          }, throttleTime);
        }

        onClick?.(event);
      },
      [onClick, throttleClicks, throttleTime, disabled]
    );

    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={
          variant === "naked"
            ? className
            : cn(buttonVariants({ variant, size, className }))
        }
        ref={ref}
        onClick={handleClick}
        disabled={disabled || (throttleClicks && isThrottledRef.current)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
