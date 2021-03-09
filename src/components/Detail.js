import useStyles from "../useStyles";
import { useStoreState, useStoreActions } from "easy-peasy";
import { Form, Field } from "react-final-form";
import * as mui from "@material-ui/core";
import _ from "lodash";
import Joi from "joi";
import getPhoto from "../getPhoto";

const schema = Joi.object({
  firstName: Joi.string().alphanum().min(3).max(30).required(),
  lastName: Joi.string().alphanum().min(3).max(30).required(),
  photo: Joi.string(),
});

const validate = (values) => {
  const error = schema.validate(values, { abortEarly: false }).error;
  if (_.isUndefined(error)) {
    return;
  }
  const result = {};
  for (let err of error.details) {
    result[err.path] = err.message.replace(`"${err.path}"`, "");
  }
  return result;
};

const fileChange = (onChange) => {
  return async (e) => {
    let file = e.target.files[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    const data = await new Promise((resolve) => {
      reader.onload = (e) => resolve(e.target.result);
      reader.readAsBinaryString(file);
    });
    onChange(btoa(data));
  };
};

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
            <Field name="photo">
              {({ input, meta }) => {
                return (
                  <mui.Button variant="contained" component="label">
                    <img src={`data:image/jpeg;base64,${input.value}`} />
                    <input
                      type="file"
                      hidden
                      onChange={fileChange(input.onChange)}
                    />
                  </mui.Button>
                );
              }}
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
