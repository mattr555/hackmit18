import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Form } from "semantic-ui-react";
import { InputField } from "react-semantic-redux-form";
import { editFormName } from "./consts";

const EditDetailsForm = ({ handleSubmit }) => {
  return (
    <Form onSubmit={handleSubmit}>
      <h3>Basic Details</h3>
      <Form.Group widths="equal">
        <Field name="firstName" label="First name" component={InputField} />
        <Field name="lastName" label="Last name" component={InputField} />
      </Form.Group>
      <Form.Group widths="equal">
        <Field name="phone" label="Phone Number" component={InputField} />
        <Field name="email" label="Email" component={InputField} />
      </Form.Group>
      <Field name="address" label="Address" component={InputField} />
    </Form>
  );
};

export default reduxForm({ form: editFormName })(EditDetailsForm);
