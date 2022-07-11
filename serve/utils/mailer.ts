import nodemailer, { Transporter } from "nodemailer";
import { env } from "./env";
import { logger } from "./logger";

export async function createMail(
  to: string,
  subject: string,
  text: string
): Promise<Transporter> {
  const mail = nodemailer.createTransport({
    host: env["smtp_host"],
    port: parseInt(env["smtp_port"]),
    secure: true,
    auth: {
      user: env["smtp_user"],
      pass: env["smtp_pass"],
    },
  });
  let info = await mail.sendMail({ to, subject, text, from: env["smtp_user"] });
  logger.info(`URL Preview : ${info.messageId}`);
  logger.info(`Message Sent : ${nodemailer.getTestMessageUrl(info)}`);
  return mail;
}
