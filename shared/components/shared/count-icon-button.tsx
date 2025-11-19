import { CountButtonProps } from "./count-button";
import { cn } from "@/shared/lib/utils";
import { Button } from "../ui/button";

interface IconButtonProps {
  size?: CountButtonProps["size"];
  disabled?: boolean;
  type?: "plus" | "minus";
  onClick?: () => void;
}

export const CountIconButton = ({ size = "sm", disabled, type, onClick }: IconButtonProps) => {
  return (
    <Button
      variant="outline"
      disabled={disabled}
      onClick={onClick}
      type="button"
      className={cn(
        "p-0 border-primary text-primary hover:bg-primary hover:text-primary-foreground disabled:bg-white disabled:border-gray-400 disabled:text-gray-400",
        size === "sm" ? "w-[30px] h-[30px] rounded-[10px]" : "w-[38px] h-[38px] rounded-md"
      )}>
      <span className={`${size === "sm" ? "text-sm" : "text-base"} font-bold leading-none select-none`}>
        {type === "plus" ? "+" : "−"}
      </span>
    </Button>
  )
}