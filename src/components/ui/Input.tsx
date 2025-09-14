import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = "", ...props }, ref) => {
    return (
      <div className="space-y-2">
        <label
          htmlFor={props.id}
          className="block text-sm font-medium"
          style={{ color: "var(--foreground)" }}
        >
          {label}
        </label>
        <input
          ref={ref}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${className}`}
          style={{
            backgroundColor: "var(--input)",
            color: "var(--foreground)",
            borderColor: error ? "var(--destructive)" : "var(--border)",
          }}
          {...props}
        />
        {error && (
          <p className="text-sm" style={{ color: "var(--destructive)" }}>
            {error}
          </p>
        )}
        {helperText && !error && (
          <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
