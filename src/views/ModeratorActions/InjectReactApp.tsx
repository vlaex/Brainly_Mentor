import ReactDOM from "react-dom";
import App from "./App";

export async function InjectReactApp() {
  ReactDOM.render(
    <App />,
    document.getElementById("app")
  );
}