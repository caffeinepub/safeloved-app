import { useCallback, useState } from "react";

interface AdManagerState {
  showInterstitialAd: boolean;
  lastInterstitialTime: number;
}

const MIN_INTERSTITIAL_INTERVAL = 60000; // 1 minute between interstitials

export function useAdManager() {
  const [state, setState] = useState<AdManagerState>({
    showInterstitialAd: false,
    lastInterstitialTime: 0,
  });

  const showInterstitial = useCallback(() => {
    const now = Date.now();
    const canShow =
      now - state.lastInterstitialTime > MIN_INTERSTITIAL_INTERVAL;

    if (canShow) {
      setState((prev) => ({
        ...prev,
        showInterstitialAd: true,
        lastInterstitialTime: now,
      }));
      return true;
    }
    return false;
  }, [state.lastInterstitialTime]);

  const closeInterstitial = useCallback(() => {
    setState((prev) => ({ ...prev, showInterstitialAd: false }));
  }, []);

  return {
    showInterstitialAd: state.showInterstitialAd,
    showInterstitial,
    closeInterstitial,
  };
}
