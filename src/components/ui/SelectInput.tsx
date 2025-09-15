import React from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectInputProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: SelectOption[];
  error?: string;
  helperText?: string;
  placeholder?: string;
}

export const SelectInput = React.forwardRef<
  HTMLSelectElement,
  SelectInputProps
>(
  (
    {
      label,
      options,
      error,
      helperText,
      placeholder,
      className = "",
      ...props
    },
    ref
  ) => {
    return (
      <div className="space-y-2">
        <label
          htmlFor={props.id}
          className="block text-sm font-medium"
          style={{ color: "var(--foreground)" }}
        >
          {label}
        </label>
        <div className="relative">
          <select
            ref={ref}
            className={`appearance-none w-full px-4 py-3 pr-12 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${className}`}
            style={{
              backgroundColor: "var(--input)",
              color: "var(--foreground)",
              borderColor: error ? "var(--destructive)" : "var(--border)",
            }}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg
              className="w-5 h-5"
              style={{ color: "var(--muted-foreground)" }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
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

SelectInput.displayName = "SelectInput";
