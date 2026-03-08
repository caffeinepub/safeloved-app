import { Loader2, X } from "lucide-react";
import { useEffect, useState } from "react";

interface AdMobAppOpenProps {
  adUnitId?: string;
  onClose: () => void;
}

export default function AdMobAppOpen({
  adUnitId = "ca-app-pub-7936595519986908/5650397360",
  onClose,
}: AdMobAppOpenProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [countdown, setCountdown] = useState(3);
  const [canClose, setCanClose] = useState(false);

  useEffect(() => {
    // Simulate ad loading
    const loadTimer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

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

    // Auto-close after 4 seconds
    const autoCloseTimer = setTimeout(() => {
      onClose();
    }, 4000);

    return () => {
      clearTimeout(loadTimer);
      clearInterval(countdownInterval);
      clearTimeout(autoCloseTimer);
    };
  }, [onClose]);

  const handleClose = () => {
    if (canClose) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center">
      {/* Close button - only enabled after countdown */}
      <button
        type="button"
        className={`absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all ${
          !canClose ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={handleClose}
        disabled={!canClose}
      >
        <X className="h-6 w-6" />
      </button>

      {/* Countdown indicator */}
      {!canClose && (
        <div className="absolute top-4 left-4 z-10 bg-white/20 text-white text-sm px-3 py-1.5 rounded-full backdrop-blur-sm">
          {countdown}s
        </div>
      )}

      {/* Ad content */}
      <div className="relative w-full max-w-md mx-4">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-12 w-12 animate-spin text-white mb-4" />
            <p className="text-white/80">Loading...</p>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-primary via-accent to-secondary rounded-2xl p-8 shadow-2xl">
            {/* App Open Ad Placeholder */}
            <div className="text-center space-y-6">
              <div className="w-32 h-32 mx-auto">
                <img
                  src="/assets/generated/safeloved-logo-new-transparent.dim_300x100.png"
                  alt="SafeLoved"
                  className="w-full h-full object-contain drop-shadow-2xl"
                />
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-white drop-shadow-lg">
                  Welcome to SafeLoved
                </h2>
                <p className="text-white/90 text-lg">
                  Secure your loved ones with QR codes
                </p>
              </div>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={!canClose}
                  className={`px-8 py-3 bg-white text-primary font-semibold rounded-full shadow-lg transition-all ${
                    canClose
                      ? "hover:bg-white/90 hover:scale-105"
                      : "opacity-50 cursor-not-allowed"
                  }`}
                >
                  {canClose ? "Continue" : `Wait ${countdown}s`}
                </button>
              </div>
            </div>

            {/* Ad Unit ID indicator */}
            <div className="absolute bottom-2 right-2 text-[10px] text-white/30">
              Ad Unit: {adUnitId.slice(-10)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
