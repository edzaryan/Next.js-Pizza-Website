import { PropsWithChildren } from "react";
import { cn } from "@/shared/lib/utils";

interface Props {
  className?: string;
}

export const Container = ({ className, children }: PropsWithChildren<Props>) => {
  return (
    <div className={cn("mx-auto max-w-[1280px]", className)}>
      {children}
    </div>
  )
}