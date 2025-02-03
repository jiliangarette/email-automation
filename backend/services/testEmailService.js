import nodemailer from "nodemailer";
import emailConfig from "../config/emailConfig.js";
import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";

const transporter = nodemailer.createTransport(emailConfig);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const sendEmail = async (email) => {
  const templatePath = path.join(__dirname, "../templates/emailTemplate.ejs");
  const htmlContent = await ejs.renderFile(templatePath, {
    title: "Email Automation Testing",
    message: "This is an automated email to test the email functionality.",
    buttonLink: "https://jiliangarette.xyz",
    buttonText: "Visit Our Site",
    imageUrl:
      "https://i.pinimg.com/736x/cb/4e/4f/cb4e4f87176e318fce6579fd89c6cb6a.jpg",
  });
  const mailOptions = {
    from: emailConfig.auth.user,
    to: email,
    subject: "Email Automation Testing",
    text: "This is an automated email to test the email functionality.",
    html: htmlContent,
  };
  return await transporter.sendMail(mailOptions);
};
