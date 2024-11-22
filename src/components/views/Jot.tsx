import { FormEventHandler, useCallback, useContext, useState } from "react";
import Button from "~com/library/Button";
import FirebaseContext from "../data/FirebaseContext";

export default function Jot() {
  const { addJot, authed } = useContext(FirebaseContext);
  const [prompt, setPrompt] = useState("");
  const [adding, setAdding] = useState(false);

  const handleAddPrompt: FormEventHandler<HTMLFormElement> = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        setAdding(true);
        await addJot(prompt);
        setPrompt("");
        alert("Jot jotted down!");
      } catch (error) {
        alert((error as Error).message);
      } finally {
        setAdding(false);
      }
    },
    [addJot, prompt]
  );

  return (
    <form onSubmit={handleAddPrompt} role="group">
      <input
        placeholder="What would make a good prompt to jam on later?"
        disabled={adding}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        aria-invalid={!prompt}
      />
      <Button disabled={!authed}>Jot</Button>
      <Button variant="secondary" to="/">
        Nevermind
      </Button>
    </form>
  );
}
