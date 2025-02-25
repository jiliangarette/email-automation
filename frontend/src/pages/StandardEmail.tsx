import { Label } from "../components/ui/Label";
import { Button } from "../components/ui/Button";
import { Separator } from "../components/ui/Separator";
import { Card, CardContent } from "../components/ui/Card";
import AutoResizingInput from "../components/AutoResizingInput";

import { ArrowRight, Paperclip, X, Loader2 } from "lucide-react";
import { supabase } from "../lib/supabaseClient";
import { useState, useEffect } from "react";

const StandardEmail = () => {
  const [applicantName, setApplicantName] = useState<string>("");
  const [hiringManager, setHiringManager] = useState<string>("");
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [jobPosition, setJobPosition] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [pdfFile, setPdfFile] = useState<File | null>(null);

  useEffect(() => {
    if (statusMessage) {
      const timer = setTimeout(() => setStatusMessage(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [statusMessage]);

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
        setStatusMessage(
          "Your application was submitted! We're processing your email…"
        );
        setEmail("");
        setApplicantName("");
        setJobPosition("");
        setHiringManager("");
        setPdfFile(null);
      } else {
        setStatusMessage("Failed to send email. Please try again.");
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
                I am writing to express my interest in the{" "}
                <span className="font-medium">
                  {jobPosition || "Name of the Position"}
                </span>{" "}
                position advertised on your website. My skills and experience
                align with the responsibilities outlined in the job description,
                and I am confident in my ability to contribute effectively to
                your team.
              </p>

              <p className="text-sm leading-relaxed">
                Please find my resume attached for your review. I trust these
                documents will provide you with further insight into my
                qualifications and relevant experience.
              </p>

              <p className="text-sm leading-relaxed">
                Thank you for your time and consideration. I look forward to the
                possibility of discussing this opportunity further.
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
                className="w-full cursor-pointer sm:w-auto flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    &nbsp;Processing...
                  </>
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
                  statusMessage.includes("Error") ||
                  statusMessage.includes("Failed")
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
