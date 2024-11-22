import {
  FormEventHandler,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import FirebaseContext, { IJot } from "../data/FirebaseContext";
import Button from "../library/Button";
import { useNavigate } from "react-router-dom";

export default function Jam() {
  const navigate = useNavigate();
  const { getRandomJot, addJam, authed, removeJot } =
    useContext(FirebaseContext);
  const [jot, setJot] = useState<IJot | null>(null);
  const [fetching, setFetching] = useState<boolean>(false);
  const [jam, setJam] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [removing, setRemoving] = useState(false);

  const characterCount = useMemo(() => jam.length, [jam]);
  const wordCount = useMemo(() => jam.match(/\w+/g)?.length || 0, [jam]);

  const handleFetchPrompt = useCallback(async () => {
    try {
      setFetching(true);
      setJot(await getRandomJot());
    } catch (error) {
      alert((error as Error).message);
    } finally {
      setFetching(false);
    }
  }, [getRandomJot]);

  const handleSubmitJam: FormEventHandler<HTMLFormElement> = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        if (!jot) throw new Error("");
        setSubmitting(true);
        await addJam(jot.uid, jam);
        alert("Jam sesh complete!");
        navigate("/see");
      } catch (error) {
        alert((error as Error).message);
      } finally {
        setSubmitting(false);
      }
    },
    [jam, navigate, jot, addJam]
  );

  const handleRemoveJot = useCallback(async () => {
    try {
      if (!jot)
        throw new Error(
          "How did you get here? Can't remove a Jot if you don't have a Jot selected."
        );
      setRemoving(true);
      await removeJot(jot.uid);
    } catch (error) {
      alert((error as Error).message);
    } finally {
      setRemoving(false);
    }
  }, [jot, removeJot]);

  if (!jot) {
    return (
      <Button onClick={handleFetchPrompt} disabled={fetching || !authed}>
        Prompt Me
      </Button>
    );
  }

  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
      }}
      onSubmit={handleSubmitJam}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <hgroup>
          <h2>{jot.description}</h2>
          <p>
            {characterCount} characters | {wordCount} words
          </p>
        </hgroup>
        <Button
          variant="secondary"
          type="button"
          onClick={handleRemoveJot}
          disabled={removing || submitting}
        >
          Let it go
        </Button>
      </div>
      <textarea
        disabled={removing || submitting}
        style={{ flexGrow: 1, resize: "none" }}
        value={jam}
        onChange={(e) => setJam(e.target.value)}
      />
      <Button disabled={removing || submitting}>Complete Jam</Button>
    </form>
  );
}
