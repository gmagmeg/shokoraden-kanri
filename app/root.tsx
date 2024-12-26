import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { fetchMonthlyBookDates } from "@/domains/MonthlyBook/repository";
import { GlobalMenu } from "@/components/ui/GlobalMenu";

import "./tailwind.css";

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
};

export const loader = async () => {
  const monthlyBookDates = await fetchMonthlyBookDates();
  return { monthlyBookDates };
};

export function Layout({ children }: { children: React.ReactNode }) {
  const { monthlyBookDates } = useLoaderData<LoaderData>();

  return (
    <html lang="ja" className="bg-white">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="月別の推薦図書を管理するサイトです。" />
        <meta name="theme-color" content="#1c5e4f" />
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
  );
}

export default function App() {
  return <Outlet />;
}
