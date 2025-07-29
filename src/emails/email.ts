import nodemailer from "nodemailer";

import {
  ACCOUNT_DELETION_EMAIL_TEMPLATE,
  PASSWORD_RESET_EMAIL_TEMPLATE,
  PASSWORD_RESET_SUCCESS_EMAIL_TEMPLATE,
} from "./Templates";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD, // Use environment variable for security
  },
});

export const sendResetPasswordEmail = async (email: string, resetURL: string) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset",
      html: PASSWORD_RESET_EMAIL_TEMPLATE.replace(
        "{resetURL}",
        resetURL
      ).replace(
        "{email}",
        email
      ).replace(
        "{clientURL}",
        process.env.NEXTAUTH_URL as string
      ),
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.log("An error occured while sending password reset email: ", error);
  }
};

export const sendResetPasswordSuccessEmail = async (email: string, name: string) => {
  try {
    const mailOptions = {
      from: "process.env.EMAIL_USER",
      to: email,
      subject: "Password Reset Successful",
      html: PASSWORD_RESET_SUCCESS_EMAIL_TEMPLATE.replace(
        "{username}",
        name
      ).replace(
        "{email}",
        email
      ).replace(
        "{clientURL}",
        process.env.NEXTAUTH_URL as string
      ),
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.log("An error occured while sending password reset success email: ", error);
  }
};

export const sendAccountDeletionEmail = async (email: string, username: string) => {
  try {
    const mailOptions = {
      from: "process.env.EMAIL_USER",
      to: email,
      subject: "Account Deletion Confirmation",
      html: ACCOUNT_DELETION_EMAIL_TEMPLATE.replace(
        "{username}",
        username
      ).replace(
        "{clientURL}",
        process.env.NEXTAUTH_URL as string
      ),
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.log("An error occured while sending account deletion email: ", error);
  }
};