import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { BookEntry } from "@/domains/MonthlyBook/type";
import { HandleImpressionChange, UserBookImpression } from "@/domains/UserImpression/type";
import { useState, useEffect, useRef } from "react";
import { CalendarIcon } from "@/components/ui/icon/CalendarIcon";
import { PencilIcon } from "@/components/ui/icon/PencilIcon";
import { XPostButton } from "@/components/ui/XPostButton";
import { Link } from "@remix-run/react";
import { LoginIcon } from "@/components/ui/icon/LoginIcon";
import Calendar, { CalendarProps } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

type UserImpressionViewProps = {
  entry: BookEntry;
  bookImpression?: UserBookImpression;
  handleImpressionChange?: HandleImpressionChange;
  isAuth: boolean;
  isUpdating?: boolean;
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

const formatDisplayDate = (date: string): string => {
  if (!date) return "日付を選択";
  const [year, month, day] = date.split("-");
  return `${year}年${Number(month)}月${Number(day)}日`;
};

export const UserImpressionView = ({ entry, bookImpression, handleImpressionChange, isAuth, isUpdating }: UserImpressionViewProps) => {
  const [impression, setImpression] = useState(bookImpression?.impression ?? "");
  const [completionDate, setCompletionDate] = useState(formatDate(bookImpression?.completionDate));
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isAuth) {
      setImpression(bookImpression?.impression ?? "");
      setCompletionDate(formatDate(bookImpression?.completionDate));
    }
  }, [bookImpression, isAuth]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setIsCalendarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDateChange: CalendarProps['onChange'] = (value) => {
    if (value instanceof Date) {
      const formattedDate = formatDate(value);
      setCompletionDate(formattedDate);
      setIsCalendarOpen(false);
      handleImpressionChange?.({
        bookId: entry.bookId,
        field: "completionDate",
        value: formattedDate
      });
    }
  };

  const content = (
    <>
      <div className="flex items-center gap-1">
        <CalendarIcon />
        <p>読了日</p>
        {isUpdating && <span className="ml-2 text-gray-500">更新中...</span>}
      </div>
      <div className="relative w-full md:w-48" ref={calendarRef}>
        <button
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background hover:bg-accent hover:text-accent-foreground disabled:cursor-not-allowed disabled:opacity-50"
          onClick={() => setIsCalendarOpen(!isCalendarOpen)}
          disabled={!isAuth || isUpdating}
        >
          {formatDisplayDate(completionDate)}
        </button>
        {isCalendarOpen && (
          <div className="absolute z-50 mt-1">
            <Calendar
              onChange={handleDateChange}
              value={completionDate ? new Date(completionDate) : null}
              locale="ja-JP"
            />
          </div>
        )}
      </div>

      <div className="flex items-center gap-1 mt-4">
        <PencilIcon />
        <p>感想欄</p>
        {isUpdating && <span className="ml-2 text-gray-500">更新中...</span>}
      </div>
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
          disabled={isUpdating}
        />
        <XPostButton
          title={entry.title}
          impression={impression}
          url={entry.link}
          isDisabled={!isAuth || !impression}
        />
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