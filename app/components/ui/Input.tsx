import { ComponentPropsWithoutRef } from "react";

type Props = {
  defaultValue?: string;
  id: string;
  placeholder?: string;
  required?: boolean;
} & ComponentPropsWithoutRef<"input">;

export const Input = ({
  defaultValue,
  id,
  placeholder,
  required = false,
  className = "",
  ...props
}: Props) => {
  return (
    <input
      defaultValue={defaultValue}
      id={id}
      placeholder={placeholder}
      required={required}
      className={`p-2 w-2/3 bg-white border-b border-gray-400 focus:outline-none ${className}`}
      {...props}
    />
  );
};
