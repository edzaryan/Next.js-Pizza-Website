"use client"
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/shared/lib/utils";
import { Loader } from "lucide-react";
import * as React from "react";


const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[14px] cursor-pointer active:translate-y-[1px] text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:bg-gray-500',
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        orangeOutline:
          "border border-orange-500 text-orange-600 shadow-xs hover:bg-orange-50 dark:border-orange-400 dark:text-orange-400 dark:hover:bg-orange-950/30",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-[18px] py-2 has-[>svg]:px-[14px]",
        sm: "h-8 rounded-[14px] gap-1.5 px-[14px] has-[>svg]:px-[12px]",
        lg: "h-10 rounded-[14px] px-[26px] has-[>svg]:px-[18px]",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, disabled, loading, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        disabled={disabled || loading}
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}>
        {!loading ? children : <Loader className="w-5 h-5 animate-spin" />}
      </Comp>
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
