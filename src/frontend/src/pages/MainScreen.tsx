import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCreateUserCode } from "@/hooks/useQueries";
import {
  AlertCircle,
  AlertTriangle,
  Check,
  Copy,
  Loader2,
  LogIn,
  QrCode,
  RefreshCw,
  Search,
  UserPlus,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface MainScreenProps {
  onNavigateToUserScreen: (username: string, code: string) => void;
  onNavigateToInquiry: () => void;
}

export default function MainScreen({
  onNavigateToUserScreen,
  onNavigateToInquiry,
}: MainScreenProps) {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-secondary opacity-90" />
      <div className="absolute inset-0 bg-[url('/assets/generated/safeloved-gradient-bg.dim_1920x1080.png')] bg-cover bg-center opacity-20" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="py-6 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="/assets/generated/safeloved-logo-new-transparent.dim_300x100.png"
                alt="SafeLoved Logo"
                className="h-12 sm:h-16 w-auto drop-shadow-lg"
              />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-6xl w-full">
            <div className="text-center mb-12">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">
                {t.welcomeTitle}
              </h1>
              <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto drop-shadow">
                {t.welcomeSubtitle}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
              {/* User Entry Section */}
              <Card className="backdrop-blur-sm bg-white/95 shadow-2xl border-0 hover:shadow-3xl transition-all duration-300 hover:scale-[1.02]">
                <CardHeader className="space-y-2">
                  <CardTitle className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {t.userEntry}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {t.userEntryDescription}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    size="lg"
                    className="w-full h-14 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-primary to-accent hover:opacity-90"
                    onClick={() => {
                      const event = new CustomEvent("openUserRegistration");
                      window.dispatchEvent(event);
                    }}
                  >
                    <UserPlus className="mr-2 h-5 w-5" />
                    {t.newUserRegistration}
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full h-14 text-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 border-2 hover:bg-accent/10"
                    onClick={() => {
                      const event = new CustomEvent("openUserLogin");
                      window.dispatchEvent(event);
                    }}
                  >
                    <LogIn className="mr-2 h-5 w-5" />
                    {t.existingUserLogin}
                  </Button>
                </CardContent>
              </Card>

              {/* Inquiry Section */}
              <Card className="backdrop-blur-sm bg-white/95 shadow-2xl border-0 hover:shadow-3xl transition-all duration-300 hover:scale-[1.02]">
                <CardHeader className="space-y-2">
                  <CardTitle className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                    {t.inquiryEntry}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {t.inquiryEntryDescription}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    size="lg"
                    className="w-full h-14 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-secondary to-primary hover:opacity-90"
                    onClick={onNavigateToInquiry}
                  >
                    <QrCode className="mr-2 h-5 w-5" />
                    {t.qrCodeInquiry}
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full h-14 text-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 border-2 hover:bg-secondary/10"
                    onClick={onNavigateToInquiry}
                  >
                    <Search className="mr-2 h-5 w-5" />
                    {t.codeInquiry}
                  </Button>
                </CardContent>
              </Card>
            </div>
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

      {/* Dialogs */}
      <UserRegistrationDialog onSuccess={onNavigateToUserScreen} />
      <UserLoginDialog onSuccess={onNavigateToUserScreen} />
    </div>
  );
}

