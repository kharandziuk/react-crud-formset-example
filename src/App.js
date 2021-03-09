import "./App.css";
import {
  useParams,
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  useLocation,
} from "react-router-dom";
import { useStoreState, useStoreActions } from "easy-peasy";
import Main from "./pages/Main.js";

export default function App() {
  return (
    <Router>
      <Main />
    </Router>
  );
}
