import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const initialValues = {
  name: "",
  email: "",
  channel: ""
};

const onSubmit = (values) => {
  console.log("form data", values);
};

// yup validation schema object
const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email format").required("Required"),
  channel: Yup.string().required("Required")
});

const YoutubeForm = () => {
  // console.log("Form values", formik.values);
  // console.log("form errors", formik.errors);
  // console.log("Visited fields", formik.touched);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <div className="form-control">
          <label htmlFor="name">Name</label>
          <Field type="text" id="name" name="name" className="input-field" />
          {/* render error if name is empty */}
          <ErrorMessage name="name" className="error" />
        </div>

        <div className="form-control">
          <label htmlFor="email">email</label>
          <Field type="email" id="email" name="email" className="input-field" />
          {/* render errors if email is empty or invalid */}
          <ErrorMessage name="email" className="error" />
        </div>
        <div className="form-control">
          <label htmlFor="channel">Channel</label>
          <Field
            type="text"
            id="channel"
            name="channel"
            className="input-field"
          />
          {/* render errors if email is empty or invalid */}
          <ErrorMessage name="channel" className="error" />
        </div>
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default YoutubeForm;
