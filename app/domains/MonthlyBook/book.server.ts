import { BookEntry } from "./type";

export const getBookIdList = (bookEntry: BookEntry[]): number[] => bookEntry.map((entry) => entry.bookId);
