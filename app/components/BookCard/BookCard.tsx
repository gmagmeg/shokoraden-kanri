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
    <div id={`book-${entry.bookId}`} className="flex gap-4 md:gap-6 w-full" >
      <div className="w-[160px] md:w-[400px] flex-shrink-0">
        <div className="aspect-[4/5]">
          <img
            src={`/book-data/${entry.coverImage}`}
            alt={entry.title}
            className="object-contain w-full h-[200px] md:h-[600px] rounded-lg shadow-lg"
          />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2">
          <p><OpenBookIcon /></p>
          <h1 className="text-xl md:text-2xl">
            <Link
              key={`link-${entry.bookId}`}
              to={entry.link}
              className="flex items-center gap-2 font-medium underline hover:text-gray-600 line-clamp-2"
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
