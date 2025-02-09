import { Mail, Plus, Sparkles } from "lucide-react";
import PageLayout from "../layouts/HomeLayout";

export default function HomePage() {
  return (
    <PageLayout>
      <div className="min-h-screen bg-background">
        <main className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold tracking-tight lg:text-5xl mb-4">
              Universal Email Automation
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Streamline your job application process with our intelligent email
              templates. Choose from our carefully crafted options or create
              your own.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <a href="/standard" className="group">
              <div className="relative bg-card rounded-xl border p-6 space-y-4 transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
                <div className="absolute top-4 right-4 inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                  Standard
                </div>
                <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Mail className="size-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold">Standard Template</h3>
                  <p className="text-sm text-muted-foreground">
                    Professional and proven template
                  </p>
                </div>
                <img
                  src="/images/standard.png"
                  alt="Standard email template preview"
                  className="object-cover w-full h-full"
                />
              </div>
            </a>

            <a href="/enhanced" className="group">
              <div className="relative bg-card rounded-xl border p-6 space-y-4 transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
                <div className="absolute top-4 right-4 inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                  Add ons
                </div>
                <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Sparkles className="size-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold">Add ons Template</h3>
                  <p className="text-sm text-muted-foreground">
                    Extra features and customizable elements.
                  </p>
                </div>
                <img
                  src="/images/standard.png"
                  alt="Enhanced email template preview"
                  className="object-cover w-full h-full"
                />
              </div>
            </a>

            <a href="/test" className="group ">
              <div className="relative  h-full bg-card rounded-xl border p-6 space-y-4 transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
                <div className="absolute top-4 right-4 inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                  Customize
                </div>
                <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Plus className="size-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold">Customizable Template</h3>
                  <p className="text-sm text-muted-foreground">
                    Create your own template from scratch
                  </p>
                </div>
                <div className="relative  h-60 rounded-lg overflow-hidden bg-muted">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Plus className="size-12 text-muted-foreground/50" />
                  </div>
                </div>
              </div>
            </a>
          </div>
        </main>
      </div>
    </PageLayout>
  );
}
