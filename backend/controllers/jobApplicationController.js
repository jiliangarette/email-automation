import { sendEmail } from "../services/emailService.js";

export const standardEmailController = async (req, res) => {
  const { email, applicantName, jobPosition, hiringManager, resumeUrl } =
    req.body;
  sendEmail({ email, applicantName, jobPosition, hiringManager, resumeUrl })
    .then(() => {
      console.log("Email sent successfully");
    })
    .catch((error) => {
      console.error("Error sending email:", error);
    });

  res.status(200).send({ message: "Data received. Email is being sent!" });
};
