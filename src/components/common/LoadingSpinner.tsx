import React from "react";

export const LoadingSpinner: React.FC<{ text?: string }> = ({
  text = "Carregando...",
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
      {text && <p className="mt-4 text-gray-600">{text}</p>}
    </div>
  );
};
