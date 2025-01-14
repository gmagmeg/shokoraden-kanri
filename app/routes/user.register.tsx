import { ActionFunction, redirect } from "@remix-run/node";
import { registerUser } from "@/domains/User/repository";
import { getLatestBooksURL, response } from "@/server/function";
import { createUserSession } from "@/server/auth.server";
import { commitSession, getSession } from "@/server/session.server";
import { sendEmail } from "@/domains/Auth/function.server";

// Action (データを保存する処理)
export const action: ActionFunction = async ({ request }) => {
  try {
    const formData = await request.formData();
    const name = String(formData.get("name") ?? '');
    const email = String(formData.get("email") ?? '');
    const password = String(formData.get("password") ?? '');


    if (name === '' || email === '' || password === '') {
      const session = await getSession(request.headers.get("Cookie"));
      session.flash("loginErrorMessage", "メールアドレスかパスワードが間違っています");

      return await redirect('/user/login', {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      });
    }

    const userId = await registerUser({ name, email, password })
    await sendEmail(
      email,
      "登録が完了しました",
      `${name}様

  書庫らでん読書手帳へのご登録ありがとうございます。
  アカウントの登録が完了したことをお知らせいたします。

  ※ このメールは送信専用です。ご返信いただいてもお答えできません。
  `);

    return await createUserSession(
      userId,
      getLatestBooksURL(),
      '/books'
    );
  } catch (error) {
    console.error(error);
    const session = await getSession(request.headers.get("Cookie"));
    // @ts-expect-error エラーが出るので無視
    session.flash("registerErrorMessage", error.message);
    return await redirect('/user/login', {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }
};

export const loader = async () => {
  return response({})
}

export default function UserRegister() {
  return null;
}