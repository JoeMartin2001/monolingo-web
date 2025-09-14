"use client";

import Image from "next/image";
import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { UserIcon, PlusIcon, CloseIcon } from "../icons";

interface AvatarInputProps {
  id: string;
  name: string;
  label: string;
  value?: string;
  onChange: (file: File | null) => void;
  required?: boolean;
}

const AvatarInput: React.FC<AvatarInputProps> = ({
  id,
  name,
  label,
  onChange,
  required = false,
}) => {
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      if (file) {
        console.log("File selected:", file.name, file.type, file.size);

        // Clean up previous preview
        if (preview) {
          URL.revokeObjectURL(preview);
        }

        // Create new preview URL
        const url = URL.createObjectURL(file);

        // Test the URL
        const img = new window.Image();

        img.onload = () => {
          setPreview(url);
          onChange(file);
        };

        img.onerror = (error) => {
          console.error("❌ Image failed to load:", error);
          URL.revokeObjectURL(url);
        };

        img.src = url;
      }
    },
    [preview, onChange]
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    fileRejections,
  } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024, // 5MB
    multiple: false,
  });

  const handleRemove = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    setPreview(null);
    onChange(null);
  };

  const getDropzoneClassName = () => {
    return "relative w-40 h-40 rounded-full border-2 border-dashed cursor-pointer transition-all duration-300 group";
  };

  const getDropzoneStyle = () => {
    if (isDragReject || fileRejections.length > 0) {
      return {
        borderColor: "var(--destructive)",
        backgroundColor: "var(--muted)",
        transform: "scale(1.05)",
      };
    } else if (isDragActive) {
      return {
        borderColor: "var(--primary)",
        backgroundColor: "var(--accent)",
        transform: "scale(1.05)",
        boxShadow:
          "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      };
    } else if (preview) {
      return {
        borderStyle: "solid",
        borderColor: "var(--border)",
        boxShadow:
          "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      };
    } else {
      return {
        borderColor: "var(--border)",
      };
    }
  };

  const getErrorMessage = () => {
    if (fileRejections.length > 0) {
      const error = fileRejections[0].errors[0];
      if (error.code === "file-too-large") {
        return "File is too large (max 5MB)";
      }
      if (error.code === "file-invalid-type") {
        return "Invalid file type";
      }
      return "File rejected";
    }
    return null;
  };

  return (
    <div className="space-y-4">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-center"
        style={{ color: "var(--foreground)" }}
      >
        {label}
        {required && (
          <span className="ml-1" style={{ color: "var(--destructive)" }}>
            *
          </span>
        )}
      </label>

      <div className="flex justify-center">
        <div
          {...getRootProps()}
          className={getDropzoneClassName()}
          style={getDropzoneStyle()}
        >
          <input {...getInputProps()} id={id} name={name} required={required} />

          {preview ? (
            <div className="relative w-full h-full">
              <div className="w-full h-full rounded-full overflow-hidden">
                <Image
                  src={preview}
                  alt="Avatar preview"
                  className="w-full h-full object-cover"
                  style={{ display: "block" }}
                  width={200}
                  height={200}
                />
              </div>

              <button
                type="button"
                onClick={handleRemove}
                className="absolute top-1 right-1 w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center text-sm hover:bg-red-600 transition-all duration-200 opacity-0 group-hover:opacity-100 shadow-lg z-10"
              >
                <CloseIcon className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div
              className="flex flex-col items-center justify-center h-full transition-colors duration-200"
              style={{ color: "var(--muted-foreground)" }}
            >
              <div className="relative">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-2 transition-all duration-200"
                  style={{
                    backgroundColor:
                      isDragReject || fileRejections.length > 0
                        ? "var(--muted)"
                        : isDragActive
                        ? "var(--accent)"
                        : "var(--muted)",
                  }}
                >
                  <div
                    style={{
                      color:
                        isDragReject || fileRejections.length > 0
                          ? "var(--destructive)"
                          : isDragActive
                          ? "var(--primary)"
                          : "var(--muted-foreground)",
                    }}
                  >
                    <UserIcon className="w-8 h-8 transition-colors duration-200" />
                  </div>
                </div>
                <div
                  className="absolute -bottom-1 -right-1 w-6 h-6 text-white rounded-full flex items-center justify-center text-xs transition-colors duration-200"
                  style={{
                    backgroundColor:
                      isDragReject || fileRejections.length > 0
                        ? "var(--destructive)"
                        : isDragActive
                        ? "var(--primary)"
                        : "var(--primary)",
                  }}
                >
                  <PlusIcon className="w-3 h-3" />
                </div>
              </div>
              <span
                className="text-sm font-medium text-center transition-colors duration-200"
                style={{
                  color:
                    isDragReject || fileRejections.length > 0
                      ? "var(--destructive)"
                      : isDragActive
                      ? "var(--primary)"
                      : "var(--muted-foreground)",
                }}
              >
                {isDragReject || fileRejections.length > 0
                  ? "Invalid file"
                  : isDragActive
                  ? "Drop image here"
                  : "Add Photo"}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Error Message */}
      {getErrorMessage() && (
        <div className="text-center">
          <p
            className="text-sm font-medium"
            style={{ color: "var(--destructive)" }}
          >
            {getErrorMessage()}
          </p>
        </div>
      )}

      {/* Instructions */}
      <div className="text-center space-y-1">
        <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
          Drag & drop or click to upload
        </p>
        <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
          Max 5MB • JPG, PNG, GIF, or WebP
        </p>
      </div>
    </div>
  );
};

export default AvatarInput;
