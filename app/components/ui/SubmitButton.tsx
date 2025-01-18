import { CiLogin } from "react-icons/ci";

export const SubmitButton = ({ label, addClassName = "" }: { label: string, addClassName: string }) => {
  return (
    <button
      type="submit"
      className={`flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-4 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${addClassName}`}
    >
      <CiLogin className="mr-1" />
      {label}
    </button>
  );
};