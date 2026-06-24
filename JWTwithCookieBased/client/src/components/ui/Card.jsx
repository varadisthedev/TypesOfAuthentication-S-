// src/components/ui/Card/Card.jsx
import React from "react";

export const Card = ({
  children,
  className = "",
  variant = "default",
  padding = "md",
  ...props
}) => {
  // Variant styles
  const variants = {
    default: "bg-slate-950 border border-gray-200 ",
    elevated:
      "bg-white shadow-lg hover:shadow-xl transition-shadow duration-300",
    outline: "bg-transparent border-2 border-gray-300",
    primary: "bg-blue-50 border border-blue-200",
    gradient:
      "bg-gradient-to-br from-blue-50 to-indigo-50 border border-gray-200",
  };

  // Padding sizes
  const paddings = {
    none: "p-0",
    sm: "p-3",
    md: "p-6",
    lg: "p-8",
    xl: "p-10",
  };

  return (
    <div
      className={`
        rounded-lg
        ${variants[variant]}
        ${paddings[padding]}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};
