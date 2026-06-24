// src/components/ui/Input.jsx
export const Input = ({ label, error, className = "", ...props }) => (
  <div className="space-y-1">
    {label && (
      <label className="block text-sm font-medium text-gray-700 text-left">
        {label}
      </label>
    )}
    <input
      className={`
        w-full px-4 py-2 border border-gray-600 
        focus:ring-2 focus:ring-blue-500 focus:border-blue-500
        transition-colors duration-200
        ${error ? "border-red-500" : ""}
        ${className}
      `}
      {...props}
    />
    {error && <p className="text-sm text-red-600">{error}</p>}
  </div>
);
