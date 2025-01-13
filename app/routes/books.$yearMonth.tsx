import { BookEntry } from "@/domains/MonthlyBook/type";
import type { MetaFunction, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { HandleImpressionChange, UserBookImpression } from "@/domains/UserImpression/type";
import { getBookIdList } from "@/domains/MonthlyBook/book.server";
import { response } from "@/server/function";
import { getUserFromJWT } from "@/server/auth.server";
import { AuthContext } from "@/domains/Auth/context";
import { findBooksImpression } from "@/domains/UserImpression/repository";
import { fetchMonthlyBookDates, findMonthlyBooks } from "@/domains/MonthlyBook/repository";
import { useState } from "react";
import { sendImpressionUpdate, updateImpressions } from "@/domains/UserImpression/function";
import { BookCard } from "@/components/BookCard/BookCard";
import { SideMenu } from "@/components/ui/SideMenu";

// メタデータの設定
export const meta: MetaFunction = () => {
  return [
    { title: "書庫らでん読書手帳 | 月別の推薦図書" },
    { name: "description", content: "" },
  ];
};

/**
 * Getメソッド時
 */
export const loader: LoaderFunction = async ({ request, params }) => {
  let { yearMonth } = params;
  yearMonth = (yearMonth) ?? process.env.LATEST_YEAR_MONTH;
  // 月別の本の情報を取得する
  const monthlyBooks = await findMonthlyBooks(yearMonth ?? '');
  const monthlyBookDates = await fetchMonthlyBookDates();

  // ユーザーのログイン判定する
  const user = await getUserFromJWT(request);
  if (!user) {
    return response({
      isAuth: false,
      yearMonth,
      monthlyBooks,
      monthlyBookDates,
      userBooksImpression: []
    });
  }

  try {
    // ログイン中のユーザーの感想を取得する
    const userBooksImpression = await findBooksImpression(
      user.id,
      getBookIdList(monthlyBooks)
    );
    return response({
      isAuth: true,
      yearMonth,
      monthlyBooks,
      monthlyBookDates,
      userBooksImpression
    });
  } catch (error) {
    throw new Response("対象データが見つかりませんでした", { status: 404 });
  }
};

// コンポーネント
export default function Book() {
  const {
    isAuth,
    monthlyBooks,
    monthlyBookDates,
    yearMonth,
    userBooksImpression: initialImpressions
  } = useLoaderData<{
    isAuth: boolean,
    monthlyBooks: BookEntry[],
    monthlyBookDates: string[],
    yearMonth: string,
    userBooksImpression: UserBookImpression[]
  }>();

  // ローカルの状態管理
  const [userBooksImpression, setUserBooksImpression] = useState<UserBookImpression[]>(initialImpressions);
  const [isUpdating, setIsUpdating] = useState<number | null>(null);

  const handleImpressionChange: HandleImpressionChange = async ({ bookId, field, value }) => {
    const updatedImpressions = updateImpressions(userBooksImpression, bookId, field, value);
    setUserBooksImpression(updatedImpressions);
    setIsUpdating(bookId);

    try {
      await sendImpressionUpdate(bookId, field, value);
    } catch (error) {
      setUserBooksImpression(userBooksImpression);
      console.error('Failed to update impression:', error);
    } finally {
      setIsUpdating(null);
    }
  };

  return (
    <AuthContext.Provider value={isAuth}>
      <div className="container mx-auto px-4 pb-16">
        <div className="flex flex-col lg:flex-row gap-8">
          <SideMenu selectedMonthly={yearMonth} monthlyBooks={monthlyBooks} />
          <div className="flex-1">
            <div className="max-w-4xl space-y-8">
              {monthlyBooks.map((entry) => (
                <BookCard
                  key={`monthly-book-${entry.bookId}`}
                  entry={entry}
                  handleImpressionChange={handleImpressionChange}
                  userBooksImpression={userBooksImpression}
                  isUpdating={isUpdating === entry.bookId}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </AuthContext.Provider>
  );
}
