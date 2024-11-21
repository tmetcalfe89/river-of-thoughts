import { createContext } from "react";

export interface IFirebaseContext {
  authed: boolean;
}

const FirebaseContext = createContext<IFirebaseContext>({ authed: false });

export default FirebaseContext;
