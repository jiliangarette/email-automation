import { useState } from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";
import { ArrowRight } from "lucide-react";

const EmailAutomation = () => {
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
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatusMessage("Email sent successfully!");
        setEmail("");
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
      <div className="text-center">
        <h2 className="text-2xl font-bold"> 
          Email Automation Test
        </h2>
        <p className="text-muted-foreground mt-1">
          This is a simple test for the email automation feature.
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex gap-3">
          <div className="flex-1">
            <Label htmlFor="email" className="sr-only">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="rounded-[20px] py-6 px-8"
            />
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="rounded-[20px] py-6 px-8 cursor-pointer group">
            {isSubmitting ? (
              "Sending..."
            ) : (
              <>
                Send Email
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-all duration-300 ease-in-out" />
              </>
            )}
          </Button>
        </div>
        <p className="text-sm text-muted-foreground mt-2 text-center">
          Your email will only be used to send this test message and won't be stored
        </p>
      </form>
      {statusMessage && (
        <div className="mt-4 text-center text-sm font-semibold text-green-500">
          {statusMessage}
        </div>
      )}
    </div>
  );
};

export default EmailAutomation;
