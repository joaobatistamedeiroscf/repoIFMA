import React, { HTMLAttributes, forwardRef } from "react";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "subtle" | "brand" | "outline";
  shadow?: "none" | "small" | "medium" | "large";
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = "default",
      shadow = "small",
      className = "",
      children,
      ...props
    },
    ref
  ) => {
    const variantStyles = {
      default: "bg-surface-default border-border",
      subtle: "bg-surface-subtle border-border",
      brand: "bg-surface-brand border-primary-200",
      outline: "bg-transparent border-border",
    };

    const shadowStyles = {
      none: "shadow-none",
      small: "shadow-small",
      medium: "shadow-medium",
      large: "shadow-large",
    };

    return (
      <div
        ref={ref}
        className={`rounded-large border transition-all ${variantStyles[variant]} ${shadowStyles[shadow]} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

