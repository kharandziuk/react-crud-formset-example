import useStyles from "../useStyles";
import { useStoreState, useStoreActions } from "easy-peasy";
import { Form, Field } from "react-final-form";
import * as mui from "@material-ui/core";
import _ from "lodash";

const onSubmit = (values) => {
  console.log(JSON.stringify(values, 0, 2));
};

const validate = (values) => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = "Required";
  }
  if (!values.lastName) {
    errors.lastName = "Required";
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

const PersonForm = ({ initialValues, onSubmit }) => {
  const classes = useStyles();

  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      initialValues={initialValues}
      render={({ handleSubmit }) => (
        <form className={classes.root} onChange={handleSubmit}>
          <div>
            <Field name="firstName">
              {({ input, meta }) => (
                <mui.TextField
                  {...input}
                  label="First Name"
                  variant="filled"
                  error={_.isString(meta.error)}
                  helperText={meta.error}
                />
              )}
            </Field>
            <Field name="lastName">
              {({ input, meta }) => (
                <mui.TextField
                  {...input}
                  label="Last Name"
                  variant="filled"
                  error={_.isString(meta.error)}
                  helperText={meta.error}
                />
              )}
            </Field>
          </div>
        </form>
      )}
    />
  );
};

export default function Detail() {
  const person = useStoreState((store) => store.people.selectedItem);
  const changeItem = useStoreActions((store) => store.people.changeItem);

  return (
    <mui.Grid item xs={12} md={9}>
      <PersonForm initialValues={person} onSubmit={changeItem} />
    </mui.Grid>
  );
}
