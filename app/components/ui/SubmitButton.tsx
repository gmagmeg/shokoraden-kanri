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
      className={`flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-4 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-50 disabled:cursor-not-allowed ${addClassName}`}
      disabled={disabled}
    >
      <CiLogin className="mr-1" />
      {label}
    </button>
  );
};