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
import useStyles from "./useStyles";
import { Form, Field } from "react-final-form";

const onSubmit = (values) => {
  window.alert(JSON.stringify(values, 0, 2));
};

const validate = (values) => {
  const errors = {};
  if (!values.username) {
    errors.username = "Required";
  }
  if (!values.password) {
    errors.password = "Required";
  }
  if (!values.confirm) {
    errors.confirm = "Required";
  } else if (values.confirm !== values.password) {
    errors.confirm = "Must match";
  }
  return errors;
};

const MyForm = () => (
  <Form
    onSubmit={onSubmit}
    validate={validate}
    render={({ handleSubmit }) => (
      <form onSubmit={handleSubmit}>
        <h2>Simple Default Input</h2>
        <div>
          <label>First Name</label>
          <Field name="firstName" component="input" placeholder="First Name" />
        </div>

        <h2>An Arbitrary Reusable Input Component</h2>
        <div>
          <label>Interests</label>
          <Field name="interests" component="input" />
        </div>

        <h2>Render Function</h2>
        <Field
          name="bio"
          render={({ input, meta }) => (
            <div>
              <label>Bio</label>
              <textarea {...input} />
              {meta.touched && meta.error && <span>{meta.error}</span>}
            </div>
          )}
        />

        <h2>Render Function as Children</h2>
        <Field name="phone">
          {({ input, meta }) => (
            <div>
              <label>Phone</label>
              <input type="text" {...input} placeholder="Phone" />
              {meta.touched && meta.error && <span>{meta.error}</span>}
            </div>
          )}
        </Field>

        <button type="submit">Submit</button>
      </form>
    )}
  />
);

function List() {
  const people = useStoreState((store) => store.people.items);
  const selected = useStoreState((store) => store.people.selected);
  const setActive = useStoreActions((store) => store.people.setActive);
  const deleteItem = useStoreActions((store) => store.people.deleteItem);
  const classes = useStyles();

  return (
    <mui.Grid item xs={12} md={3}>
      <mui.Typography variant="h6" className={classes.title}>
        People
      </mui.Typography>
      <div className={classes.demo}>
        <mui.List dense>
          {people.map((x, i) => (
            <mui.ListItem
              button
              selected={i === selected}
              key={i}
              onClick={() => setActive(i)}
            >
              <mui.ListItemAvatar>
                <mui.Avatar>
                  <icons.Face />
                </mui.Avatar>
              </mui.ListItemAvatar>
              <mui.ListItemText primary={`${x.firstName} ${x.lastName}`} />
              <mui.ListItemSecondaryAction>
                <mui.IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => deleteItem(i)}
                >
                  <icons.Delete />
                </mui.IconButton>
              </mui.ListItemSecondaryAction>
            </mui.ListItem>
          ))}
        </mui.List>
      </div>
    </mui.Grid>
  );
}

//<form className={classes.root} noValidate autoComplete="off">
//  <div>
//    <mui.TextField
//      required
//      id="filled-required"
//      label="First Name"
//      value={person.firstName}
//      variant="filled"
//    />
//    <mui.TextField
//      required
//      id="filled-required"
//      label="Last Name"
//      value={person.lastName}
//      variant="filled"
//    />
//  </div>
//</form>
function Detail() {
  const classes = useStyles();

  const person = useStoreState((store) => store.people.selectedItem);

  return (
    <mui.Grid item xs={12} md={9}>
      <MyForm />
    </mui.Grid>
  );
}

function Layout() {
  return (
    <mui.Container>
      <mui.Grid container spacing={3}>
        <List />
        <Detail />
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
