import { ActionFunction, redirect } from "@remix-run/node";
import { upsertUserImpressions } from "@/domains/UserImpression/repository";
import { getLatestBooksURL, response } from "@/server/function";
import { getUserFromJWT } from "@/server/auth.server";


/**
 * 非Getメソッド時
 */
export const action: ActionFunction = async ({ request }) => {
  const user = await getUserFromJWT(request);
  if (!user) {
    return response({
      error: "ログインしてください"
    });
  }

  const formData = await request.formData();
  const userId = Number(user.id);
  const bookId = Number(formData.get("bookId") ?? '0');
  const fieldName = String(formData.get("fieldName") ?? '');
  const fieldValue = String(formData.get("fieldValue")) ?? '';

  try {
    // @ts-expect-error fieldValueの型が不明
    await upsertUserImpressions({ userId, bookId, fieldName, fieldValue });

    return redirect(getLatestBooksURL());
  } catch (error) {
    console.error(error);
    return { error: "保存中にエラーが発生しました。" };
  }
};