import { User } from "@prisma/client";
import { create } from "zustand";
import { getUser, updateUser } from "./api";
import { message } from "./notify";

interface UserStore {
  user?: User;
  setUser: (id: string) => void;
  updateUser: (updateBody: Partial<User>) => void;
  reset: () => void;
}

export const useUserStore = create<UserStore>((set, get) => ({
  setUser: async (id) => {
    const user = await getUser(id);
    set({ user });
  },
  updateUser: async (update: Partial<User>) => {
    const userId = get()?.user?.id;
    if (!userId) return;
    const updatedUser = await updateUser(userId, update);
    if (updatedUser) {
      set({ user: updatedUser });
    } else {
      message.error("Failed to update.");
    }
  },
  reset: () => {
    set({ user: undefined });
  },
}));
