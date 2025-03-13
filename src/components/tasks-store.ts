import { task } from "@/lib/types";
import { create } from "zustand";
import { persist, PersistStorage } from "zustand/middleware";

interface TasksState {
  tasks: task[] | null;
  isInitialised: boolean;
  setTasks: (tasks: task[]) => void;
  setIsInitialised: (isInitialised: boolean) => void;
}

const localStorageProvider: PersistStorage<TasksState> = {
  getItem: (name) => {
    if (typeof window === "undefined") return null;
    const storedValue = localStorage.getItem(name);
    return storedValue ? JSON.parse(storedValue) : null;
  },
  setItem: (name, value) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(name, JSON.stringify(value));
    }
  },
  removeItem: (name) => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(name);
    }
  },
};

const useTaskStore = create<TasksState>()(
  persist(
    (set) => ({
      tasks: null,
      isInitialised: false,
      setTasks: (tasks: task[]) => set({ tasks }),
      setIsInitialised: (isInitialised: boolean) => set({ isInitialised }),
    }),
    {
      name: "tasks-storage",
      storage: localStorageProvider,
    }
  )
);

export default useTaskStore;
