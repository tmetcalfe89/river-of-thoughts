import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  NextOrObserver,
  onAuthStateChanged,
  signInWithPopup,
  User,
  signOut,
} from "firebase/auth";
import {
  addDoc,
  collection,
  // deleteDoc,
  // doc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { IPrompt as IJot } from "~/components/data/FirebaseContext";

const firebaseConfig = {
  apiKey: "AIzaSyBqyveVscQ5_uvchr191oWYa_AOOYmGRvc",
  authDomain: "river-of-thoughts.firebaseapp.com",
  projectId: "river-of-thoughts",
  storageBucket: "river-of-thoughts.firebasestorage.app",
  messagingSenderId: "1082755685892",
  appId: "1:1082755685892:web:d230763e8d40a531649f51",
};

const provider = new GoogleAuthProvider();
initializeApp(firebaseConfig);

const signIn = async () => {
  const auth = getAuth();
  const result = await signInWithPopup(auth, provider);
  const credential = GoogleAuthProvider.credentialFromResult(result);
  if (!credential) throw new Error("Error retrieving credential");
  const token = credential?.accessToken;
  const user = result.user;
  return { token, user };
};

let cachedJots: IJot[] | null = null;

const getRandomJot = async (): Promise<IJot> => {
  if (cachedJots != null) {
    return cachedJots[Math.floor(Math.random() * cachedJots.length)];
  }
  const auth = getAuth();
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error("Connect to the World to connect to your Jots.");
  const db = getFirestore();
  const docs = await getDocs(
    query(collection(db, "jots"), where("uid", "==", uid))
  );
  if (docs.size === 0) {
    throw new Error("You haven't jotted down any Jots.");
  }
  cachedJots = [];
  docs.forEach((doc) =>
    cachedJots!.push({ ...(doc.data() as IJot), uid: doc.id })
  );
  return cachedJots[Math.floor(Math.random() * cachedJots.length)];
};

const addJot = async (description: string) => {
  if (!description) throw new Error("A Jot must have essence.");
  const auth = getAuth();
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error("Connect to the world to connect to your Jots.");
  const db = getFirestore();
  const jot: IJot = {
    uid,
    description,
  };
  await addDoc(collection(db, "jots"), jot);
  cachedJots = null;
};

// const removeDesire = async (desireUid: string) => {
//   const db = getFirestore();
//   await deleteDoc(doc(db, "simple-desire", desireUid));
//   cached = null;
// };

const onAuthChange = (callback: NextOrObserver<User>) => {
  const auth = getAuth();
  onAuthStateChanged(auth, callback);
};

const logout = () => {
  const auth = getAuth();
  signOut(auth);
};

export {
  getRandomJot,
  addJot,
  // removeDesire,
  signIn,
  onAuthChange,
  logout,
};
