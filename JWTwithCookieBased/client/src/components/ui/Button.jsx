// src/components/ui/Button.jsx
export const Button = ({
  children,
  variant = "primary",
  isLoading = false,
  className = "",
  ...props
}) => {
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
    danger: "bg-red-600 hover:bg-red-700 text-white",
  };

  return (
    <button
      className={`
        px-4 py-2 rounded-lg font-medium
        transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${className}
      `}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="animate-spin h-5 w-5" />
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
};
