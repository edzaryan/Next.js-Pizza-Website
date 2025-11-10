"use client"
import { cn } from "@/shared/lib/utils";
import * as React from "react";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        `border-input placeholder:text-muted-foreground focus-visible:border-neutral-400 dark:focus-visible:border-neutral-500 
        focus-visible:ring-neutral-400/50 dark:focus-visible:ring-neutral-500/50 focus-visible:ring-[0.3px] aria-invalid:ring-destructive/20 
        dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex min-h-16 w-full rounded-[14px] border 
        bg-transparent p-3 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm`,
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
