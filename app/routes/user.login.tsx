import { ActionFunction, ActionFunctionArgs, redirect, json } from "@remix-run/node";
import { getLatestBooksURL, response } from "@/server/function";
import { authenticator, createUserSession, getUserFromJWT } from "@/server/auth.server";
import { commitSession, getSession } from "@/server/session.server";
import { LoginModal } from "@/components/LoginModal/LoginModal";
import { AuthContext } from "@/domains/Auth/context";
import { useLoaderData } from "@remix-run/react";

export type ErrorMessage = {
  login?: string;
  register?: string;
}

/**
 * 非Getメソッド時
 * ログイン処理判定を行う
 */
export const action: ActionFunction = async ({ request }: { request: Request }) => {
  try {
    const user = await authenticator.authenticate("login-user-password", request);
    return await createUserSession(user.id, user.email, getLatestBooksURL());
  } catch (error) {
    console.log(error);
    const session = await getSession(request.headers.get("Cookie"));
    session.flash("loginErrorMessage", "メールアドレスかパスワードが間違っています");

    return await redirect('/user/login', {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }
};

// Getメソッド時、ログイン済みの場合はリダイレクト
export const loader = async ({ request }: { request: Request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const loginErrorMessage = session.get("loginErrorMessage");
  const registerErrorMessage = session.get("registerErrorMessage");

  // エラーメッセージを取得後、セッションからクリア
  session.unset("loginErrorMessage");
  session.unset("registerErrorMessage");

  return response({
    errorMessage: {
      login: loginErrorMessage,
      register: registerErrorMessage,
    }
  }, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};

export default function UserLogin() {
  const response = useLoaderData<{
    requestParams: { email: string, password: string } | null,
    errorMessage: ErrorMessage
  }>();

  return (
    <AuthContext.Provider value={false}>
      <LoginModal
        email={response.requestParams?.email}
        password={response.requestParams?.password}
        accountName=""
        errorMessage={response.errorMessage}
      />
    </AuthContext.Provider>
  );
}