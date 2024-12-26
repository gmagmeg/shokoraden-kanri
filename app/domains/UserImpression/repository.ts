import { BookImpressionField, UserBookImpression, UserImpressionUniqueKey } from "@/domains/UserImpression/type";
import { db } from "@/server/db.server";
import { RowDataPacket } from "mysql2";

// 該当の本に対する感想を登録する
export const upsertUserImpressions = async ({ userId, bookId, fieldName, fieldValue }: {
  userId: number,
  bookId: number,
  fieldName: BookImpressionField,
  fieldValue: string | Date
}) => {
  const selectResult = await findBookImpression({ userId, bookId })
  const columnName = (fieldName === 'completionDate')
    ? 'completion_date'
    : 'impression';
  if (selectResult.length > 0) {
    await db.execute(
      `update user_impressions set ${columnName} = ? where user_id = ? and book_id = ?`,
      [fieldValue, userId, bookId]
    );
  } else {
    await db.execute(
      `insert into user_impressions (user_id, book_id, ${columnName}) VALUES (?, ?, ?)`,
      [userId, bookId, fieldValue]
    );
  }
}

// ユーザーの該当本に対する感想が存在するかどうかを判定する
const findBookImpression = async ({ userId, bookId }: UserImpressionUniqueKey): Promise<RowDataPacket[]> => {
  const [selectResult] = await db.query<RowDataPacket[]>(
    `select user_id, book_id from user_impressions where user_id = ? and book_id = ?`,
    [userId, bookId]
  );

  return selectResult;
}

// 本の感想を取得する
export const findBooksImpression = async (userId: number, bookIds: number[]): Promise<UserBookImpression[]> => {
  if (bookIds.length === 0) {
    return [];
  }

  const placeholders = bookIds.map(() => '?').join(', ');
  const query = `select user_id, book_id, impression, completion_date from user_impressions where user_id = ? and book_id in (${placeholders})`;

  const [selectResult] = await db.query<RowDataPacket[]>(query, [userId, ...bookIds]);

  return selectResult.map(record => ({
    userId: record.user_id,
    bookId: record.book_id,
    impression: record.impression ?? '',
    completionDate: record.completion_date
      ? new Date(record.completion_date)
      : null
  }));
}

