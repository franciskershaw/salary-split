import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormInput } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useAuth from "@/pages/Auth/hooks/useAuth";

import { loginSchema, registerSchema } from "./localFormSchema";

type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;
type FormData = LoginFormData | RegisterFormData;

const LocalForm = () => {
  const [isRegister, setIsRegister] = useState(false);

  const { login, register } = useAuth();

  const form = useForm<FormData>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
    },
    resolver: zodResolver(isRegister ? registerSchema : loginSchema),
  });

  const toggleForm = () => {
    setIsRegister(!isRegister);
    form.clearErrors();
  };

  const onSubmit = (data: FormData) => {
    if (isRegister) {
      const registerData = data as RegisterFormData;
      register({
        name: {
          firstName: registerData.firstName,
          lastName: registerData.lastName,
        },
        email: registerData.email,
        password: registerData.password,
      });
    } else {
      const loginData = data as LoginFormData;
      login({
        email: loginData.email,
        password: loginData.password,
      });
    }
  };

  return (
    <Form {...{ form }} onSubmit={onSubmit}>
      {isRegister && (
        <>
          <FormInput name="firstName" label="First Name">
            <Input placeholder="Enter your first name" />
          </FormInput>
          <FormInput name="lastName" label="Last Name">
            <Input placeholder="Enter your last name" />
          </FormInput>
        </>
      )}
      <FormInput name="email" label="Email">
        <Input placeholder="Enter your email" />
      </FormInput>

      <FormInput name="password" label="Password">
        <Input type="password" placeholder="Enter your password" />
      </FormInput>

      {isRegister && (
        <FormInput name="confirmPassword" label="Confirm Password">
          <Input type="password" placeholder="Confirm your password" />
        </FormInput>
      )}
      <div className="text-sm text-center">
        {isRegister ? (
          <>
            Already have an account?{" "}
            <span
              onClick={toggleForm}
              className="text-highlight cursor-pointer"
            >
              Login
            </span>
          </>
        ) : (
          <>
            Don't have an account?{" "}
            <span
              onClick={toggleForm}
              className="text-highlight cursor-pointer"
            >
              Register
            </span>
          </>
        )}
      </div>

      <Button throttleClicks className="w-full" type="submit">
        {isRegister ? "Register" : "Login"}
      </Button>
    </Form>
  );
};

export default LocalForm;
