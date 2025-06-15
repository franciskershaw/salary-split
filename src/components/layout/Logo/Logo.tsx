import { cn } from "@/lib/utils";

type LogoProps = {
  size?: "small" | "medium" | "large";
};

const Logo = ({ size = "medium" }: LogoProps) => {
  return (
    <div className="flex items-end gap-1">
      <img
        src="/favicon.svg"
        alt="SalarySplit"
        className={cn(
          "mr-2 h-7 w-7",
          size === "small" && "h-4 w-4",
          size === "medium" && "h-7 w-7",
          size === "large" && "h-10 w-10"
        )}
      />
      <h1
        className={cn(
          "font-semibold font-logo",
          size === "small" && "text-xl",
          size === "medium" && "text-2xl",
          size === "large" && "text-3xl"
        )}
        style={{ transform: "translateY(3px)" }}
      >
        SalarySplit
      </h1>
    </div>
  );
};

export default Logo;
