import { CiLogin } from "react-icons/ci";

type SubmitButtonProps = {
  label: string;
  addClassName?: string;
  disabled?: boolean;
};

export const SubmitButton = ({ label, addClassName = "", disabled }: SubmitButtonProps) => {
  return (
    <button
      type="submit"
      className={`bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed ${addClassName}`}
      disabled={disabled}
    >
      {label}
    </button>
  );
};