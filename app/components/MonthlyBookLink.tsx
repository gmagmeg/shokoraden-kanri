import { useState } from "react";
import { Link } from "@remix-run/react";
import { PiNotebookLight } from "react-icons/pi";
import { OpenBookIcon } from "@/components/ui/icon/OpenBookIcon";

type MonthlyBookLinkProps = {
  monthlyBookDates: string[];
};

export const MonthlyBookList = ({ monthlyBookDates }: MonthlyBookLinkProps) => {
  const [expandedYears, setExpandedYears] = useState<{ [key: string]: boolean }>({});

  const toggleYear = (year: string) => {
    setExpandedYears(prev => ({
      ...prev,
      [year]: !prev[year]
    }));
  };

  const groupedByYear = monthlyBookDates.reduce((acc, date) => {
    const year = date.split('-')[0];
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(date);
    return acc;
  }, {} as { [key: string]: string[] });

  // 年を降順でソート
  const sortedYears = Object.keys(groupedByYear).sort((a, b) => Number(b) - Number(a));

  return (
    <div className="flex flex-col items-center md:flex-row md:items-start md:space-x-6">
      {sortedYears.map((year) => (
        <div key={year} className="mb-2 md:mb-0">
          <div
            onClick={() => toggleYear(year)}
            className="cursor-pointer flex items-center gap-1 mb-1 hover:text-gray-200 underline"
          >
            <span>{expandedYears[year] ? <OpenBookIcon /> : <PiNotebookLight className="w-6 h-6" />}</span>
            <span>{year}年の推薦図書</span>

          </div>
          <div className={`${expandedYears[year] ? '' : 'hidden'}`}>
            <ul className="pl-6 space-y-1 md:space-y-0 md:flex md:space-x-4">
              {groupedByYear[year].map((date) => (
                <li key={date}>
                  <Link
                    to={`/books/${date}`}
                    className="underline hover:text-gray-200"
                  >
                    {date.split('-')[1]}月
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};