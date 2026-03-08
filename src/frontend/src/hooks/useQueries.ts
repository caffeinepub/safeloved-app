import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  RecordCategory,
  RecordData,
  UserProfile,
  UserRecord,
} from "../backend";
import { useActor } from "./useActor";

// Helper function to detect canister stopped error
function isCanisterStoppedError(error: any): boolean {
  const errorMessage = error?.message || String(error);
  return (
    errorMessage.includes("IC0508") ||
    errorMessage.includes("Canister is stopped") ||
    errorMessage.includes("canister is stopped") ||
    errorMessage.includes("canister_stopped") ||
    errorMessage.includes("has no update method")
  );
}

// Helper function to get user-friendly error message in Turkish
function getErrorMessage(error: any): string {
  if (isCanisterStoppedError(error)) {
    return "Sunucu şu anda bakımda. Lütfen birkaç dakika sonra tekrar deneyin.";
  }

  const errorMessage = error?.message || String(error);

  if (errorMessage.includes("network") || errorMessage.includes("fetch")) {
    return "Bağlantı hatası. İnternet bağlantınızı kontrol edin.";
  }

  if (errorMessage.includes("timeout")) {
    return "İstek zaman aşımına uğradı. Lütfen tekrar deneyin.";
  }

  // Anonymous user check - this is the only authorization error that should occur
  if (errorMessage.includes("Anonymous users cannot")) {
    return "Lütfen giriş yapın.";
  }

  // Generic error message for any other errors
  return errorMessage || "Bir hata oluştu. Lütfen tekrar deneyin.";
}

// Helper function to extract contact info from record data
function extractContactInfo(recordData: RecordData): {
  contactPerson: string;
  contactInfo: string;
} {
  switch (recordData.__kind__) {
    case "insan":
      return {
        contactPerson: recordData.insan.contactPerson,
        contactInfo: recordData.insan.contactInfo,
      };
    case "hayvan":
      return {
        contactPerson: recordData.hayvan.contactPerson,
        contactInfo: recordData.hayvan.contactInfo,
      };
    case "esya":
      return {
        contactPerson: recordData.esya.contactPerson,
        contactInfo: recordData.esya.contactInfo,
      };
    case "arac":
      return {
        contactPerson: recordData.arac.contactPerson,
        contactInfo: recordData.arac.contactInfo,
      };
  }
}

export function useCreateUserCode() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (username: string) => {
      if (!actor) throw new Error("Sunucu bağlantısı kurulamadı");

      try {
        const result = await actor.createNewUserCode(username);

        if (!result) {
          throw new Error("Kod oluşturulamadı. Lütfen tekrar deneyin.");
        }

        return result;
      } catch (error: any) {
        console.error("Create user code error:", error);
        throw new Error(getErrorMessage(error));
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userCodes"] });
    },
    retry: (failureCount, error: any) => {
      // Don't retry if canister is stopped
      if (isCanisterStoppedError(error)) {
        return false;
      }
      return failureCount < 2;
    },
  });
}

export function useGetAllUserCodes() {
  const { actor, isFetching } = useActor();

  return useQuery<string[]>({
    queryKey: ["userCodes"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getAllUserCodes();
      } catch (error: any) {
        console.error("Error fetching user codes:", error);
        if (isCanisterStoppedError(error)) {
          throw new Error(getErrorMessage(error));
        }
        return [];
      }
    },
    enabled: !!actor && !isFetching,
    retry: (failureCount, error: any) => {
      if (isCanisterStoppedError(error)) {
        return false;
      }
      return failureCount < 2;
    },
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    staleTime: 30000,
  });
}

export function useGetProfileByUserCode(userCode: string) {
  const { actor, isFetching } = useActor();

  return useQuery<UserProfile | null>({
    queryKey: ["userProfile", userCode],
    queryFn: async () => {
      if (!actor) return null;
      try {
        return await actor.getProfileByUserCode(userCode);
      } catch (error: any) {
        console.error("Error fetching profile:", error);
        if (isCanisterStoppedError(error)) {
          throw new Error(getErrorMessage(error));
        }
        return null;
      }
    },
    enabled: !!actor && !isFetching && !!userCode,
    retry: (failureCount, error: any) => {
      if (isCanisterStoppedError(error)) {
        return false;
      }
      return failureCount < 2;
    },
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    staleTime: 30000,
  });
}

