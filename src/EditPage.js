import React from "react";
import EditDetailsForm from "./EditDetailsForm";
import { connect } from "react-redux";
import { submit } from "redux-form";
import { Button } from "semantic-ui-react";
import { editFormName } from "./consts";

const EditPage = ({ dispatch }) => {
  return (
    <div className="detailFormWrap">
      <div className="detailFormBody">
        <EditDetailsForm onSubmit={console.log} />
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
