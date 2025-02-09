import { sendEmail } from "../services/emailService.js";

export const standardEmailController = async (req, res) => {
  const { email, applicantName, jobPosition, hiringManager } = req.body;
  try {
    await sendEmail({ email, applicantName, jobPosition, hiringManager });
    res
      .status(200)
      .send({ message: "Email sent successfully from standard template!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send({ message: "Failed to send email" });
  }
};
