import { Link } from "@remix-run/react";
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> { }

export const MonthLink = (props: InputProps) => {
  const displayMonth = (ym: string): string => {
    const [_, month] = ym.split('-');
    return `${month}月`
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">2024年</h2>
      <div className="flex gap-4">
        {["2024-12", "2024-11", "2024-10"].map((yearMonth) => (
          <div key={yearMonth} className="text-center">
            <Link key={yearMonth} to={`/books/${yearMonth}`} style={{ marginRight: "10px" }}>
              {displayMonth(yearMonth)}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
