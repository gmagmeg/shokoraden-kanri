import { BookEntry } from "@/domains/MonthlyBook/type";
import { HandleImpressionChange, UserBookImpression } from "@/domains/UserImpression/type";
import { Link } from "@remix-run/react";
import { useContext } from "react";
import { AuthContext } from "@/domains/Auth/context";
import { OpenBookIcon } from "../ui/icon/OpenBookIcon";
import { UserImpressionView } from "./UserImpressionView";

export type BookCardProps = {
  entry: BookEntry;
  userBooksImpression: UserBookImpression[];
  handleImpressionChange: HandleImpressionChange;
  isUpdating?: boolean;
}

const getBookImpression = (bookId: number, userBooksImpression: UserBookImpression[]) => {
  return userBooksImpression.find(impression => Number(impression.bookId) === Number(bookId)
  );
}

export const BookCard = ({ entry, handleImpressionChange, userBooksImpression, isUpdating }: BookCardProps) => {
  const isAuth = useContext(AuthContext);
  const bookImpression = getBookImpression(entry.bookId, userBooksImpression);

  return (
    <div id={`book-${entry.bookId}`} className="flex flex-col md:flex-row gap-6 w-full" >
      <div className="w-full md:w-[400px] aspect-[4/5] relative">
        <img
          src={`/book-data/${entry.coverImage}`}
          alt={entry.title}
          className="object-cover w-auto h-auto rounded-lg shadow-lg w-2/3"
        />
      </div>
      <div className="w-full md:flex-1 space-y-2">
        <div className="flex items-center gap-2">
          <p><OpenBookIcon /></p>
          <h1 className="text-2xl">
            <Link
              key={`link-${entry.bookId}`}
              to={entry.link}
              className="flex items-center gap-2 font-medium mb-1 underline hover:text-gray-600"
              target="_blank"
              rel="noreferrer"
            >
              {entry.title}
            </Link>
          </h1>
        </div>
        <UserImpressionView
          entry={entry}
          bookImpression={bookImpression}
          handleImpressionChange={handleImpressionChange}
          isAuth={isAuth}
          isUpdating={isUpdating}
        />
      </div>
    </div>
  );
}
