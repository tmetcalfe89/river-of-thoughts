import { FormEventHandler, useCallback, useContext, useState } from "react";
import Button from "~com/library/Button";
import FirebaseContext from "../data/FirebaseContext";

export default function Jot() {
  const { addJot: addPrompt } = useContext(FirebaseContext);
  const [prompt, setPrompt] = useState("");
  const [adding, setAdding] = useState(false);

  const handleAddPrompt: FormEventHandler<HTMLFormElement> = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        setAdding(true);
        await addPrompt(prompt);
        setPrompt("");
      } catch (error) {
        alert((error as Error).message);
      } finally {
        setAdding(false);
      }
    },
    [addPrompt, prompt]
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
      <button>Jot</button>
      <Button variant="secondary" to="/">
        Nevermind
      </Button>
    </form>
  );
}
