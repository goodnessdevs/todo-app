import nodemailer from "nodemailer";
import {
  PASSWORD_RESET_EMAIL_TEMPLATE,
  PASSWORD_RESET_SUCCESS_EMAIL_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
} from "./emailTemplates";

// Validate necessary environment variables
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASSWORD;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";

if (!EMAIL_PASS) {
  throw new Error("EMAIL_PASSWORD is not defined in environment variables.");
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

export const sendWelcomeEmail = async (email: string, name: string) => {
  const html = WELCOME_EMAIL_TEMPLATE
    .replace("{username}", name)
    .replace("{clientURL}", CLIENT_URL);

  return sendEmail({
    to: email,
    subject: "Welcome",
    html,
  });
};


export const sendResetPasswordEmail = async (email: string, resetURL: string) => {
  const html = PASSWORD_RESET_EMAIL_TEMPLATE
    .replace("{resetURL}", resetURL)
    .replace("{email}", email)
    .replace("{clientURL}", CLIENT_URL);

  return sendEmail({
    to: email,
    subject: "Password Reset",
    html,
  });
};

export const sendResetPasswordSuccessEmail = async (email: string, name: string) => {
  const html = PASSWORD_RESET_SUCCESS_EMAIL_TEMPLATE
    .replace("{username}", name)
    .replace("{email}", email)
    .replace("{clientURL}", CLIENT_URL);

  return sendEmail({
    to: email,
    subject: "Password Reset Successful",
    html,
  });
};

// 🧠 Shared mail sending function
const sendEmail = async ({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) => {
  const mailOptions = {
    from: EMAIL_USER,
    to,
    subject,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${to}: ${info.response}`);
  } catch (error) {
    console.error(`❌ Failed to send email to ${to}:`, error);
  }
};
