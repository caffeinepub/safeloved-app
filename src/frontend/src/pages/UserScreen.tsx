import MyRecordsTab from "@/components/MyRecordsTab";
import NewRecordTab from "@/components/NewRecordTab";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowLeft, LogOut, Smartphone, User } from "lucide-react";

interface UserScreenProps {
  username: string;
  userCode: string;
  onNavigateBack: () => void;
  onLogout: () => void;
  onShowInterstitial: () => boolean;
}

export default function UserScreen({
  username,
  userCode,
  onNavigateBack,
  onLogout,
  onShowInterstitial,
}: UserScreenProps) {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-secondary opacity-90" />
      <div className="absolute inset-0 bg-[url('/assets/generated/safeloved-gradient-bg.dim_1920x1080.png')] bg-cover bg-center opacity-20" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="py-6 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={onNavigateBack}
              className="text-white hover:bg-white/20"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t.backToHome}
            </Button>

            {/* User Profile Dropdown - with margin to avoid language selector */}
            <div className="mr-14">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="text-white hover:bg-white/20 gap-2"
                  >
                    <User className="h-5 w-5" />
                    <span className="hidden sm:inline">{username}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64">
                  <DropdownMenuLabel>{t.userProfile}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="px-2 py-3 space-y-2">
                    <div>
                      <p className="text-xs text-muted-foreground">
                        {t.username}
                      </p>
                      <p className="text-sm font-semibold">{username}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">
                        {t.userCode}
                      </p>
                      <p className="text-sm font-mono font-semibold">
                        {userCode}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  {/* B10: Cross-device sync hint */}
                  <div className="px-2 py-2">
                    <div className="flex items-start gap-2 text-xs text-muted-foreground bg-muted/60 rounded-md p-2">
                      <Smartphone className="h-3.5 w-3.5 mt-0.5 flex-shrink-0 text-primary" />
                      <p className="leading-snug">{t.syncHint}</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={onLogout}
                    className="text-destructive focus:text-destructive cursor-pointer"
                    data-ocid="user.button"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    {t.logout}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-6xl mx-auto">
            <Card className="backdrop-blur-sm bg-white/95 shadow-2xl border-0">
              <CardHeader className="text-center space-y-2">
                <CardTitle className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {t.userScreen}
                </CardTitle>
                <CardDescription className="text-base">
                  {t.userScreenDescription}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <Tabs defaultValue="new-record" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-8">
                    <TabsTrigger value="new-record" className="text-base">
                      {t.newRecord}
                    </TabsTrigger>
                    <TabsTrigger value="my-records" className="text-base">
                      {t.myRecords}
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="new-record">
                    <NewRecordTab
                      userCode={userCode}
                      onShowInterstitial={onShowInterstitial}
                    />
                  </TabsContent>
                  <TabsContent value="my-records">
                    <MyRecordsTab userCode={userCode} />
                  </TabsContent>
                </Tabs>
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
