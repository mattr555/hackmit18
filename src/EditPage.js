import React from "react";
import EditDetailsForm from "./EditDetailsForm";
import { connect } from "react-redux";
import { submit } from "redux-form";
import { Button } from "semantic-ui-react";
import { editFormName, dataLocalStorageKey, initialDetails } from "./consts";

const EditPage = ({ dispatch }) => {
  const saveData = data => {
    window.localStorage.setItem(dataLocalStorageKey, JSON.stringify(data));
  };

  const data = window.localStorage.getItem(dataLocalStorageKey);
  const initialValues = data ? JSON.parse(data) : initialDetails;

  return (
    <div className="detailFormWrap">
      <div className="detailFormBody">
        <EditDetailsForm onSubmit={saveData} initialValues={initialValues} />
      </div>
      <div className="detailFormFooter">
        <Button primary onClick={() => dispatch(submit(editFormName))}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default connect()(EditPage);
