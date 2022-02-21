import ReactDOM from "react-dom";
import App from "./components/App";

import "./styles/basics.css";

export async function InjectReactApp() {
  ReactDOM.render(
    <App />,
    document.getElementById("app")
  );
}