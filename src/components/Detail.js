import useStyles from "../useStyles";
import { useStoreState, useStoreActions } from "easy-peasy";
import { Form, Field } from "react-final-form";
import * as mui from "@material-ui/core";

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
export default function Detail() {
  const classes = useStyles();

  const person = useStoreState((store) => store.people.selectedItem);

  return (
    <mui.Grid item xs={12} md={9}>
      <MyForm />
    </mui.Grid>
  );
}
