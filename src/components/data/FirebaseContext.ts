import { createContext } from "react";

export interface IJot {
  description: string;
  uid: string;
  jam: string;
  userUid: string;
}

export type IJotNew = Omit<IJot, "userUid">;

export interface IFirebaseContext {
  authed: boolean;
  addJot: (prompt: string) => Promise<void>;
  addJam: (promptUuid: string, jam: string) => Promise<void>;
  getRandomJot: () => Promise<IJot>;
  getJams: () => Promise<IJot[]>;
  removeJot: (jotUid: string) => Promise<void>;
}

const FirebaseContext = createContext<IFirebaseContext>({
  authed: false,
  addJot: async () => undefined,
  getRandomJot: async () => ({
    description: "Sample Prompt",
    uid: "notarealuuid",
    userUid: "notarealuseruid",
    jam: "",
  }),
  addJam: async () => undefined,
  getJams: async () => [],
  removeJot: async () => undefined,
});

export default FirebaseContext;
