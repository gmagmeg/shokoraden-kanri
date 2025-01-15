import React from "react";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> { }

export const Textarea = (props: TextareaProps) => {
  return (
    <textarea
      className="w-full bg-white border border-solid rounded-lg border-gray-500 p-2"
      {...props}
    />
  );
}
