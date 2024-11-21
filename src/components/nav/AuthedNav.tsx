import {
  faBookOpenReader,
  faLightbulb,
  faPenNib,
  faLeaf,
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
      <Button icon={faLeaf} variant="secondary" onClick={logout} to="/">
        Disconnect
      </Button>
    </div>
  );
}
