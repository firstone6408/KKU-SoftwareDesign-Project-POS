import { buttonVariants } from "@/components/ui/button";
import { VariantProps } from "class-variance-authority";
import { LucideIcon } from "lucide-react";

export type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export interface SubmitButtonProps extends ButtonProps {
  children?: React.ReactNode;
  icon?: LucideIcon;
  isPending?: boolean;
  className?: string;
  variant?:
    | "default"
    | "link"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
  size?: "icon" | "default" | "sm" | "lg" | null | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref?: (el: HTMLButtonElement | null | any) => void;
  onKeyDown?: (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    event: React.KeyboardEvent<HTMLButtonElement> | any
  ) => void;
}
