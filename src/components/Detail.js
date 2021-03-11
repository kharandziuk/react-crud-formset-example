import useStyles from "../useStyles";
import { Form, Field } from "react-final-form";
import * as mui from "@material-ui/core";
import * as icons from "@material-ui/icons";
import _ from "lodash";
import { personSchema } from "../models";

const validate = (schema, values) => {
  const error = schema.validate(values, { abortEarly: false }).error;
  if (_.isUndefined(error)) {
    console.log("form valid");
    return;
  }
  const result = {};
  for (let err of error.details) {
    result[err.path] = err.message.replace(`"${err.path}"`, "");
  }
  console.log("form invalid", result);
  return result;
};

const fileChange = async (e, onChange) => {
  let file = e.target.files[0];
  if (!file) {
    return;
  }
  const reader = new FileReader();
  const data = await new Promise((resolve) => {
    reader.onload = (readerEvent) => resolve(readerEvent.target.result);
    reader.readAsBinaryString(file);
  });
  onChange(btoa(data));
};

const PersonForm = ({ initialValues, onSubmit }) => {
  const classes = useStyles();

  return (
    <Form
      onSubmit={onSubmit}
      validate={(v) => validate(personSchema, v)}
      initialValues={initialValues}
      render={({ handleSubmit, submitting, pristine }) => (
        <form className={classes.root} onSubmit={handleSubmit}>
          <div>
            <Field name="photo">
              {({ input, meta }) => {
                return (
                  <mui.Button variant="contained" component="label">
                    <img
                      src={`data:image/jpeg;base64,${input.value}`}
                      alt="Avatar"
                    />
                    <input
                      type="file"
                      onChange={(e) => {
                        fileChange(e, input.onChange);
                      }}
                      hidden
                    />
                    <input {...input} readOnly hidden />
                    <button onClick={() => input.onChange("")}>
                      remove photo
                    </button>
                  </mui.Button>
                );
              }}
            </Field>
          </div>
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
            <Field name="birthYear">
              {({ input, meta }) => (
                <mui.TextField
                  {...input}
                  label="Birth Year"
                  variant="filled"
                  error={_.isString(meta.error)}
                  helperText={meta.error}
                />
              )}
            </Field>
            <Field name="phone">
              {({ input, meta }) => (
                <mui.TextField
                  {...input}
                  label="phone"
                  variant="filled"
                  error={_.isString(meta.error)}
                  helperText={meta.error}
                />
              )}
            </Field>
            <Field name="email">
              {({ input, meta }) => (
                <mui.TextField
                  {...input}
                  label="Email"
                  variant="filled"
                  error={_.isString(meta.error)}
                  helperText={meta.error}
                />
              )}
            </Field>
            <mui.Box>
              <mui.Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={submitting || pristine}
                startIcon={<icons.Save />}
              >
                Submit
              </mui.Button>
            </mui.Box>
          </div>
        </form>
      )}
    />
  );
};

export default function Detail({ data, actions }) {
  return (
    <mui.Grid item xs={12} md={9}>
      <PersonForm initialValues={data.person} onSubmit={actions.changeItem} />
    </mui.Grid>
  );
}
