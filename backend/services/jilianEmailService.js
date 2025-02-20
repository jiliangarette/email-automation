import nodemailer from "nodemailer";
import emailConfig from "../config/emailConfig.js";
import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const transporter = nodemailer.createTransport({
  ...emailConfig,
  pool: true,
  maxConnections: 5,
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let compiledTemplate = null;

const getTemplate = async () => {
  if (!compiledTemplate) {
    const templatePath = path.join(
      __dirname,
      "../templates/job-application-jilian.ejs"
    );
    const templateStr = await fs.promises.readFile(templatePath, "utf-8");
    compiledTemplate = ejs.compile(templateStr);
  }
  return compiledTemplate;
};

export const sendJilianEmail = async (emailData) => {
  const {
    email,
    companyName,
    applicantName,
    jobPosition,
    hiringManager,
    hiringManagerFullName,
    resumeUrl,
    bodyParagraph1,
    bodyParagraph2,
    bodyParagraph3,
  } = emailData;

  const formattedApplicantName = applicantName.replace(/\s+/g, "_");

  const paragraphs = [];
  if (bodyParagraph1) paragraphs.push(bodyParagraph1);
  if (bodyParagraph2) paragraphs.push(bodyParagraph2);
  if (bodyParagraph3) paragraphs.push(bodyParagraph3);

  const template = await getTemplate();
  const htmlContent = template({
    company: companyName,
    fullName: hiringManagerFullName,
    name: hiringManager,
    jobTitle: jobPosition,
    yourName: applicantName,
    paragraphs,
    imageUrl: "https://example.com/company-logo.png",
  });

  const textParagraphs = paragraphs.join("\n\n");
  const textContent = `Dear ${hiringManager},

${textParagraphs}

Sincerely, 
${applicantName}`;

  const attachments = [];
  if (resumeUrl) {
    attachments.push({
      filename: `${formattedApplicantName}.pdf`,
      path: resumeUrl,
      contentType: "application/pdf",
    });
  }

  const mailOptions = {
    from: emailConfig.auth.user,
    to: email,
    bcc: emailConfig.auth.user,
    subject: `${applicantName} - ${jobPosition}`,
    text: textContent,
    html: htmlContent,
    attachments,
  };

  return await transporter.sendMail(mailOptions);
};
