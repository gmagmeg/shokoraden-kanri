import { Input } from "@/components/ui/Input"
import { CiMail } from "react-icons/ci";

import { PiPasswordLight } from "react-icons/pi";


export const LoginInput = ({ email, password, type }: {
  email: string,
  password: string,
  type: "register" | "login",
}) => {
  return (
    <>
      <div className="flex items-center gap-4 mb-4">
        <label htmlFor="email" className="min-w-28 flex items-center gap-1">
          <CiMail />
          メール
        </label>
        <Input
          defaultValue={email}
          id={`email-${type}`}
          type="email"
          placeholder="example@example.com"
          required
          name="email"
          className="bg-white"
        />
      </div>
      <div className="flex items-center gap-4">
        <label htmlFor="password" className="min-w-28 flex items-center gap-1">
          <PiPasswordLight />
          パスワード
        </label>
        <Input
          defaultValue={password}
          id={`password-${type}`}
          type="password"
          placeholder="xxx"
          required
          name="password"
          autoComplete="current-password"
          className="bg-white"
        />
      </div>
    </>
  )
}