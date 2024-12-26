import { ActionFunction, redirect } from "@remix-run/node";
import { registerUser } from "@/domains/User/repository";
import { getLatestBooksURL, response } from "@/server/function";
import { createUserSession } from "@/server/auth.server";
import { commitSession, getSession } from "@/server/session.server";

// Action (データを保存する処理)
export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const name = String(formData.get("name") ?? '');
  const email = String(formData.get("email") ?? '');
  const password = String(formData.get("password") ?? '');

  if (name === '' || email === '' || password === '') {
    return { error: "入力が不正です" };
  }

  try {
    const userId = await registerUser({ name, email, password })
    const session = await getSession(request.headers.get("Cookie"));
    return await createUserSession(userId, getLatestBooksURL(), session);
  } catch (error) {
    console.error(error);
    const session = await getSession(request.headers.get("Cookie"));
    session.flash("registerErrorMessage", error.message);
    return await redirect('/user/login', {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }
};

export const loader = async () => {
  // @todo 新規登録時のエラーメッセージ対応
  return response({})
}

export default function UserRegister() {
  return null;
}