import { useCallback, useEffect, useRef, useState } from "react";
import { useActor } from "./useActor";

export type HealthStatus = "checking" | "online" | "offline";

const RETRY_INTERVAL = 30000; // 30 seconds

export function useBackendHealth() {
  const { actor, isFetching } = useActor();
  const [status, setStatus] = useState<HealthStatus>("checking");
  const [countdown, setCountdown] = useState(RETRY_INTERVAL / 1000);
  const retryTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const countdownTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const checkingRef = useRef(false);

  const checkHealth = useCallback(async () => {
    if (!actor || checkingRef.current) return;
    checkingRef.current = true;
    setStatus("checking");

    try {
      // Use a lightweight call to ping the backend
      await actor.getRecordByUniqueCode("PING_TEST");
      setStatus("online");
      // Clear retry timer on success
      if (retryTimerRef.current) {
        clearInterval(retryTimerRef.current);
        retryTimerRef.current = null;
      }
      if (countdownTimerRef.current) {
        clearInterval(countdownTimerRef.current);
        countdownTimerRef.current = null;
      }
    } catch (error: any) {
      const msg = error?.message || String(error);
      const isBackendDown =
        msg.includes("IC0508") ||
        msg.includes("Canister is stopped") ||
        msg.includes("canister_stopped") ||
        msg.includes("bakımda") ||
        msg.includes("fetch") ||
        msg.includes("network");

      if (isBackendDown) {
        setStatus("offline");
        scheduleRetry();
      } else {
        // Other errors (like record not found) mean backend is online
        setStatus("online");
        if (retryTimerRef.current) {
          clearInterval(retryTimerRef.current);
          retryTimerRef.current = null;
        }
        if (countdownTimerRef.current) {
          clearInterval(countdownTimerRef.current);
          countdownTimerRef.current = null;
        }
      }
    } finally {
      checkingRef.current = false;
    }
  }, [actor]);

  const scheduleRetry = useCallback(() => {
    // Clear existing timers
    if (retryTimerRef.current) clearInterval(retryTimerRef.current);
    if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);

    setCountdown(RETRY_INTERVAL / 1000);

    // Countdown timer
    countdownTimerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) return RETRY_INTERVAL / 1000;
        return prev - 1;
      });
    }, 1000);

    // Retry timer
    retryTimerRef.current = setInterval(() => {
      checkHealth();
    }, RETRY_INTERVAL);
  }, [checkHealth]);

  useEffect(() => {
    if (actor && !isFetching) {
      checkHealth();
    }
  }, [actor, isFetching, checkHealth]);

  useEffect(() => {
    return () => {
      if (retryTimerRef.current) clearInterval(retryTimerRef.current);
      if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
    };
  }, []);

  return { status, countdown, checkHealth };
}
