import { BookId } from "../MonthlyBook/type";

export type BookImpressionField = "impression" | "completionDate";

export type UserImpressionUniqueKey = {
  userId: number,
  bookId: BookId,
}

export type UserBookImpression = {
  userId: number
  bookId: string,
  impression: string,
  completionDate: Date | null
}

export type BookImpressionInput = {
  bookId: BookId,
  field: BookImpressionField,
  value: string | Date
}

export type HandleImpressionChange = ({ bookId, field, value }: BookImpressionInput) => Promise<void>;
