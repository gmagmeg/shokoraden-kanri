import { SubmitButton } from "@/components/ui/SubmitButton";
import { LoginInput } from "@/components/LoginModal/LoginInput";
import { CancelButton } from "@/components/ui/CancelButton";
import { Form } from "@remix-run/react";
import { FC, useState } from "react";
import { ErrorMessage } from "@/routes/user.login"
import { Input } from "@/components/ui/Input";
import { CiUser } from "react-icons/ci";
import { CiLogin } from "react-icons/ci";
import { TabHeader } from "./TabHeader";

type TabType = 'login' | 'register';

export const LoginModal: FC<{
  email?: string,
  password?: string,
  accountName?: string,
  errorMessage: ErrorMessage,
}> = ({
  email = "",
  password = "",
  accountName = "",
  errorMessage,
}) => {
    const [activeTab, setActiveTab] = useState<TabType>('login');

    return (
      <div
        id="default-modal"
        className="overflow-y-auto overflow-x-hidden flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-white" >
        <div className="relative p-4 w-full max-w-lg max-h-full">
          {/* Modal content */}
          <div className="relative bg-white">
            {/* Tab headers */}
            <TabHeader
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />

            {/* Modal body */}
            <div className="p-4 md:p-5 space-y-4">
              {/* Login Form */}
              {activeTab === 'login' && (
                <>
                  {errorMessage.login && (
                    <p style={{ color: "red" }}>{errorMessage.login}</p>
                  )}
                  <Form method="post" action="/user/login">
                    <h2 className="font-bold text-xl mb-4 flex items-center gap-1"><CiLogin className="mr-1" />ログイン</h2>
                    <LoginInput
                      email={email}
                      password={password}
                      type="login"
                    />
                    <div className="flex mt-4">
                      <SubmitButton
                        label="ログイン"
                        addClassName={"mr-4"}
                      />
                      <CancelButton
                        label="キャンセル"
                        onClick={() => { }}
                      />
                    </div>
                  </Form>
                </>
              )}

              {/* Register Form */}
              {activeTab === 'register' && (
                <>
                  {errorMessage.register && (
                    <p style={{ color: "red" }}>{errorMessage.register}</p>
                  )}
                  <Form
                    method="post"
                    action="/user/register"
                  >
                    <h2 className="font-bold text-xl mb-4 flex items-center gap-1"><CiUser className="mr-1" />新規登録</h2>
                    <div className="flex items-center gap-4 mb-4">
                      <label htmlFor="name" className="min-w-28 flex items-center gap-1">
                        <CiUser />
                        アカウント名
                      </label>
                      <Input
                        defaultValue={accountName}
                        id="account-name"
                        type="text"
                        placeholder="アカウント名"
                        required
                        name="name"
                      />
                    </div>
                    <LoginInput
                      email={email}
                      password={password}
                      type="register"
                    />
                    <div className="flex mt-4">
                      <SubmitButton
                        label="新規登録"
                        addClassName={"mr-8"}
                      />
                      <CancelButton
                        label="キャンセル"
                        onClick={() => { }}
                      />
                    </div>
                  </Form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }