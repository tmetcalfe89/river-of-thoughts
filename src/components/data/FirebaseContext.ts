import { createContext } from "react";

export interface IPrompt {
  description: string;
  uid: string;
}

export interface IFirebaseContext {
  authed: boolean;
  addJot: (prompt: string) => Promise<void>;
  submitJam: (promptUuid: string, jam: string) => Promise<void>;
  getRandomJot: () => Promise<IPrompt>;
}

const FirebaseContext = createContext<IFirebaseContext>({
  authed: false,
  addJot: async () => undefined,
  getRandomJot: async () => ({
    description: "Sample Prompt",
    uid: "notarealuuid",
  }),
  submitJam: async () => undefined,
});

export default FirebaseContext;
