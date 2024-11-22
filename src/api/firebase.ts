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
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { IJot as IJot, IJotNew } from "~/components/data/FirebaseContext";

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

const getJots = async () => {
  if (cachedJots !== null) {
    return cachedJots;
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
  const fetchedJots: IJot[] = [];
  docs.forEach((doc) =>
    fetchedJots!.push({ ...(doc.data() as IJot), uid: doc.id })
  );
  return fetchedJots;
};

const getRandomJot = async (): Promise<IJot> => {
  cachedJots = await getJots();
  const unfinishedJots = cachedJots.filter((jot) => !jot.jam);
  if (unfinishedJots.length === 0)
    throw new Error("You don't have any un-Jam'd Jots.");
  return unfinishedJots[Math.floor(Math.random() * unfinishedJots.length)];
};

const getJams = async (): Promise<IJot[]> => {
  cachedJots = await getJots();
  const finishedJots = cachedJots.filter((jot) => jot.jam);
  if (finishedJots.length === 0)
    throw new Error("You don't have any Jam'd Jots.");
  return finishedJots;
};

const addJot = async (description: string) => {
  if (!description) throw new Error("A Jot must have essence.");
  const auth = getAuth();
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error("Connect to the world to connect to your Jots.");
  const db = getFirestore();
  const jot: IJotNew = {
    uid,
    description,
    jam: "",
  };
  await addDoc(collection(db, "jots"), jot);
  cachedJots = null;
};

const addJam = async (jotUid: string, jam: string) => {
  if (!jotUid) throw new Error("A Jam must have a Jot.");
  if (!jam) throw new Error("A Jam must have essence.");

  const auth = getAuth();
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error("Connect to the world to connect to your Jams.");
  const db = getFirestore();
  await updateDoc(doc(db, "jots", jotUid), { jam });
  cachedJots = null;
};

const removeJot = async (jotUid: string) => {
  if (!jotUid) throw new Error("Which Jot though?");

  const auth = getAuth();
  const uid = auth.currentUser?.uid;
  if (!uid)
    throw new Error("Connect to the world to connect to your Jots & Jams.");
  const db = getFirestore();
  await deleteDoc(doc(db, "jots", jotUid));
  cachedJots = null;
};

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
  addJam,
  signIn,
  onAuthChange,
  logout,
  getJams,
  removeJot,
};
