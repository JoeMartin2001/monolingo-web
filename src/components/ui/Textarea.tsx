import React from "react";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  helperText?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
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
        <textarea
          ref={ref}
          className={`w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none ${className}`}
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

Textarea.displayName = "Textarea";
