import { useCallback, useEffect, useRef, useState } from "react";
import { useActor } from "./useActor";

export type HealthStatus = "checking" | "online" | "offline";

const RETRY_INTERVAL = 10000; // 10 seconds
const MAX_FAILURES_BEFORE_OFFLINE = 3; // only show offline banner after 3 consecutive real failures

export function useBackendHealth() {
  const { actor, isFetching } = useActor();
  const [status, setStatus] = useState<HealthStatus>("checking");
  const [countdown, setCountdown] = useState(RETRY_INTERVAL / 1000);
  const retryTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const countdownTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const checkingRef = useRef(false);
  const consecutiveFailuresRef = useRef(0);

  const clearTimers = useCallback(() => {
    if (retryTimerRef.current) {
      clearInterval(retryTimerRef.current);
      retryTimerRef.current = null;
    }
    if (countdownTimerRef.current) {
      clearInterval(countdownTimerRef.current);
      countdownTimerRef.current = null;
    }
  }, []);

  const scheduleRetry = useCallback(
    (fn: () => void) => {
      clearTimers();
      setCountdown(RETRY_INTERVAL / 1000);
      countdownTimerRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) return RETRY_INTERVAL / 1000;
          return prev - 1;
        });
      }, 1000);
      retryTimerRef.current = setInterval(fn, RETRY_INTERVAL);
    },
    [clearTimers],
  );

  const checkHealth = useCallback(async () => {
    if (!actor || checkingRef.current) return;
    checkingRef.current = true;

    try {
      // Any response (including "record not found") means backend is alive
      await actor.getRecordByUniqueCode("PING_TEST");
      consecutiveFailuresRef.current = 0;
      setStatus("online");
      clearTimers();
    } catch (error: any) {
      const msg = String(error?.message ?? error ?? "");

      // Transient network issues -- not a real canister outage
      const isTransient =
        msg.includes("fetch") ||
        msg.includes("Failed to fetch") ||
        msg.includes("NetworkError") ||
        msg.includes("Load failed") ||
        msg.includes("network") ||
        msg.includes("ERR_NETWORK");

      // IC canister truly stopped/unreachable
      const isReallyDown =
        msg.includes("IC0508") ||
        msg.includes("IC0503") ||
        msg.includes("IC0302") ||
        msg.includes("Canister is stopped") ||
        msg.includes("canister_stopped");

      if (isTransient && !isReallyDown) {
        // Transient: count failures but keep "checking" until threshold
        consecutiveFailuresRef.current += 1;
        if (consecutiveFailuresRef.current >= MAX_FAILURES_BEFORE_OFFLINE) {
          setStatus("offline");
        } else {
          setStatus("checking");
        }
        scheduleRetry(() => checkHealth());
      } else if (isReallyDown) {
        consecutiveFailuresRef.current += 1;
        if (consecutiveFailuresRef.current >= MAX_FAILURES_BEFORE_OFFLINE) {
          setStatus("offline");
        } else {
          setStatus("checking");
        }
        scheduleRetry(() => checkHealth());
      } else {
        // Any other error (e.g. "record not found") -- backend is online
        consecutiveFailuresRef.current = 0;
        setStatus("online");
        clearTimers();
      }
    } finally {
      checkingRef.current = false;
    }
  }, [actor, clearTimers, scheduleRetry]);

  useEffect(() => {
    if (actor && !isFetching) {
      checkHealth();
    }
  }, [actor, isFetching, checkHealth]);

  useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);

  return { status, countdown, checkHealth };
}
