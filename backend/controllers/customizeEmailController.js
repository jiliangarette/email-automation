import { sendCustomEmail } from "../services/customizeEmailService.js";

export const customizeEmailController = async (req, res) => {
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
  } = req.body;

  sendCustomEmail({
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
  })
    .then(() => {
      console.log("Custom email sent successfully");
    })
    .catch((error) => {
      console.error("Error sending custom email:", error);
    });

  res
    .status(200)
    .send({ message: "Data received. Custom email is being sent!" });
};
