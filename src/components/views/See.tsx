import { useContext, useEffect, useState } from "react";
import Accordion from "../library/Accordion";
import FirebaseContext, { IJot } from "../data/FirebaseContext";

export default function See() {
  const { getJams, authed } = useContext(FirebaseContext);
  const [jams, setJams] = useState<IJot[] | null>(null);

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

  if (!authed) {
    return <>⏱</>;
  }

  return (
    <div style={{ width: "100%", overflowX: "hidden" }}>
      {jams?.map(({ description, jam }) => (
        <Accordion title={description}>{jam}</Accordion>
      ))}
    </div>
  );
}
