import nodemailer from "nodemailer";

export const sendEmail = async (
  to: string,
  subject: string,
  text: string
) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SEND_MAIL_ADDRESS,       // 例: "example@gmail.com"
        pass: process.env.SEND_MAIL_API_KEY,  // 例: "abcd efgh ijkl mnop" (16桁)
      },
    });

    // ② 送信メールのオプションを定義
    const mailOptions = {
      from: process.env.GMAIL_ADDRESS,
      to,         // 宛先
      subject,    // 件名
      text,       // プレーンテキスト本文
      // html: "<p>HTML形式の本文</p>", // 必要に応じて
    };

    // ③ メール送信
    await transporter.sendMail(mailOptions);
  } catch (error) {
    /**
     * 現時点でメール送信エラーは致命的なエラーではないので、
     * エラーをコンソールに出力するだけにしておく
     */
    console.error("メール送信エラー:", error);
  }
}
