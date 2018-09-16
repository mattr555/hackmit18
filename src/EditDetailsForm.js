import React, { Component } from "react";
import { Field, FieldArray, reduxForm } from "redux-form";
import { Form, Button, Icon } from "semantic-ui-react";
import { InputField, TextAreaField } from "react-semantic-redux-form";
import DatePicker from "react-datepicker";
import { WithContext as ReactTags } from "react-tag-input";
import moment from "moment";
import { editFormName } from "./consts";

const DateField = ({ label, input: { value, onChange } }) => {
  console.log(value);
  const time = value || 1537070829329;
  return (
    <Form.Field
      label={label}
      control={DatePicker}
      selected={moment(time)}
      onChange={d => {
        onChange(d.unix() * 1000);
      }}
    />
  );
};

const renderEducation = ({ fields }) => {
  return (
    <div>
      <h3>Education</h3>
      <Button icon onClick={() => fields.push({})}>
        <Icon name="plus" />
        Add Education
      </Button>
      {fields.map((member, index) => (
        <div key={index}>
          <Form.Group>
            <Field
              name={`${member}.school`}
              label="Institution"
              component={InputField}
            />
            <Field
              name={`${member}.degree`}
              label="Degree"
              component={InputField}
            />
            <Field
              name={`${member}.major`}
              label="Major"
              component={InputField}
            />
            <Field
              name={`${member}.year`}
              label="Graduation Year"
              component={InputField}
            />
          </Form.Group>
          <Form.Group>
            <Field
              name={`${member}.majorGPA`}
              label="Major GPA"
              type="number"
              component={InputField}
            />
            <Field
              name={`${member}.totalGPA`}
              label="Total GPA"
              type="number"
              component={InputField}
            />
          </Form.Group>
          <Field
            name={`${member}.description`}
            label="Description"
            component={TextAreaField}
            placeholder="Use * for bulletpoints"
          />
          <Button icon onClick={() => fields.remove(index)}>
            <Icon name="trash" />
            Delete Education
          </Button>
        </div>
      ))}
    </div>
  );
};

const renderExperience = ({ fields }) => (
  <div>
    <h3>Experience</h3>
    <Button icon onClick={() => fields.push({})}>
      <Icon name="plus" />
      Add Experience
    </Button>
    {fields.map((member, index) => (
      <div key={index}>
        <Form.Group>
          <Field
            name={`${member}.company`}
            label="Company"
            component={InputField}
          />
          <Field
            name={`${member}.title`}
            label="Title"
            component={InputField}
          />
          <Field
            name={`${member}.startDate`}
            label="Start Date"
            component={DateField}
          />
          <Field
            name={`${member}.endDate`}
            label="End Date"
            component={DateField}
          />
        </Form.Group>
        <Field
          name={`${member}.description`}
          label="Description"
          component={TextAreaField}
        />
        <Button icon onClick={() => fields.remove(index)}>
          <Icon name="trash" />
          Delete Experience
        </Button>
      </div>
    ))}
  </div>
);

const TagField = ({ input: { value, onChange } }) => {
  const tags = value || [];
  return (
    <ReactTags
      tags={tags.map((e, i) => ({ id: i.toString(), text: e }))}
      handleAddition={tag => onChange([...tags, tag.text])}
      handleDelete={i => onChange([...tags.slice(0, i), ...tags.slice(i + 1)])}
      placeholder="Type and press enter"
    />
  );
};

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
      <Form.Group widths="equal">
        <Field name="address" label="Address" component={InputField} />
        <Field
          name="website"
          label="Website"
          component={InputField}
          placeholder="http://"
        />
      </Form.Group>
      <hr />
      <FieldArray name="education" component={renderEducation} />
      <hr />
      <FieldArray name="experience" component={renderExperience} />
      <hr />
      <h3>Skills</h3>
      <Field name="skills" component={TagField} />
      <hr />
      <h3>Honors and Awards</h3>
      <Field name="honors" component={TagField} />
    </Form>
  );
};

export default reduxForm({ form: editFormName })(EditDetailsForm);
