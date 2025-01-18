import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import { fetchMonthlyBookDates } from "@/domains/MonthlyBook/repository";
import { GlobalMenu } from "@/components/ui/GlobalMenu";

import "./tailwind.css";
import { getUserFromJWT } from "./server/auth.server";
import { AuthContext } from "./domains/Auth/context";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

type LoaderData = {
  monthlyBookDates: string[];
  isAuth: boolean;
};

export const loader: LoaderFunction = async ({ request }) => {
  const monthlyBookDates = await fetchMonthlyBookDates();
  const user = await getUserFromJWT(request);

  return { monthlyBookDates, isAuth: user !== null };
};

export function ErrorBoundary() {
  const error = useRouteError();
  return (
    <html lang="ja" className="bg-white">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="月別の推薦図書を管理するサイトです。" />
        <meta name="theme-color" content="#1c5e4f" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <Meta />
        <Links />
      </head>
      <body className="bg-white text-black min-h-screen">
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
          <h1 className="text-2xl font-bold mb-4">エラーが発生しました</h1>
          <p className="text-gray-600">申し訳ありませんが、問題が発生しました。</p>
          <p className="text-gray-600">しばらく時間をおいてから再度アクセスしてください。</p>
        </div>
        <Scripts />
      </body>
    </html>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  const { monthlyBookDates, isAuth } = useLoaderData<LoaderData>();

  return (
    <AuthContext.Provider value={isAuth}>
      <html lang="ja" className="bg-white">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="description" content="月別の推薦図書を管理するサイトです。" />
          <meta name="theme-color" content="#1c5e4f" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <Meta />
          <Links />
        </head>
        <body className="bg-white text-black min-h-screen">
          <GlobalMenu monthlyBookDates={monthlyBookDates} />
          <div className="pt-16">
            {children}
          </div>
          <ScrollRestoration />
          <Scripts />
        </body>
      </html>
    </AuthContext.Provider>
  );
}

export default function App() {
  return <Outlet />;
}
