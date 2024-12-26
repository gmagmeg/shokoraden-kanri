import { FC } from 'react';
import { RxCross2 } from "react-icons/rx";

type CancelButtonProps = {
  label: string;
  onClick: () => void;
}

export const CancelButton: FC<CancelButtonProps> = ({
  label,
  onClick
}) => {
  return (
    <button
      onClick={onClick}
      data-modal-hide="default-modal"
      type="button"
      className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-400 dark:text-gray-100 dark:border-gray-200 dark:hover:text-white dark:hover:bg-gray-400 flex items-center gap-1"
    >
      <RxCross2 />{label}
    </button>
  );
};