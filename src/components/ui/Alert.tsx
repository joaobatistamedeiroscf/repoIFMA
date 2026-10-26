import React from "react";
import { AlertCircle, CheckCircle2, Info, AlertTriangle, X } from "lucide-react";

export interface AlertProps {
  variant?: "error" | "success" | "warning" | "info";
  title?: string;
  children: React.ReactNode;
  onClose?: () => void;
  className?: string;
}

export function Alert({
  variant = "info",
  title,
  children,
  onClose,
  className = "",
}: AlertProps) {
  const variantStyles = {
    error: {
      container: "bg-error-bg border-error/30 text-error",
      icon: <AlertCircle className="h-5 w-5 text-error shrink-0" />,
      titleColor: "text-error font-semibold",
      bodyColor: "text-error/90",
    },
    success: {
      container: "bg-success-bg border-success/30 text-success",
      icon: <CheckCircle2 className="h-5 w-5 text-success shrink-0" />,
      titleColor: "text-success font-semibold",
      bodyColor: "text-success/90",
    },
    warning: {
      container: "bg-warning-bg border-warning/30 text-warning",
      icon: <AlertTriangle className="h-5 w-5 text-warning shrink-0" />,
      titleColor: "text-warning font-semibold",
      bodyColor: "text-warning/90",
    },
    info: {
      container: "bg-info-bg border-info/30 text-info",
      icon: <Info className="h-5 w-5 text-info shrink-0" />,
      titleColor: "text-info font-semibold",
      bodyColor: "text-info/90",
    },
  };

  const current = variantStyles[variant];

  return (
    <div
      role="alert"
      className={`flex items-start gap-3 p-4 rounded-medium border ${current.container} ${className} transition-all`}
    >
      <div className="pt-0.5">{current.icon}</div>

      <div className="flex-1 text-sm">
        {title && <h4 className={`${current.titleColor} mb-0.5`}>{title}</h4>}
        <div className={current.bodyColor}>{children}</div>
      </div>

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="text-current opacity-70 hover:opacity-100 transition-opacity p-1 rounded -mr-1 -mt-1"
          aria-label="Fechar alerta"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

