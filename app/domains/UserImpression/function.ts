import { getBaseURL } from "@/server/function";
import { UserBookImpression } from "./type";

export const sendImpressionUpdate = async (bookId: number, field: string, value: string | Date) => {
  const formData = new FormData();
  formData.append('bookId', String(bookId));
  formData.append('fieldName', String(field));
  formData.append('fieldValue', String(value));

  await fetch(`${getBaseURL()}user/book/impressions`, {
    method: 'POST',
    body: formData
  });
};

export const updateImpressions = (userBooksImpression: UserBookImpression[], bookId: number, field: string, value: string | Date) => {
  const updatedImpressions = userBooksImpression.map(impression => {
    if (impression.bookId === String(bookId)) {
      return {
        ...impression,
        [field]: field === 'completionDate' ? new Date(String(value)) : value
      };
    }
    return impression;
  });

  if (!updatedImpressions.some(impression => impression.bookId === String(bookId))) {
    updatedImpressions.push({
      userId: 0, // サーバーサイドで適切なユーザーIDが設定される
      bookId: String(bookId),
      impression: field === 'impression' ? String(value) : '',
      completionDate: field === 'completionDate' ? new Date(String(value)) : null
    });
  }

  return updatedImpressions;
};