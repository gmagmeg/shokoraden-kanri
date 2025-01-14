import { useContext, useState } from "react";
import { AuthContext } from "@/domains/Auth/context";
import { Form, Link } from "@remix-run/react";
import { MonthlyBookList } from "../MonthlyBookLink";
import { LoginIcon } from "./icon/LoginIcon";
import { PiNotebookFill } from "react-icons/pi";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import { CiLogout } from "react-icons/ci";


interface GlobalMenuProps {
  monthlyBookDates: string[];
}

export const GlobalMenu: React.FC<GlobalMenuProps> = ({ monthlyBookDates }) => {
  const isAuth = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1c5e4f] p-4 text-white">
        <div className="flex items-center justify-between">
          <Link to="/books">
            <h1 className="text-lg md:text-2xl font-bold pr-4 flex items-center gap-2">
              <PiNotebookFill className="w-8 h-8" />
              書庫らでん読書手帳
            </h1>
          </Link>
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <IoMdClose className="w-6 h-6" />
            ) : (
              <RxHamburgerMenu className="w-6 h-6" />
            )}
          </button>
        </div>

        <div className={`${isMenuOpen ? 'block' : 'hidden'} md:block mt-4 md:mt-0 md:flex md:items-center md:justify-between`}>
          <div className="flex-shrink-0">
            <MonthlyBookList monthlyBookDates={monthlyBookDates} />
          </div>
          <div className="mt-4 md:mt-0 md:ml-auto flex justify-center">
            {!isAuth ? (
              <Link to="/user/login" className="flex items-center gap-1 hover:text-gray-200">
                <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md flex items-center gap-1">
                  <LoginIcon />
                  ログイン
                </button>
              </Link>
            ) : (
              <Form method="post" action="/user/logout">
                <button type="submit" className="flex items-center gap-1 hover:text-gray-200">
                  <CiLogout />
                  ログアウト
                </button>
              </Form>
            )}
          </div>
        </div>
      </nav>
      <div className="h-32 md:h-16"></div>
    </>
  );
};