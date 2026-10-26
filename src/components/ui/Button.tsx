import React, { ButtonHTMLAttributes, forwardRef } from "react";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      isLoading = false,
      fullWidth = false,
      leftIcon,
      rightIcon,
      disabled,
      className = "",
      ...props
    },
    ref
  ) => {
    // Base styles
    const baseStyles =
      "inline-flex items-center justify-center font-semibold rounded-small transition-all duration-200 select-none disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-primary-600 focus-visible:outline-offset-2";

    // Variants
    const variantStyles = {
      primary:
        "bg-primary-700 text-white hover:bg-primary-800 active:bg-primary-900 shadow-small hover:-translate-y-0.5 active:translate-y-0",
      secondary:
        "bg-primary-100 text-primary-900 hover:bg-primary-200 active:bg-primary-300",
      outline:
        "border border-primary-700 bg-white text-primary-800 hover:bg-primary-50 active:bg-primary-100 hover:-translate-y-0.5 active:translate-y-0",
      ghost:
        "text-primary-800 hover:bg-primary-50 active:bg-primary-100",
      danger:
        "bg-error text-white hover:opacity-90 active:opacity-100 shadow-small",
    };

    // Sizes
    const sizeStyles = {
      sm: "h-9 px-3 text-xs gap-1.5",
      md: "h-11 px-[18px] text-[13.6px] gap-2",
      lg: "h-12 px-6 text-base gap-2.5",
    };

    const widthStyle = fullWidth ? "w-full" : "";

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin shrink-0" />
        ) : (
          leftIcon && <span className="shrink-0">{leftIcon}</span>
        )}
        <span>{children}</span>
        {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";

