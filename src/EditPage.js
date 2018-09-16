import React, { Component } from "react";
import EditDetailsForm from "./EditDetailsForm";
import { connect } from "react-redux";
import { submit, isDirty } from "redux-form";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";
import { editFormName, dataLocalStorageKey, initialDetails } from "./consts";

class EditPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showNextStep: false
    };
  }

  render() {
    const saveData = data => {
      window.localStorage.setItem(dataLocalStorageKey, JSON.stringify(data));
      this.setState({ showNextStep: true });
    };

    const data = window.localStorage.getItem(dataLocalStorageKey);
    const initialValues = data ? JSON.parse(data) : initialDetails;

    return (
      <div className="detailFormWrap">
        <div className="detailFormBody">
          <EditDetailsForm onSubmit={saveData} initialValues={initialValues} />
        </div>
        <div className="detailFormFooter">
          <Button
            primary
            onClick={() => this.props.dispatch(submit(editFormName))}
          >
            Save
          </Button>
          {this.state.showNextStep && (
            <Link to="/build">
              <Button positive>Continue to Build</Button>
            </Link>
          )}
        </div>
      </div>
    );
  }
}

export default connect()(EditPage);
