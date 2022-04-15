import ReactDOM from "react-dom/client";
import Dashboard from "./Dashboard";

export default function RenderApp() {
  const overlay = document.querySelector(".overlay");

  ReactDOM.createRoot(overlay)
    .render(<Dashboard />);
}