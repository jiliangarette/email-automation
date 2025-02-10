import { Label } from "../components/ui/Label";
import { Button } from "../components/ui/Button";
import { Separator } from "../components/ui/Separator";
import { Card, CardContent } from "../components/ui/Card";
import AutoResizingInput from "../components/AutoResizingInput";

import { ArrowRight, Paperclip, X } from "lucide-react";
import { supabase } from "../lib/supabaseClient";
import { useState } from "react";

const StandardEmail = () => {
  const [applicantName, setApplicantName] = useState<string>("");
  const [hiringManager, setHiringManager] = useState<string>("");
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [jobPosition, setJobPosition] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [pdfFile, setPdfFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage("");

    let resumeUrl = "";

    if (pdfFile) {
      const fileExt = pdfFile.name.split(".").pop();
      const fileName = `${applicantName
        .replace(/\s+/g, "-")
        .toLowerCase()}-${Date.now()}.${fileExt}`;
      const filePath = `resumes/${fileName}`;

      const { data, error: uploadError } = await supabase.storage
        .from("resume")
        .upload(filePath, pdfFile);

      if (uploadError || !data) {
        console.error("Error uploading file to Supabase:", uploadError);
        setStatusMessage("Error uploading PDF. Please try again.");
        setIsSubmitting(false);
        return;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("resume").getPublicUrl(filePath);

      if (!publicUrl) {
        console.error("Error getting public URL");
        setStatusMessage("Error retrieving PDF URL. Please try again.");
        setIsSubmitting(false);
        return;
      }

      resumeUrl = publicUrl;
    }

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
          resumeUrl,
        }),
      });

      if (response.ok) {
        setStatusMessage("Email sent successfully!");
        setEmail("");
        setApplicantName("");
        setJobPosition("");
        setHiringManager("");
        setPdfFile(null);
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
    <Card className="w-full max-w-3xl border-none shadow-none mx-auto">
      <form onSubmit={handleSubmit}>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xs">From:</span>
                <span className="text-xs">jiliangarette@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Label className="text-muted-foreground">To:</Label>
                <AutoResizingInput
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="[Enter recipient email]"
                />
              </div>
              <div className="flex items-center gap-2">
                <Label className="text-muted-foreground">Subject:</Label>
                <div className="flex-1 flex items-center gap-2">
                  <AutoResizingInput
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    required
                    placeholder="[Your Name]"
                  />
                  <span>-</span>
                  <AutoResizingInput
                    value={jobPosition}
                    onChange={(e) => setJobPosition(e.target.value)}
                    required
                    placeholder="[Job Position (Reference Number)]"
                  />
                </div>
              </div>
            </div>

            <Separator />
            {/* Email Body */}
            <div className="space-y-4 py-2">
              <div className="flex items-center gap-2">
                <span>Hello</span>
                <AutoResizingInput
                  value={hiringManager}
                  onChange={(e) => setHiringManager(e.target.value)}
                  placeholder="[Hiring Manager]"
                  minWidth={150}
                />
                <span>,</span>
              </div>

              <p className="text-sm leading-relaxed">
                I wish to apply for the position of{" "}
                <span className="font-medium">
                  {jobPosition || "Name of the Position"}
                </span>{" "}
                that is listed on your website. The responsibilities outlined in
                the job description align with my skills and experience, and I
                believe I would be a valuable addition to your team.
              </p>

              <p className="text-sm leading-relaxed">
                I have attached my resume and cover letter for your attention. I
                hope they can help you learn more about my background, my
                qualifications, and my experience.
              </p>

              <p className="text-sm leading-relaxed">
                Thank you for your valuable time. I look forward to hearing from
                you about this job opportunity.
              </p>

              <div className="space-y-1">
                <p className="text-sm">Sincerely,</p>
                <p className="font-medium">{applicantName || "Your Name"}</p>
              </div>
            </div>

            <Separator />
            <div className="space-y-2">
              <Label className="text-muted-foreground text-sm">
                Attachments
              </Label>
              <div className="flex items-center gap-2">
                {pdfFile ? (
                  <div className="flex items-center gap-2 bg-muted px-3 py-1.5 rounded-md text-sm">
                    <Paperclip className="w-4 h-4" />
                    <span className="max-w-[200px] truncate">
                      {pdfFile.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => setPdfFile(null)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <Label
                    htmlFor="pdfFile"
                    className="flex items-center gap-2 cursor-pointer text-sm text-muted-foreground hover:text-foreground"
                  >
                    <Paperclip className="w-4 h-4" />
                    <span>Attach Resume (PDF)</span>
                  </Label>
                )}
                <input
                  id="pdfFile"
                  type="file"
                  accept="application/pdf"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (e.target.files && e.target.files[0]) {
                      setPdfFile(e.target.files[0]);
                    }
                  }}
                  className="hidden"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto flex items-center gap-2"
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    Send Email
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </div>

            {statusMessage && (
              <p
                className={`text-sm ${
                  statusMessage.includes("Error")
                    ? "text-destructive"
                    : "text-green-600"
                }`}
              >
                {statusMessage}
              </p>
            )}
          </div>
        </CardContent>
      </form>
    </Card>
  );
};

export default StandardEmail;
