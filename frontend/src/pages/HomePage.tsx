import { Mail, Plus, Palette } from "lucide-react";
import PageLayout from "../layouts/HomeLayout";
import { Badge } from "../components/ui/Badge";

export default function HomePage() {
  return (
    <PageLayout>
      <div className="min-h-screen bg-background">
        {/* Templates Section */}
        <section className="container mx-auto px-4 py-16 ">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Choose Your Template</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Start with our professional template or create your own custom
              design. Both options are optimized for job applications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <a href="/standard" className="group">
              <div className="relative bg-card rounded-xl border p-6 space-y-4 transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
                <Badge variant="secondary" className="absolute top-4 right-4">
                  Standard
                </Badge>
                <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Mail className="size-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Standard Template</h3>
                  <p className="text-muted-foreground">
                    Professional template with proven results.
                  </p>
                </div>
                <div className="relative overflow-hidden rounded-xl border aspect-video bg-muted">
                  <img
                    src="/images/standard.png"
                    alt="Standard email template preview"
                    className="object-cover w-full h-full transition-transform group-hover:scale-105"
                  />
                </div>
              </div>
            </a>

            <a href="/customize" className="group" aria-label="Custom Template">
              <div className="relative h-full bg-card rounded-xl border p-6 space-y-4 transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
                <Badge variant="secondary" className="absolute top-4 right-4">
                  Customize
                </Badge>
                <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Palette className="size-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Custom Template</h3>
                  <p className="text-muted-foreground">
                    Design your perfect template from scratch with our
                    easy-to-use builder.
                  </p>
                </div>
                <div className="relative aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-primary/5 to-primary/10 border">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Plus className="size-12 text-primary/40 mx-auto mb-2" />
                      <span className="text-sm text-muted-foreground">
                        Create Your Design
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
