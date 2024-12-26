import { db } from "@/server/db.server";
import { RowDataPacket, ResultSetHeader } from "mysql2";
import { NewRegisterUser, LoginUser } from "./type";
import { hash, argon2id } from "argon2";

export const registerUser = async ({ name, email, password }: NewRegisterUser): Promise<number> => {
  const [exist] = await db.query<RowDataPacket[]>(
    'SELECT id FROM user WHERE email = ?',
    [email]
  );
  if (exist.length > 0) {
    throw new Error('既に登録されているメールアドレスです')
  }
  const hashPassword = await hash(password, {
    type: argon2id
  });
  const [result] = await db.execute<ResultSetHeader>(
    `insert into user (name, email, password) VALUES (?, ?, ?)`,
    [name, email, hashPassword]
  );
  return result.insertId;
}

export const findUser = async (inputEmail: string): Promise<LoginUser> => {
  const [user] = await db.query<{ email: string } & RowDataPacket[]>(
    'SELECT id, name, email, password FROM user WHERE email = ?',
    [inputEmail]
  );
  const { id, name, email, password } = user[0];

  return { id, name, email, password }
}