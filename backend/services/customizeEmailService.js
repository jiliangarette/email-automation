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
      "../templates/job-application-customize.ejs"
    );
    const templateStr = await fs.promises.readFile(templatePath, "utf-8");
    compiledTemplate = ejs.compile(templateStr);
  }
  return compiledTemplate;
};

export const sendCustomEmail = async (emailData) => {
  const {
    email,
    applicantName,
    jobPosition,
    hiringManager,
    resumeUrl,
    customGreeting,
    customClosing,
    bodyParagraph1,
    bodyParagraph2,
    bodyParagraph3,
  } = emailData;

  const formattedApplicantName = applicantName.replace(/\s+/g, "_");

  // Build an array of paragraphs (at least one is required)
  const paragraphs = [];
  if (bodyParagraph1) paragraphs.push(bodyParagraph1);
  if (bodyParagraph2) paragraphs.push(bodyParagraph2);
  if (bodyParagraph3) paragraphs.push(bodyParagraph3);

  const template = await getTemplate();
  const htmlContent = template({
    customGreeting,
    name: hiringManager,
    jobTitle: jobPosition,
    yourName: applicantName,
    customClosing,
    paragraphs,
    imageUrl: "https://example.com/company-logo.png",
  });

  // Create a plain-text version as well
  const textParagraphs = paragraphs.join("\n\n");
  const textContent = `${customGreeting}, ${hiringManager},

${textParagraphs}

${customClosing}, 
${applicantName}`;

  const mailOptions = {
    from: emailConfig.auth.user,
    to: email,
    subject: `${applicantName} - ${jobPosition}`,
    text: textContent,
    html: htmlContent,
    attachments: [
      {
        filename: `${formattedApplicantName}.pdf`,
        path: resumeUrl,
        contentType: "application/pdf",
      },
    ],
  };

  return await transporter.sendMail(mailOptions);
};
