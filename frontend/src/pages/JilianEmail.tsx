import { Label } from "../components/ui/Label";
import { Button } from "../components/ui/Button";
import { Separator } from "../components/ui/Separator";
import { Card, CardContent } from "../components/ui/Card";
import AutoResizingInput from "../components/AutoResizingInput";
import { ArrowRight, Paperclip, X, Loader2, Plus } from "lucide-react";
import { supabase } from "../lib/supabaseClient";
import { useState, useEffect } from "react";

const JilianEmail = () => {
  const [email, setEmail] = useState<string>("");
  const [applicantName, setApplicantName] = useState<string>("");
  const [jobPosition, setJobPosition] = useState<string>("");
  const [hiringManager, setHiringManager] = useState<string>("");

  const [fullName, setFullName] = useState<string>("");
  const [company, setCompany] = useState<string>("");

  const [paragraphs, setParagraphs] = useState<string[]>([""]);

  const [statusMessage, setStatusMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  useEffect(() => {
    if (statusMessage) {
      const timer = setTimeout(() => setStatusMessage(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [statusMessage]);

  const addParagraph = () => {
    if (paragraphs.length < 3) {
      setParagraphs([...paragraphs, ""]);
    }
  };

  const removeParagraph = (index: number) => {
    if (paragraphs.length > 1) {
      const newParagraphs = paragraphs.filter((_, i) => i !== index);
      setParagraphs(newParagraphs);
    }
  };

  const handleParagraphChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    index: number
  ) => {
    const newParagraphs = [...paragraphs];
    newParagraphs[index] = e.target.value;
    setParagraphs(newParagraphs);
  };

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

    const payload = {
      email,
      applicantName,
      companyName: company,
      hiringManagerFullName: fullName,
      jobPosition,
      hiringManager,
      resumeUrl,
      bodyParagraph1: paragraphs[0],
      bodyParagraph2: paragraphs[1] || "",
      bodyParagraph3: paragraphs[2] || "",
    };

    const apiUrl = `${import.meta.env.VITE_BASE_URL}/jilian-email`;

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setStatusMessage(
          "Your custom email was submitted! We're processing your email…"
        );
        setEmail("");
        setApplicantName("");
        setJobPosition("");
        setHiringManager("");
        setFullName("");
        setCompany("");
        setParagraphs([""]);
        setPdfFile(null);
      } else {
        setStatusMessage("Failed to send custom email. Please try again.");
      }
    } catch (err: unknown) {
      console.error("Error sending custom email:", err);
      setStatusMessage("Error sending custom email. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-3xl border-none shadow-none mx-auto">
      <form onSubmit={handleSubmit}>
        <CardContent className="p-6">
          {/* General Email Information */}
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
                    placeholder="[Job Position]"
                  />
                </div>
              </div>
            </div>
          </div>
          <Separator />

          <div className="py-4">
            <div>
              <AutoResizingInput
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="[HR Full Name] (Optional)"
                minWidth={60}
              />
            </div>
            <div>
              <AutoResizingInput
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="[Company Name] (Optional)"
                minWidth={80}
              />
            </div>
          </div>
          <Separator />

          {/* Email Body */}
          <div className="space-y-4 py-2">
            <div className="flex items-center gap-2">
              Dear
              <AutoResizingInput
                value={hiringManager}
                onChange={(e) => setHiringManager(e.target.value)}
                placeholder="[Hiring Manager]"
                minWidth={120}
              />
              <span>,</span>
            </div>

            <div className="space-y-4">
              {paragraphs.map((para, index) => (
                <div key={index} className="relative">
                  <textarea
                    value={para}
                    onChange={(e) => handleParagraphChange(e, index)}
                    placeholder={`Enter paragraph ${index + 1}`}
                    className="w-full rounded-md border p-2"
                    rows={3}
                  />
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removeParagraph(index)}
                      className="absolute top-0 right-0 mt-2 mr-2 text-destructive"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              {paragraphs.length < 3 && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={addParagraph}
                    className="flex items-center text-primary"
                  >
                    <Plus className="w-4 h-4" />
                    <span className="ml-1 text-sm">Add Paragraph</span>
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-1">
              Sincerely,
              <p className="font-medium">{applicantName || "Your Name"}</p>
            </div>
          </div>
          <Separator />

          <div className="space-y-2">
            <Label className="text-muted-foreground text-sm">Attachments</Label>
            <div className="flex items-center gap-2">
              {pdfFile ? (
                <div className="flex items-center gap-2 bg-muted px-3 py-1.5 rounded-md text-sm">
                  <Paperclip className="w-4 h-4" />
                  <span className="max-w-[200px] truncate">{pdfFile.name}</span>
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
                  Send Custom Email
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
        </CardContent>
      </form>
    </Card>
  );
};

export default JilianEmail;
