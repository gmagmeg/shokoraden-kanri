import { BookEntry } from "@/domains/MonthlyBook/type";
import { OpenBookIcon } from "./icon/OpenBookIcon";

type SideMenuProps = {
  selectedMonthly: string;
  monthlyBooks: BookEntry[];
};

export const SideMenu = ({ selectedMonthly, monthlyBooks }: SideMenuProps) => {
  const displayYearMonth = selectedMonthly.replace('-', '年');
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, bookId: number) => {
    e.preventDefault();
    const element = document.getElementById(`book-${bookId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // URLを更新
      window.history.pushState({}, '', `#book-${bookId}`);
    }
  };

  return (
    <div className="lg:w-64 flex-shrink-0">
      <div className="sticky top-20">
        <h2 className="text-xl font-bold mb-4">{displayYearMonth}月の推薦図書</h2>
        <nav className="space-y-2">
          {monthlyBooks.map((book) => (
            <a
              key={book.bookId}
              href={`#book-${book.bookId}`}
              onClick={(e) => handleClick(e, book.bookId)}
              className="flex items-center gap-2 px-4 py-1 rounded-lg hover:bg-gray-100 underline"
            >
              <p><OpenBookIcon /></p>
              <span className="line-clamp-2">{book.title}</span>
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}; 