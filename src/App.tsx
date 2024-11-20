import { faBookOpenReader, faLeaf, faLightbulb, faPenNib } from "@fortawesome/free-solid-svg-icons";

import Button from "./components/Button";
import Page from "./components/page/Page";

function App() {
  return (
    <Page name="River of Thoughts">
      <p>
        Your sporadic thoughts may be fleeting, but they don't have to be
        ephemeral. If you have a good idea for a writing prompt, jot it down for
        later. If you have the time to sit down and jam to one of the prompts
        you've accumulated, hit the button and jam!
      </p>
      <div role="group">
        <Button icon={faLightbulb}>Jot down a prompt</Button>
        <Button icon={faPenNib}>Jam on a prompt</Button>
        <Button icon={faBookOpenReader}>See your prompts</Button>
        <Button icon={faLeaf}>Disconnect</Button>
      </div>
    </Page>
  );
}

export default App;
