import { create } from "zustand";
import { persist } from "zustand/middleware";
import { EmissionRecord, CompanyProfile, Recommendation } from "@/types";
import { generateId } from "@/utils/helpers";

interface AppStore {
  // Theme
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;

  // Company Profile
  company: CompanyProfile | null;
  setCompany: (company: CompanyProfile) => void;

  // Emission Records
  records: EmissionRecord[];
  addRecord: (record: Omit<EmissionRecord, "id" | "timestamp">) => void;
  updateRecord: (id: string, record: Partial<EmissionRecord>) => void;
  deleteRecord: (id: string) => void;
  addMultipleRecords: (records: Array<Omit<EmissionRecord, "id" | "timestamp">>) => void;

  // Recommendations
  recommendations: Recommendation[];
  setRecommendations: (recommendations: Recommendation[]) => void;

  // UI State
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
  success: string | null;
  setSuccess: (message: string | null) => void;

  // Session
  lastSyncTime: string | null;
  setLastSyncTime: (time: string | null) => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set: (arg: Partial<AppStore> | ((state: AppStore) => Partial<AppStore>)) => void) => ({
      // Theme
      theme: "light",
      setTheme: (theme: "light" | "dark") => set({ theme }),

      // Company Profile
      company: null,
      setCompany: (company: CompanyProfile | null) => set({ company }),

      // Emission Records
      records: [],
      addRecord: (record: Omit<EmissionRecord, "id" | "timestamp">) =>
        set((state: AppStore) => ({
          records: [
            ...state.records,
            {
              ...record,
              id: generateId("record_"),
              timestamp: new Date().toISOString(),
            },
          ],
        })),
      updateRecord: (id: string, updatedRecord: Partial<EmissionRecord>) =>
        set((state: any) => ({
          records: state.records.map((r: EmissionRecord) => (r.id === id ? { ...r, ...updatedRecord } : r)),
        })),
      deleteRecord: (id: string) =>
        set((state: any) => ({
          records: state.records.filter((r: EmissionRecord) => r.id !== id),
        })),
      addMultipleRecords: (newRecords: EmissionRecord[]) =>
        set((state: any) => ({
          records: [
            ...state.records,
            ...newRecords.map((r: EmissionRecord) => ({
              ...r,
              id: generateId("record_"),
              timestamp: new Date().toISOString(),
            })),
          ],
        })),

      // Recommendations
      recommendations: [],
      setRecommendations: (recommendations: Recommendation[]) => set({ recommendations }),

      // UI State
      isLoading: false,
      setIsLoading: (loading: boolean) => set({ isLoading: loading }),
      error: null,
      setError: (error: string | null) => set({ error }),
      success: null,
      setSuccess: (success: string | null) => set({ success }),

      // Session
      lastSyncTime: null,
      setLastSyncTime: (time: string | null) => set({ lastSyncTime: time }),
    }),
    {
      name: "carbon-tracker-store",
      partialize: (state: any) => ({
        theme: state.theme,
        company: state.company,
        records: state.records,
      }),
    }
  )
);

export default useAppStore;
