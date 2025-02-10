import nodemailer from "nodemailer";
import emailConfig from "../config/emailConfig.js";
import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";

const transporter = nodemailer.createTransport(emailConfig);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const sendEmail = async (emailData) => {
  const { email, applicantName, jobPosition, hiringManager, resumeUrl } =
    emailData;

  // Format the applicant's name by replacing spaces with underscores
  const formattedApplicantName = applicantName.replace(/\s+/g, "_");

  const templatePath = path.join(
    __dirname,
    "../templates/job-application-standard.ejs"
  );

  const htmlContent = await ejs.renderFile(templatePath, {
    name: hiringManager,
    jobTitle: jobPosition,
    yourName: applicantName,
    imageUrl: "https://example.com/company-logo.png",
  });

  const textContent = `Subject: ${applicantName} - ${jobPosition}

Hello ${hiringManager},

I wish to apply for the position of ${jobPosition} that is listed on your website. The responsibilities outlined in the job description align with my skills and experience, and I believe I would be a valuable addition to your team.

I have attached my resume and cover letter for your attention. I hope they can help you learn more about my background, my qualifications, and my experience.

Thank you for your valuable time. I look forward to hearing from you about this job opportunity.

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
