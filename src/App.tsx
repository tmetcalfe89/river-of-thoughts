import { useEffect, useState } from "react";
import { onAuthChange } from "./api/firebase";
import Page from "~com/page/Page";
import AuthedNav from "~com/nav/AuthedNav";
import PublicNav from "~com/nav/PublicNav";

function App() {
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    onAuthChange((user) => {
      const newAuthed = !!user;
      setAuthed(newAuthed);
    });
  }, []);

  return (
    <Page name="River of Thoughts">
      <p>
        Your sporadic thoughts may be fleeting, but they don't have to be
        ephemeral.
      </p>
      <p>
        If you have a good idea for a writing prompt, jot it down for later.
      </p>
      <p>
        If you have the time to sit down and jam to one of the prompts you've
        accumulated, hit the button and jam!
      </p>
      {authed ? <AuthedNav /> : <PublicNav />}
    </Page>
  );
}

export default App;