// User Registration Dialog Component
function UserRegistrationDialog({
  onSuccess,
}: { onSuccess: (username: string, code: string) => void }) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"username" | "generate">("username");
  const [username, setUsername] = useState("");
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const createUserCode = useCreateUserCode();

  useEffect(() => {
    const resetFn = createUserCode.reset;
    const handleOpen = () => {
      setOpen(true);
      setStep("username");
      setUsername("");
      setGeneratedCode(null);
      setCopied(false);
      resetFn();
    };
    window.addEventListener("openUserRegistration", handleOpen);
    return () => window.removeEventListener("openUserRegistration", handleOpen);
  }, [createUserCode.reset]);

  const handleUsernameSubmit = () => {
    if (!username.trim()) {
      toast.error(t.enterUsername);
      return;
    }
    setStep("generate");
  };

  const handleGenerate = async () => {
    try {
      const result = await createUserCode.mutateAsync(username.trim());
      if (result) {
        setGeneratedCode(result.userCode);
        toast.success(t.recordCreatedSuccess);
      } else {
        toast.error(t.recordCreationError);
      }
    } catch (error: any) {
      console.error("Kod oluşturma hatası:", error);
      // Error is already formatted by the mutation
      toast.error(error?.message || t.recordCreationError);
    }
  };

  const handleRetry = () => {
    createUserCode.reset();
    handleGenerate();
  };

  const handleCopy = () => {
    if (generatedCode) {
      navigator.clipboard.writeText(generatedCode);
      setCopied(true);
      toast.success(t.codeCopied);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleContinue = () => {
    if (generatedCode && username) {
      onSuccess(username.trim(), generatedCode);
      setOpen(false);
    }
  };

  // Check if error is server maintenance
  const isServerError =
    createUserCode.isError &&
    (createUserCode.error?.message?.includes("bakımda") ||
      createUserCode.error?.message?.includes("Sunucu"));

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {t.newUserRegistrationTitle}
          </DialogTitle>
          <DialogDescription>
            {step === "username" ? t.enterUsername : t.generateCode}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {step === "username" ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="username">{t.username}</Label>
                <Input
                  id="username"
                  placeholder={t.enterYourName}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  maxLength={50}
                  className="text-lg"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUsernameSubmit();
                    }
                  }}
                />
              </div>
              <Button
                onClick={handleUsernameSubmit}
                className="w-full h-12 text-lg"
              >
                {t.continue}
              </Button>
            </>
          ) : !generatedCode ? (
            <>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">
                  {t.username}:
                </p>
                <p className="text-lg font-semibold">{username}</p>
              </div>
              <Button
                onClick={handleGenerate}
                disabled={createUserCode.isPending}
                className="w-full h-12 text-lg"
              >
                {createUserCode.isPending && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {createUserCode.isPending ? t.generating : t.generateCode}
              </Button>
              {createUserCode.isError && (
                <Alert variant={isServerError ? "default" : "destructive"}>
                  {isServerError ? (
                    <AlertTriangle className="h-4 w-4" />
                  ) : (
                    <AlertCircle className="h-4 w-4" />
                  )}
                  <AlertTitle>
                    {isServerError ? t.serverMaintenance : t.error}
                  </AlertTitle>
                  <AlertDescription className="space-y-2">
                    <p>
                      {createUserCode.error?.message || t.recordCreationError}
                    </p>
                    {isServerError && (
                      <>
                        <p className="text-sm">{t.serverMaintenanceMessage}</p>
                        <Button
                          onClick={handleRetry}
                          variant="outline"
                          size="sm"
                          className="mt-3 w-full"
                          disabled={createUserCode.isPending}
                        >
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Tekrar Dene
                        </Button>
                      </>
                    )}
                  </AlertDescription>
                </Alert>
              )}
            </>
          ) : (
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">
                  {t.username}:
                </p>
                <p className="text-lg font-semibold mb-3">{username}</p>
                <p className="text-sm text-muted-foreground mb-2">
                  {t.yourUserCode}:
                </p>
                <p className="text-2xl font-bold tracking-wider font-mono">
                  {generatedCode}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleCopy}
                  variant="outline"
                  className="flex-1"
                >
                  {copied ? (
                    <Check className="mr-2 h-4 w-4" />
                  ) : (
                    <Copy className="mr-2 h-4 w-4" />
                  )}
                  {copied ? t.copied : t.copyCode}
                </Button>
                <Button onClick={handleContinue} className="flex-1">
                  {t.continue}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                {t.saveCodeMessage}
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

// User Login Dialog Component
function UserLoginDialog({
  onSuccess,
}: { onSuccess: (username: string, code: string) => void }) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState("");

  useEffect(() => {
    const handleOpen = () => {
      setOpen(true);
      setCode("");
    };
    window.addEventListener("openUserLogin", handleOpen);
    return () => window.removeEventListener("openUserLogin", handleOpen);
  }, []);

  const handleLogin = () => {
    if (!code.trim()) {
      toast.error(t.toasts.enterCode);
      return;
    }

    // Format check: should be 8 characters with optional space in middle
    const cleanCode = code.trim();
    const codeWithoutSpace = cleanCode.replace(/\s/g, "");

    if (codeWithoutSpace.length !== 8) {
      toast.error(t.toasts.invalidCodeFormat);
      return;
    }

    // Format the code properly if needed
    const formattedCode = cleanCode.includes(" ")
      ? cleanCode
      : `${codeWithoutSpace.slice(0, 4)} ${codeWithoutSpace.slice(4)}`;

    // For existing users, we'll use a placeholder username
    // The actual username will be fetched from backend if needed
    toast.success(t.loginSuccess);
    onSuccess(t.username, formattedCode);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">{t.userLoginTitle}</DialogTitle>
          <DialogDescription>{t.enterExistingCode}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="code">{t.userCode}</Label>
            <Input
              id="code"
              placeholder={t.placeholders.inquiryCode}
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              maxLength={9}
              className="text-center text-lg font-mono tracking-wider"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleLogin();
                }
              }}
            />
          </div>
          <Button onClick={handleLogin} className="w-full h-12 text-lg">
            {t.login}
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            {t.codeFormatMessage}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
