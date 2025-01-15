import { verify } from "argon2";
import { Authenticator } from 'remix-auth'
import { FormStrategy } from 'remix-auth-form'
import { findUser } from "@/domains/User/repository";
import { LoginUser } from "@/domains/User/type";
import jwt from "jsonwebtoken";
import { createCookieSessionStorage, redirect } from "@remix-run/node";
import { getLatestBooksURL } from "./function";
import { parse } from "cookie";

/**
 * セッションストレージの作成と設定
 * セッションストレージにはJWTを利用する
 */
const SESSION_SECRET = process.env.SESSION_SECRET!
if (!SESSION_SECRET) {
  throw new Error('SESSION_SECRET is not defined')
}
export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "jwt",
    secrets: [SESSION_SECRET],
    sameSite: "lax",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 365,
  },
});

// ユーザーセッションの作成
export const createUserSession = async (
  id: number,
  email: string,
  redirectTo: string
) => {
  const token = jwt.sign({ id, email }, SESSION_SECRET, { expiresIn: "1year" });
  const cookie = [
    `token=${token}`,
    "Path=/",
    "HttpOnly",
    "Secure",
    "SameSite=Lax",
  ].join("; ");

  return await redirect(redirectTo, {
    headers: {
      "Set-Cookie": cookie,
    },
  });
}

// セッションからユーザー情報を取得
export const getUserFromJWT = async (request: Request) => {
  const cookieHeader = request.headers.get("Cookie");
  const token = (() => {
    if (!cookieHeader) {
      return null;
    }

    const parsed = parse(cookieHeader);
    return parsed.token || null;
  })();
  if (!token) {
    return null;
  }

  try {
    const payload = jwt.verify(token, SESSION_SECRET) as LoginUser;
    return { id: payload.id, name: payload.name, email: payload.email };
  } catch (error) {
    return null;
  }
}

// ログアウト処理の関数
export const logout = async () => {
  const cookie = `token=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict; Secure`;

  return await redirect(getLatestBooksURL(), {
    headers: {
      "Set-Cookie": cookie
    },
  });
}

const authenticator = new Authenticator<LoginUser>()
const formStrategy = new FormStrategy(async ({ form }) => {
  let requestEmail = form.get('email')
  let requestPassword = form.get('password')

  if (!requestEmail || !requestPassword) {
    throw new Error('IDかパスワードが間違っています');
  }
  requestEmail = requestEmail.toString();
  requestPassword = requestPassword.toString();

  const userRecord = await findUser(requestEmail);
  if (!userRecord) {
    throw new Error('IDかパスワードが間違っています');
  }

  const isVerify = await verify(userRecord.password, requestPassword);
  if (!isVerify) {
    throw new Error('IDかパスワードが間違っています');
  }

  const { id, email, name, password } = userRecord;

  const isPasswordValid = await verify(password, requestPassword)
  if (!isPasswordValid) {
    throw new Error('IDかパスワードが間違っています')
  }

  return await { id, email, name }
})
authenticator.use(formStrategy as FormStrategy<LoginUser>, 'login-user-password')
export { authenticator }
