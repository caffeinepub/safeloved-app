import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowLeft, Check, Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface UserDashboardProps {
  userCode: string;
  onNavigateBack: () => void;
}

export default function UserDashboard({
  userCode,
  onNavigateBack,
}: UserDashboardProps) {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(userCode);
    setCopied(true);
    toast.success(t.codeCopied);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-secondary opacity-90" />
      <div className="absolute inset-0 bg-[url('/assets/generated/safeloved-gradient-bg.dim_1920x1080.png')] bg-cover bg-center opacity-20" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="py-6 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <Button
              variant="ghost"
              onClick={onNavigateBack}
              className="text-white hover:bg-white/20"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t.backToHome}
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-2xl w-full space-y-8">
            <Card className="backdrop-blur-sm bg-white/95 shadow-2xl border-0">
              <CardHeader className="text-center space-y-4">
                <CardTitle className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {t.welcomeMessage}
                </CardTitle>
                <CardDescription className="text-lg">
                  {t.accountCreatedSuccess}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-8 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border-2 border-primary/20">
                  <p className="text-sm text-muted-foreground mb-3 text-center">
                    {t.yourUserCode}:
                  </p>
                  <p className="text-4xl sm:text-5xl font-bold text-center tracking-wider font-mono mb-4">
                    {userCode}
                  </p>
                  <Button
                    onClick={handleCopy}
                    variant="outline"
                    className="w-full"
                  >
                    {copied ? (
                      <Check className="mr-2 h-4 w-4" />
                    ) : (
                      <Copy className="mr-2 h-4 w-4" />
                    )}
                    {copied ? t.copied : t.copyCode}
                  </Button>
                </div>

                <div className="space-y-3 p-6 bg-muted/50 rounded-lg">
                  <h3 className="font-semibold text-lg">{t.importantInfo}</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>{t.saveCodeSecurely}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>{t.needCodeForLogin}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>{t.dontShareCode}</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>

        {/* Privacy Policy Link */}
        <div className="text-center py-6">
          <a
            href="https://sites.google.com/view/safeloved/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/80 hover:text-white text-sm font-medium transition-colors underline"
          >
            {t.privacyPolicy}
          </a>
        </div>
      </div>
    </div>
  );
}
