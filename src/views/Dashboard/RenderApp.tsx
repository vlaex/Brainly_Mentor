import ReactDOM from "react-dom";
import Dashboard from "./Dashboard";

export default function RenderApp() {
  ReactDOM.render(
    <Dashboard />,
    document.querySelector(".overlay")
  );
}