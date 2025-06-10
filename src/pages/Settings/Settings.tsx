import { zodResolver } from "@hookform/resolvers/zod";
import { MoonIcon, UserIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import PageWrapper from "@/components/layout/Page/PageWrapper";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Form, { FormInput } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormSelect } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { CURRENCIES } from "@/constants/api";
import { useTheme } from "@/contexts/Theme/ThemeContext";
import useUser from "@/hooks/user/useUser";

import useUpdateTheme from "./hooks/useUpdateTheme";
import useUpdateUser from "./hooks/useUpdateUser";

export const userFormSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  takeHomePay: z.number().min(0),
  defaultCurrency: z.enum([CURRENCIES.GBP, CURRENCIES.USD, CURRENCIES.EUR]),
});

export type UserFormValues = z.infer<typeof userFormSchema>;

const Settings = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const { user } = useUser();
  const { updateUser, isPending } = useUpdateUser();
  const { updateTheme, isPending: isUpdatingTheme } = useUpdateTheme();
  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      firstName: user?.name.firstName ?? "",
      lastName: user?.name.lastName ?? "",
      takeHomePay: user?.takeHomePay ?? 0,
      defaultCurrency: user?.defaultCurrency ?? CURRENCIES.GBP,
    },
  });

  const handleThemeToggle = () => {
    const newTheme = darkMode ? "light" : "dark";
    toggleDarkMode();
    updateTheme(newTheme);
  };

  return (
    <PageWrapper
      title="Settings"
      description="Manage your account settings and preferences"
    >
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex items-center gap-2 text-xl font-medium">
              <UserIcon className="h-6 w-6" />
              Personal information
            </div>
          </CardTitle>
          <CardDescription>Update your personal details.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form
            onSubmit={() => {
              const { firstName, lastName, ...rest } = form.getValues();
              const values = {
                name: {
                  firstName,
                  lastName,
                },
                ...rest,
              };
              updateUser(values);
            }}
            form={form}
          >
            <FormInput name="firstName" label="First name">
              <Input type="text" />
            </FormInput>
            <FormInput name="lastName" label="Last name">
              <Input type="text" />
            </FormInput>
            <FormInput name="takeHomePay" label="Salary">
              <Input type="number" />
            </FormInput>
            <FormSelect
              name="defaultCurrency"
              label="Currency"
              options={[
                { label: CURRENCIES.GBP, value: CURRENCIES.GBP },
                { label: CURRENCIES.USD, value: CURRENCIES.USD },
                { label: CURRENCIES.EUR, value: CURRENCIES.EUR },
              ]}
            />
            <Button
              className="w-full mt-2"
              type="submit"
              disabled={form.formState.isSubmitting || isPending}
            >
              Save
            </Button>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex items-center gap-2 text-xl font-medium">
              <MoonIcon className="h-6 w-6" />
              Appearance
            </div>
          </CardTitle>
          <CardDescription>Update your theme preferences.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <Switch
              defaultChecked={darkMode}
              onCheckedChange={handleThemeToggle}
              disabled={isUpdatingTheme}
            />
            <Label>Dark mode</Label>
          </div>
        </CardContent>
      </Card>
    </PageWrapper>
  );
};

export default Settings;
