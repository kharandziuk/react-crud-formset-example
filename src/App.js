import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Main from "./pages/Main.js";

export default function App() {
  return (
    <Router>
      <Main />
    </Router>
  );
}
