import { Outlet } from "react-router-dom";
import Page from "~com/page/Page";
import PublicNav from "~com/nav/PublicNav";
import AuthedNav from "~com/nav/AuthedNav";
import { useContext } from "react";
import FirebaseContext from "../data/FirebaseContext";

export default function Main() {
  const { authed } = useContext(FirebaseContext);

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
      <Outlet />
    </Page>
  );
}
