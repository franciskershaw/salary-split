import { useEffect } from "react";

import {
  DollarSignIcon,
  PieChart,
  ReceiptPoundSterling,
  WalletCards,
} from "lucide-react";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import useUser from "@/hooks/user/useUser";
import usePageTitle from "@/hooks/utility/usePageTitle";

import LocalForm from "./components/LocalForm/LocalForm";
import OrDivider from "./components/OrDivider/OrDivider";

const FeatureItem = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <div className="flex items-start gap-4">
    <div className="flex-shrink-0">{icon}</div>
    <div>
      <h3 className="text-xl font-semibold mb-1">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  </div>
);

const Auth = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  usePageTitle("Welcome to SalarySplit");

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
  };
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* --- Desktop View --- */}
      <div className="hidden md:flex md:flex-row h-screen">
        {/* Marketing Content */}
        <div className="w-1/2 bg-surface p-8 md:p-12 flex flex-col justify-center">
          <div className="max-w-md mx-auto">
            <div className="flex items-center mb-8">
              <DollarSignIcon className="h-10 w-10 text-primary mr-3" />
              <h1 className="text-3xl font-bold font-logo">SalarySplit</h1>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Know where your money goes, every month.
            </h2>
            <p className="text-lg text-muted-foreground mb-10">
              SalarySplit helps you plan, split, and track your monthly finances
              with ease.
            </p>
            <div className="space-y-6">
              <FeatureItem
                icon={<PieChart className="h-8 w-8 text-primary" />}
                title="Payday Breakdown"
                description="See exactly how your salary covers bills, expenses, and savings each month."
              />
              <FeatureItem
                icon={<ReceiptPoundSterling className="h-8 w-8 text-primary" />}
                title="Split Bills"
                description="Track and categorise bills, expenses, and savings in one place – and split costs with others."
              />
              <FeatureItem
                icon={<WalletCards className="h-8 w-8 text-primary" />}
                title="Account Overview"
                description="Keep tabs on all your accounts and balances at a glance."
              />
            </div>
          </div>
        </div>
        {/* Login Form */}
        <div className="w-1/2 flex items-center justify-center p-8">
          <div className="flex flex-col items-center justify-center w-full max-w-[400px]">
            <h2 className="mb-4 text-center text-2xl font-semibold">
              Get Started
            </h2>
            <p className="text-muted-foreground text-center mb-8">
              <span className="md:hidden">
                SalarySplit helps you plan, split, and track your monthly
                finances.
              </span>
              <span className="hidden md:block">
                Log in or create an account to get started.
              </span>
            </p>
            <Button
              onClick={handleGoogleLogin}
              className="w-full gap-3 text-lg py-6"
            >
              <FaGoogle size={22} />
              <span>Login with Google</span>
            </Button>
            <OrDivider />
            <div className="w-full space-y-4">
              <LocalForm />
            </div>
          </div>
        </div>
      </div>

      {/* --- Mobile View --- */}
      <div className="md:hidden flex flex-col items-center justify-center min-h-screen p-6">
        <div className="w-full max-w-sm text-center">
          <div className="flex items-center justify-center mb-4">
            <DollarSignIcon className="h-8 w-8 text-primary mr-2" />
            <h1 className="text-3xl font-bold font-logo">SalarySplit</h1>
          </div>
          <p className="text-muted-foreground mb-10">
            Take control of your monthly finances with clear bill tracking and
            expense management.
          </p>
          <div className="space-y-4">
            <Button
              onClick={handleGoogleLogin}
              className="w-full gap-3 text-lg py-6"
            >
              <FaGoogle size={22} />
              <span>Login with Google</span>
            </Button>
            <OrDivider />
            <LocalForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
