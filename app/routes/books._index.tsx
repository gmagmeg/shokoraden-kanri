import { findLatestMonthlyBookDate } from "@/domains/MonthlyBook/repository";
import { redirect } from "@remix-run/node";

export const loader = async () => {
  const latestMonthlyBookDate = await findLatestMonthlyBookDate();
  return redirect(`/books/${latestMonthlyBookDate}`);
};

// コンポーネントは不要
export default function BooksIndex() {
  return null;
}
