import { useEffect } from "react";

import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import useUser from "@/hooks/user/useUser";
import usePageTitle from "@/hooks/utility/usePageTitle";

import LocalForm from "./components/LocalForm/LocalForm";
import OrDivider from "./components/OrDivider/OrDivider";

const Auth = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  usePageTitle("Login");

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
  };
  return (
    <div className="flex items-center justify-center h-screen rounded-md">
      <div className="flex flex-col items-center justify-center border rounded-sm p-8 w-full max-w-[400px]">
        <h1 className="mb-4 text-center text-2xl font-semibold">
          Salary Split
        </h1>

        {/* Google Login Button */}
        <Button
          throttleClicks
          onClick={handleGoogleLogin}
          className="w-full gap-3"
        >
          <FaGoogle size={24} />
          <span className="text-lg">Login with Google</span>
        </Button>

        <OrDivider />

        {/* Form goes here */}
        <div className="w-full space-y-4">
          <LocalForm />
        </div>
      </div>
    </div>
  );
};

export default Auth;
