import { faPlug } from "@fortawesome/free-solid-svg-icons";
import { signIn } from "~/api/firebase";
import Button from "~com/library/Button";

export default function PublicNav() {
  return (
    <div role="group">
      <Button icon={faPlug} onClick={signIn}>
        Connect
      </Button>
    </div>
  );
}
