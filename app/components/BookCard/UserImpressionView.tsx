import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { BookEntry } from "@/domains/MonthlyBook/type";
import { HandleImpressionChange, UserBookImpression } from "@/domains/UserImpression/type";
import { useState, useEffect } from "react";
import { CalendarIcon } from "@/components/ui/icon/CalendarIcon";
import { PencilIcon } from "@/components/ui/icon/PencilIcon";
import { XPostButton } from "@/components/ui/XPostButton";
import { Link } from "@remix-run/react";
import { LoginIcon } from "@/components/ui/icon/LoginIcon";

type UserImpressionViewProps = {
  entry: BookEntry;
  bookImpression?: UserBookImpression;
  handleImpressionChange?: HandleImpressionChange;
  isAuth: boolean;
}

const formatDate = (date: Date | undefined | null): string => {
  if (!date) return "";
  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) {
    return "";
  }
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const UserImpressionView = ({ entry, bookImpression, handleImpressionChange, isAuth }: UserImpressionViewProps) => {
  const [impression, setImpression] = useState(bookImpression?.impression ?? "");
  const [completionDate, setCompletionDate] = useState(formatDate(bookImpression?.completionDate));

  useEffect(() => {
    if (isAuth) {
      setImpression(bookImpression?.impression ?? "");
      setCompletionDate(formatDate(bookImpression?.completionDate));
    }
  }, [bookImpression, isAuth]);

  const content = (
    <>
      <div>
        <h3 className="block text-lg font-medium mb-1 flex items-center gap-1">
          <CalendarIcon />
          読了日
        </h3>
        <div className="w-full md:w-2/3">
          <Input
            id="completion-date"
            type="date"
            value={isAuth ? completionDate : "YYYY-MM-DD"}
            onChange={(e) => {
              if (!isAuth) return;
              setCompletionDate(e.target.value);
              handleImpressionChange?.({
                bookId: entry.bookId,
                field: "completionDate",
                value: e.target.value
              });
            }}
          />
        </div>
      </div>
      <div>
        <h3 className="text-lg font-medium mb-1 flex items-center gap-1">
          <PencilIcon />
          感想欄
        </h3>
        <div className="w-full md:w-2/3 space-y-2">
          <Textarea

            value={isAuth ? impression : ""}
            onChange={(e) => isAuth && setImpression(e.target.value)}
            onBlur={() => {
              if (!isAuth) return;
              handleImpressionChange?.({
                bookId: entry.bookId,
                field: "impression",
                value: impression
              });
            }}
            rows={6}
          />
          <XPostButton
            title={entry.title}
            impression={impression}
            url={entry.link}
            isDisabled={!isAuth || !impression}
          />
        </div>
      </div>
    </>
  );

  if (!isAuth) {
    return (
      <div>
        <span className="flex items-center gap-1">
          読了日・感想欄は
          <Link
            to="/user/login"
            className="flex items-center gap-1 text-blue-500 underline hover:text-blue-600"
          >
            <LoginIcon />ログイン
          </Link>
          すると利用可能になります
        </span>
        <div className="relative">
          <div className="absolute inset-0 bg-black/40 pointer-events-auto z-50" />
          {content}
        </div>
      </div>
    );
  }

  return content;
}; 