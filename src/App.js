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
import * as icons from "@material-ui/icons";
import * as mui from "@material-ui/core";
import { useStoreState, useStoreActions } from "easy-peasy";
import AddBook from "./pages/Add";
import useStyles from "./useStyles";

function List() {
  const classes = useStyles();
  return (
    <mui.Grid item xs={12} md={3}>
      <mui.Typography variant="h6" className={classes.title}>
        People
      </mui.Typography>
      <div className={classes.demo}>
        <mui.List dense>
          <mui.ListItem>
            <mui.ListItemAvatar>
              <mui.Avatar>
                <icons.Face />
              </mui.Avatar>
            </mui.ListItemAvatar>
            <mui.ListItemText primary="John Doe" />
            <mui.ListItemSecondaryAction>
              <mui.IconButton edge="end" aria-label="delete">
                <icons.Delete />
              </mui.IconButton>
            </mui.ListItemSecondaryAction>
          </mui.ListItem>
        </mui.List>
      </div>
    </mui.Grid>
  );
}

function Layout() {
  return (
    <mui.Container>
      <mui.Grid container spacing={3}>
        <List />
      </mui.Grid>
    </mui.Container>
  );
}

export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}
