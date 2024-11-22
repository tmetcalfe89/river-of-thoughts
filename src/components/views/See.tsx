import { useCallback, useContext, useEffect, useState } from "react";
import Accordion from "../library/Accordion";
import FirebaseContext, { IJot } from "../data/FirebaseContext";
import Button from "../library/Button";

export default function See() {
  const { getJams, authed, removeJot } = useContext(FirebaseContext);
  const [jams, setJams] = useState<IJot[] | null>(null);
  const [removing, setRemoving] = useState<boolean>(false);

  useEffect(() => {
    if (!authed) return;
    async function fetchJams() {
      try {
        setJams(await getJams());
      } catch (error) {
        setJams(null);
        alert((error as Error).message);
      }
    }
    fetchJams();
  }, [authed, getJams]);

  const handleRemove = useCallback(
    (jotUid: string) => {
      return async () => {
        try {
          setRemoving(true);
          await removeJot(jotUid);
          setJams(
            (prevJams) => prevJams?.filter((jam) => jam.uid != jotUid) || null
          );
        } catch (error) {
          alert((error as Error).message);
        } finally {
          setRemoving(false);
        }
      };
    },
    [removeJot]
  );

  if (!authed) {
    return <>⏱</>;
  }

  return (
    <div style={{ width: "100%", overflowX: "hidden" }}>
      {jams?.map(({ description, jam, uid }) => (
        <Accordion title={description}>
          <pre>{jam}</pre>
          <Button
            variant="secondary"
            onClick={handleRemove(uid)}
            disabled={removing}
          >
            Let it go
          </Button>
        </Accordion>
      ))}
    </div>
  );
}
