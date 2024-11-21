import {
  faBookOpenReader,
  faLightbulb,
  faPenNib,
  faPlug,
} from "@fortawesome/free-solid-svg-icons";
import { logout } from "~/api/firebase";
import Button from "~com/library/Button";

export default function AuthedNav() {
  return (
    <div role="group">
      <Button icon={faLightbulb} to="/jot">
        Jot down a prompt
      </Button>
      <Button icon={faPenNib} to="/jam">
        Jam on a prompt
      </Button>
      <Button icon={faBookOpenReader} to="/see">
        See your prompts
      </Button>
      <Button
        icon={faPlug}
        variant="secondary"
        onClick={logout}
        iconProps={{ flip: "vertical" }}
        to="/"
      >
        Disconnect
      </Button>
    </div>
  );
}
