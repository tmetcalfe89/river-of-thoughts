import {
  addJam,
  addJot,
  getJams,
  getRandomJot,
  onAuthChange,
  removeJot,
} from "~/api/firebase";
import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Jam from "./components/views/Jam";
import Jot from "./components/views/Jot";
import See from "./components/views/See";
import Main from "./components/views/Main";
import FirebaseContext from "./components/data/FirebaseContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "jam",
        element: <Jam />,
      },
      {
        path: "jot",
        element: <Jot />,
      },
      {
        path: "see",
        element: <See />,
      },
    ],
  },
]);

function App() {
  const [authed, setAuthed] = useState<boolean>(false);

  useEffect(() => {
    onAuthChange((user) => {
      const newAuthed = !!user;
      setAuthed(newAuthed);
    });
  }, []);

  return (
    <FirebaseContext.Provider
      value={{
        authed,
        addJot,
        getRandomJot,
        addJam,
        getJams,
        removeJot,
      }}
    >
      <RouterProvider router={router} />
    </FirebaseContext.Provider>
  );
}

export default App;
