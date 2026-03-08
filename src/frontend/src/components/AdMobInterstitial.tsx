import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2, X } from "lucide-react";
import { useEffect, useState } from "react";

interface AdMobInterstitialProps {
  adUnitId?: string;
  isOpen: boolean;
  onClose: () => void;
  autoCloseDelay?: number; // milliseconds
}

export default function AdMobInterstitial({
  adUnitId = "ca-app-pub-7936595519986908/1427957612",
  isOpen,
  onClose,
  autoCloseDelay = 5000,
}: AdMobInterstitialProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [countdown, setCountdown] = useState(5);
  const [canClose, setCanClose] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      setCountdown(5);
      setCanClose(false);

      // Simulate ad loading
      const loadTimer = setTimeout(() => {
        setIsLoading(false);
      }, 1000);

      // Countdown timer
      const countdownInterval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(countdownInterval);
            setCanClose(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // Auto-close after delay
      const autoCloseTimer = setTimeout(() => {
        onClose();
      }, autoCloseDelay + 1000);

      return () => {
        clearTimeout(loadTimer);
        clearInterval(countdownInterval);
        clearTimeout(autoCloseTimer);
      };
    }
  }, [isOpen, autoCloseDelay, onClose]);

  const handleClose = () => {
    if (canClose) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent
        className="max-w-2xl w-full p-0 gap-0 overflow-hidden"
        onPointerDownOutside={(e) => {
          if (!canClose) {
            e.preventDefault();
          }
        }}
        onEscapeKeyDown={(e) => {
          if (!canClose) {
            e.preventDefault();
          }
        }}
      >
        {/* Close button - only enabled after countdown */}
        <Button
          variant="ghost"
          size="icon"
          className={`absolute top-2 right-2 z-10 rounded-full bg-black/50 hover:bg-black/70 text-white ${
            !canClose ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleClose}
          disabled={!canClose}
        >
          <X className="h-4 w-4" />
        </Button>

        {/* Countdown indicator */}
        {!canClose && (
          <div className="absolute top-2 left-2 z-10 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
            {countdown}s
          </div>
        )}

        <DialogHeader className="sr-only">
          <DialogTitle>Advertisement</DialogTitle>
          <DialogDescription>
            Please wait for the advertisement to finish
          </DialogDescription>
        </DialogHeader>

        {/* Ad content */}
        <div className="relative w-full aspect-video bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10">
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 text-primary" />
                <p className="text-sm text-muted-foreground">
                  Loading advertisement...
                </p>
              </div>
            </div>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
              {/* Generic Interstitial Ad Placeholder */}
              <div className="text-center space-y-4">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="max-w-md space-y-4">
                    <div className="w-32 h-32 mx-auto rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 flex items-center justify-center shadow-2xl">
                      <span className="text-6xl">📢</span>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 bg-clip-text text-transparent">
                        Advertisement
                      </h3>
                      <p className="text-muted-foreground text-lg">
                        Thank you for using SafeLoved
                      </p>
                    </div>
                    {canClose && (
                      <Button
                        variant="default"
                        size="lg"
                        onClick={handleClose}
                        className="mt-6 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
                      >
                        Continue
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* Ad Unit ID indicator */}
              <div className="absolute bottom-2 right-2 text-[10px] text-muted-foreground/50">
                Ad Unit: {adUnitId.slice(-10)}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
