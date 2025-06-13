import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background text-foreground">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary">404</h1>
        <p className="text-2xl md:text-3xl font-light text-muted-foreground mt-4">
          Oops! Page not found.
        </p>
        <p className="mt-4 text-muted-foreground">
          The page you are looking for does not exist or has been moved.
        </p>
        <Button
          onClick={() => navigate("/dashboard")}
          className="mt-8"
        >
          Take me back home
        </Button>
      </div>
    </div>
  );
};

export default NotFound; 