import React from "react";

export interface FormFieldProps {
  label?: string;
  htmlFor?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function FormField({
  label,
  htmlFor,
  error,
  hint,
  required,
  children,
  className = "",
}: FormFieldProps) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={htmlFor}
          className="text-sm font-medium text-text-primary flex items-center justify-between"
        >
          <span>
            {label}
            {required && <span className="text-error ml-1">*</span>}
          </span>
        </label>
      )}

      {children}

      {error ? (
        <p className="text-xs font-medium text-error mt-0.5 animate-in fade-in duration-200">
          {error}
        </p>
      ) : hint ? (
        <p className="text-xs text-text-secondary mt-0.5">{hint}</p>
      ) : null}
    </div>
  );
}

