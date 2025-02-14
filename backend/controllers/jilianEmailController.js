import { sendJilianEmail } from "../services/jilianEmailService.js";

export const jilianEmailController = async (req, res) => {
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
  } = req.body;

  sendJilianEmail({
    email,
    companyName,
    hiringManagerFullName,
    applicantName,
    jobPosition,
    hiringManager,
    resumeUrl,
    bodyParagraph1,
    bodyParagraph2,
    bodyParagraph3,
  })
    .then(() => {
      console.log("Custom email sent successfully");
    })
    .catch((error) => {
      console.error("Error sending custom email:", error);
      console.error("Error stack:", error.stack);
    });

  res
    .status(200)
    .send({ message: "Data received. Custom email is being sent!" });
};
