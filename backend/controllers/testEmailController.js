import { sendEmail } from "../services/testEmailService.js";

export const sendTestEmailController = async (req, res) => {
  const { email } = req.body;
  try {
    await sendEmail(email);
    res.status(200).send({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send({ message: "Failed to send email" });
  }
};
