import { db } from "@/server/db.server";
import { RowDataPacket } from "mysql2";
import { BookEntry } from "./type";

// 指定された年月の本を取得する
export const findMonthlyBooks = async (yearMonth: string): Promise<BookEntry[]> => {
  const [year, month] = yearMonth.split('-');
  const startDate = `${year}-${month}-01`;

  const [rows] = await db.query<RowDataPacket[]>(
    `SELECT book_id as bookId, date, title, link, coverImage
    FROM monthly_books 
    WHERE date = ?
      AND deleted_at IS NULL
    ORDER BY book_id asc`,
    [startDate]
  );

  return rows.map(row => ({
    bookId: row.bookId,
    date: row.date,
    title: row.title,
    link: row.link,
    coverImage: row.coverImage
  }));
};

// monthly_bookテーブルからdateの一覧を取得する
export const fetchMonthlyBookDates = async (): Promise<string[]> => {
  const [rows] = await db.query<RowDataPacket[]>(
    `SELECT DISTINCT date FROM monthly_books WHERE deleted_at IS NULL ORDER BY date desc`,
    []
  );
  return rows.map(row => {
    const date = new Date(row.date);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${year}-${month}`;
  });
};

// 登録されている月の中から一番新しい月を取得する
export const findLatestMonthlyBookDate = async (): Promise<string> => {
  const [rows] = await db.query<RowDataPacket[]>(
    `SELECT DISTINCT date FROM monthly_books WHERE deleted_at IS NULL ORDER BY date desc LIMIT 1`,
    []
  );
  const date = new Date(rows[0].date);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${year}-${month}`;
};
