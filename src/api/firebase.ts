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
// import {
//   addDoc,
//   collection,
//   deleteDoc,
//   doc,
//   getDocs,
//   getFirestore,
//   query,
//   where,
// } from "firebase/firestore";

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

// let cached: Desire[] | null = null;

// const getRandomDesire = async (): Promise<Desire> => {
//   if (cached != null) {
//     return cached[Math.floor(Math.random() * cached.length)];
//   }
//   const auth = getAuth();
//   const uid = auth.currentUser?.uid;
//   if (!uid) throw new Error("Connect to the World to connect to your Desires.");
//   const db = getFirestore();
//   const docs = await getDocs(
//     query(collection(db, "simple-desire"), where("uid", "==", uid))
//   );
//   if (docs.size === 0) {
//     throw new Error("To remember, you must first memorize.");
//   }
//   cached = [];
//   docs.forEach((doc) =>
//     cached!.push({ ...(doc.data() as Desire), desireUid: doc.id })
//   );
//   return cached[Math.floor(Math.random() * cached.length)];
// };

// const addDesire = async (description: string) => {
//   if (!description) throw new Error("A desire must have essence.");
//   const auth = getAuth();
//   const uid = auth.currentUser?.uid;
//   if (!uid) throw new Error("Connect to the world to connect to your desires.");
//   const db = getFirestore();
//   const desire: Desire = {
//     uid,
//     description,
//   };
//   const created = await addDoc(collection(db, "simple-desire"), desire);
//   cached = null;
//   return created;
// };

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
  // getRandomDesire,
  // addDesire,
  // removeDesire,
  signIn,
  onAuthChange,
  logout,
};
