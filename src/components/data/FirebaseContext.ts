import { createContext } from "react";

export interface IPrompt {
  description: string;
  uuid: string;
}

export interface IFirebaseContext {
  authed: boolean;
  addPrompt: (prompt: string) => Promise<void>;
  submitJam: (promptUuid: string, jam: string) => Promise<void>;
  fetchRandomPrompt: () => Promise<IPrompt>;
}

const FirebaseContext = createContext<IFirebaseContext>({
  authed: false,
  addPrompt: async () => undefined,
  fetchRandomPrompt: async () => ({
    description: "Sample Prompt",
    uuid: "notarealuuid",
  }),
  submitJam: async () => undefined,
});

export default FirebaseContext;
