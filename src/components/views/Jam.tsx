import {
  FormEventHandler,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import FirebaseContext, { IPrompt } from "../data/FirebaseContext";
import Button from "../library/Button";
import { useNavigate } from "react-router-dom";

export default function Jam() {
  const navigate = useNavigate();
  const { getRandomJot: fetchRandomPrompt, addJam: submitJam } =
    useContext(FirebaseContext);
  const [prompt, setPrompt] = useState<IPrompt | null>(null);
  const [fetching, setFetching] = useState<boolean>(false);
  const [jam, setJam] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const characterCount = useMemo(() => jam.length, [jam]);
  const wordCount = useMemo(() => jam.match(/\w+/g)?.length || 0, [jam]);

  const handleFetchPrompt = useCallback(async () => {
    try {
      setFetching(true);
      setPrompt(await fetchRandomPrompt());
    } catch (error) {
      alert((error as Error).message);
    } finally {
      setFetching(false);
    }
  }, [fetchRandomPrompt]);

  const handleSubmitJam: FormEventHandler<HTMLFormElement> = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        if (!prompt) throw new Error("");
        setSubmitting(true);
        await submitJam(prompt.uid, jam);
        alert("Jam sesh complete!");
        navigate("/see");
      } catch (error) {
        alert((error as Error).message);
      } finally {
        setSubmitting(false);
      }
    },
    [jam, navigate, prompt, submitJam]
  );

  return (
    <>
      {prompt ? (
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
          }}
          onSubmit={handleSubmitJam}
        >
          <hgroup>
            <h2>{prompt.description}</h2>
            <p>
              {characterCount} characters | {wordCount} words
            </p>
          </hgroup>
          <textarea
            disabled={submitting}
            style={{ flexGrow: 1, resize: "none" }}
            value={jam}
            onChange={(e) => setJam(e.target.value)}
          />
          <Button disabled={submitting}>Complete Jam</Button>
        </form>
      ) : (
        <Button onClick={handleFetchPrompt} disabled={fetching}>
          Prompt Me
        </Button>
      )}
    </>
  );
}
