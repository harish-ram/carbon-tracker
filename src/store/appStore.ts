import { create } from "zustand";
import { persist } from "zustand/middleware";
import { EmissionRecord, CompanyProfile, Recommendation } from "@/types";
import { User } from "firebase/auth";
import {
  addEmissionRecord,
  updateEmissionRecord,
  deleteEmissionRecord,
  getUserEmissionRecords,
} from "@/services/firestoreService";

interface AppStore {
  // Authentication
  user: User | null;
  setUser: (user: User | null) => void;
  
  // Theme
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;

  // Company Profile
  company: CompanyProfile | null;
  setCompany: (company: CompanyProfile) => void;

  // Emission Records
  records: EmissionRecord[];
  loadRecords: () => Promise<void>;
  addRecord: (record: Omit<EmissionRecord, "id" | "timestamp">) => Promise<void>;
  updateRecord: (id: string, record: Partial<EmissionRecord>) => Promise<void>;
  deleteRecord: (id: string) => Promise<void>;

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
    (set: (arg: Partial<AppStore> | ((state: AppStore) => Partial<AppStore>)) => void, get: () => AppStore) => ({
      // Authentication
      user: null,
      setUser: (user: User | null) => set({ user }),
      
      // Theme
      theme: "light",
      setTheme: (theme: "light" | "dark") => set({ theme }),

      // Company Profile
      company: null,
      setCompany: (company: CompanyProfile | null) => set({ company }),

      // Emission Records
      records: [],
      
      // Load records from Firestore
      loadRecords: async () => {
        const { user } = get();
        if (!user) {
          set({ error: "User not authenticated" });
          return;
        }

        set({ isLoading: true, error: null });
        try {
          const records = await getUserEmissionRecords(user.uid);
          set({ records, isLoading: false, lastSyncTime: new Date().toISOString() });
        } catch (error: any) {
          console.error("Error loading records:", error);
          set({ 
            error: error.message || "Failed to load records",
            isLoading: false 
          });
        }
      },

      // Add record to Firestore
      addRecord: async (record: Omit<EmissionRecord, "id" | "timestamp">) => {
        const { user } = get();
        if (!user) {
          set({ error: "User not authenticated" });
          return;
        }

        set({ isLoading: true, error: null });
        try {
          const recordId = await addEmissionRecord(user.uid, record);
          const newRecord = { 
            ...record, 
            id: recordId, 
            timestamp: new Date().toISOString() 
          };
          set((state: AppStore) => ({
            records: [newRecord, ...state.records],
            isLoading: false,
            success: "Record added successfully",
            lastSyncTime: new Date().toISOString(),
          }));
        } catch (error: any) {
          console.error("Error adding record:", error);
          set({ 
            error: error.message || "Failed to add record",
            isLoading: false 
          });
        }
      },

      // Update record in Firestore
      updateRecord: async (id: string, updatedRecord: Partial<EmissionRecord>) => {
        const { user } = get();
        if (!user) {
          set({ error: "User not authenticated" });
          return;
        }

        set({ isLoading: true, error: null });
        try {
          await updateEmissionRecord(user.uid, id, updatedRecord);
          set((state: any) => ({
            records: state.records.map((r: EmissionRecord) => 
              r.id === id ? { ...r, ...updatedRecord } : r
            ),
            isLoading: false,
            success: "Record updated successfully",
            lastSyncTime: new Date().toISOString(),
          }));
        } catch (error: any) {
          console.error("Error updating record:", error);
          set({ 
            error: error.message || "Failed to update record",
            isLoading: false 
          });
        }
      },

      // Delete record from Firestore
      deleteRecord: async (id: string) => {
        const { user } = get();
        if (!user) {
          set({ error: "User not authenticated" });
          return;
        }

        set({ isLoading: true, error: null });
        try {
          await deleteEmissionRecord(user.uid, id);
          set((state: any) => ({
            records: state.records.filter((r: EmissionRecord) => r.id !== id),
            isLoading: false,
            success: "Record deleted successfully",
            lastSyncTime: new Date().toISOString(),
          }));
        } catch (error: any) {
          console.error("Error deleting record:", error);
          set({ 
            error: error.message || "Failed to delete record",
            isLoading: false 
          });
        }
      },

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
        // Don't persist records or user - will be loaded from Firebase
      }),
    }
  )
);

export default useAppStore;
