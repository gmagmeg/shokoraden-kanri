import { redirect } from "@remix-run/node";
import { logout } from "@/server/auth.server";
import { getLatestBooksURL } from "@/server/function";

export const action = async () => {
  return await logout();
};

export const loader = async () => {
  return redirect(getLatestBooksURL());
};

export default function Logout() {
  return null;
}