export function useAddNewRecord() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userCode,
      category,
      recordData,
    }: {
      userCode: string;
      category: RecordCategory;
      recordData: RecordData;
    }) => {
      if (!actor) throw new Error("Sunucu bağlantısı kurulamadı");

      try {
        // Extract contact info from record data
        const { contactPerson, contactInfo } = extractContactInfo(recordData);

        // Call backend with all 5 required parameters
        const result = await actor.addNewRecord(
          userCode,
          category,
          recordData,
          contactPerson,
          contactInfo,
        );

        if (!result) {
          throw new Error("Kayıt oluşturulamadı. Lütfen tekrar deneyin.");
        }

        return result;
      } catch (error: any) {
        console.error("Add record error:", error);
        throw new Error(getErrorMessage(error));
      }
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["userRecords", variables.userCode],
      });
    },
    retry: (failureCount, error: any) => {
      if (isCanisterStoppedError(error)) {
        return false;
      }
      return failureCount < 2;
    },
  });
}

export function useGetAllRecordsForUser(userCode: string) {
  const { actor, isFetching } = useActor();

  return useQuery<UserRecord[]>({
    queryKey: ["userRecords", userCode],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getAllRecordsForUser(userCode);
      } catch (error: any) {
        console.error("Error fetching records:", error);
        if (isCanisterStoppedError(error)) {
          throw new Error(getErrorMessage(error));
        }
        return [];
      }
    },
    enabled: !!actor && !isFetching && !!userCode,
    retry: (failureCount, error: any) => {
      if (isCanisterStoppedError(error)) {
        return false;
      }
      return failureCount < 2;
    },
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    staleTime: 30000,
  });
}

export function useGetRecordByUniqueCode() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async (code: string) => {
      if (!actor) throw new Error("Sunucu bağlantısı kurulamadı");

      try {
        return await actor.getRecordByUniqueCode(code);
      } catch (error: any) {
        console.error("Get record error:", error);
        throw new Error(getErrorMessage(error));
      }
    },
    retry: (failureCount, error: any) => {
      if (isCanisterStoppedError(error)) {
        return false;
      }
      return failureCount < 2;
    },
  });
}

export function useGenerateShareLink() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (recordId: string) => {
      if (!actor) throw new Error("Sunucu bağlantısı kurulamadı");
      try {
        return await actor.generateShareableLink(recordId);
      } catch (error: any) {
        throw new Error(getErrorMessage(error));
      }
    },
  });
}

export function useGetRecordByShareableLink() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (linkId: string) => {
      if (!actor) throw new Error("Sunucu bağlantısı kurulamadı");
      try {
        return await actor.getRecordByShareableLink(linkId);
      } catch (error: any) {
        throw new Error(getErrorMessage(error));
      }
    },
  });
}

export function useDeleteRecord() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userCode,
      uniqueCode,
    }: {
      userCode: string;
      uniqueCode: string;
    }) => {
      if (!actor) throw new Error("Sunucu bağlantısı kurulamadı");
      try {
        return await actor.deleteRecord(userCode, uniqueCode);
      } catch (error: any) {
        console.error("Delete record error:", error);
        throw new Error(getErrorMessage(error));
      }
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["userRecords", variables.userCode],
      });
    },
    retry: (failureCount, error: any) => {
      if (isCanisterStoppedError(error)) return false;
      return failureCount < 2;
    },
  });
}

export function useUpdateRecordData() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      uniqueCode,
      recordData,
    }: {
      userCode: string;
      uniqueCode: string;
      recordData: RecordData;
    }) => {
      if (!actor) throw new Error("Sunucu bağlantısı kurulamadı");
      try {
        return await actor.updateRecordData(uniqueCode, recordData);
      } catch (error: any) {
        console.error("Update record data error:", error);
        throw new Error(getErrorMessage(error));
      }
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["userRecords", variables.userCode],
      });
    },
    retry: (failureCount, error: any) => {
      if (isCanisterStoppedError(error)) return false;
      return failureCount < 2;
    },
  });
}

export function useUpdateRecordLocation() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async ({
      uniqueCode,
      location,
    }: {
      uniqueCode: string;
      location: string;
    }) => {
      if (!actor) throw new Error("Sunucu bağlantısı kurulamadı");
      try {
        return await actor.updateRecordLocation(uniqueCode, location);
      } catch (error: any) {
        console.error("Update record location error:", error);
        throw new Error(getErrorMessage(error));
      }
    },
    retry: (failureCount, error: any) => {
      if (isCanisterStoppedError(error)) return false;
      return failureCount < 2;
    },
  });
}

export function useIncrementViewCount() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async (uniqueCode: string) => {
      if (!actor) throw new Error("Sunucu bağlantısı kurulamadı");
      try {
        return await actor.incrementViewCount(uniqueCode);
      } catch (error: any) {
        console.error("Increment view count error:", error);
        // Silently fail - view count is not critical
        return false;
      }
    },
    retry: false,
  });
}
