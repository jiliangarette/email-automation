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
      "../templates/job-application-standard.ejs"
    );
    const templateStr = await fs.promises.readFile(templatePath, "utf-8");
    compiledTemplate = ejs.compile(templateStr);
  }
  return compiledTemplate;
};

export const sendEmail = async (emailData) => {
  const { email, applicantName, jobPosition, hiringManager, resumeUrl } =
    emailData;

  const formattedApplicantName = applicantName.replace(/\s+/g, "_");

  const template = await getTemplate();
  const htmlContent = template({
    name: hiringManager,
    jobTitle: jobPosition,
    yourName: applicantName,
    imageUrl: "https://example.com/company-logo.png",
  });

  const textContent = `Subject: ${applicantName} - ${jobPosition}

Hello ${hiringManager},

 I am writing to express my interest in the ${jobPosition}  position advertised on your website. My skills and experience
                align with the responsibilities outlined in the job description,
                and I am confident in my ability to contribute effectively to
                your team.

  Please find my resume attached for your review. I trust these
                documents will provide you with further insight into my
                qualifications and relevant experience.

  Thank you for your time and consideration. I look forward to the
                possibility of discussing this opportunity further.

Sincerely,
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
