import { useState } from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";
import { ArrowRight } from "lucide-react";

const StandardEmail = () => {
  // New fields for the additional email details
  const [applicantName, setApplicantName] = useState<string>("");
  const [jobPosition, setJobPosition] = useState<string>("");
  const [hiringManager, setHiringManager] = useState<string>("");

  const [email, setEmail] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage("");

    const apiUrl = `${import.meta.env.VITE_BASE_URL}/standard`;

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          applicantName,
          jobPosition,
          hiringManager,
        }),
      });

      if (response.ok) {
        setStatusMessage("Email sent successfully!");
        setEmail("");
        setApplicantName("");
        setJobPosition("");
        setHiringManager("");
      } else {
        setStatusMessage("Failed to send email.");
      }
    } catch (err: unknown) {
      console.error("Error sending email:", err);
      setStatusMessage("Error sending email. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <h2 className="text-2xl font-bold">Email Automation Test</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Applicant Name Input */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="applicantName">Your Name</Label>
          <Input
            id="applicantName"
            type="text"
            placeholder="Your Name"
            value={applicantName}
            onChange={(e) => setApplicantName(e.target.value)}
            required
            className="py-6 px-8"
          />
        </div>
        {/* Job Position / Reference Input */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="jobPosition">Job Position (Reference Number)</Label>
          <Input
            id="jobPosition"
            type="text"
            placeholder="Job Position (Reference Number)"
            value={jobPosition}
            onChange={(e) => setJobPosition(e.target.value)}
            required
            className="py-6 px-8"
          />
        </div>
        {/* Hiring Manager Input */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="hiringManager">Hiring Manager</Label>
          <Input
            id="hiringManager"
            type="text"
            placeholder="Hiring Manager"
            value={hiringManager}
            onChange={(e) => setHiringManager(e.target.value)}
            required
            className="py-6 px-8"
          />
        </div>
        {/* Recipient Email Input */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Recipient Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter recipient email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="py-6 px-8"
          />
        </div>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="py-6 px-8 cursor-pointer group"
        >
          {isSubmitting ? (
            "Sending..."
          ) : (
            <>
              Send Email
              <ArrowRight className="w-6 h-6" />
            </>
          )}
        </Button>
      </form>

      {/* Preview of the Email */}
      <div className="border p-4 rounded-lg">
        <h3 className="font-semibold mb-2">Email Preview:</h3>
        <p>
          <strong>Subject:</strong> {applicantName || "[Your Name]"} -{" "}
          {jobPosition || "[Job Position (Reference Number)]"}
        </p>
        <p>Hello {hiringManager || "[Hiring Manager]"},</p>
        <p>
          I wish to apply for the position of{" "}
          {jobPosition || "[Name of the Position]"} that is listed on your
          website. The responsibilities outlined in the job description align
          with my skills and experience, and I believe I would be a valuable
          addition to your team.
        </p>
        <p>
          I have attached my resume and cover letter for your attention. I hope
          they can help you learn more about my background, my qualifications,
          and my experience.
        </p>
        <p>
          Thank you for your valuable time. I look forward to hearing from you
          about this job opportunity.
        </p>
        <p>Sincerely,</p>
        <p>{applicantName || "[Your Name]"}</p>
      </div>
      {statusMessage && <div className="text-sm">{statusMessage}</div>}
    </div>
  );
};

export default StandardEmail;
