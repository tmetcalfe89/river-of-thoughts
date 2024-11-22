import { createContext } from "react";

export interface IJot {
  description: string;
  uid: string;
  jam: string;
}

export interface IFirebaseContext {
  authed: boolean;
  addJot: (prompt: string) => Promise<void>;
  addJam: (promptUuid: string, jam: string) => Promise<void>;
  getRandomJot: () => Promise<IJot>;
  getJams: () => Promise<IJot[]>;
}

const FirebaseContext = createContext<IFirebaseContext>({
  authed: false,
  addJot: async () => undefined,
  getRandomJot: async () => ({
    description: "Sample Prompt",
    uid: "notarealuuid",
    jam: "",
  }),
  addJam: async () => undefined,
  getJams: async () => [],
});

export default FirebaseContext;
