import React, { Component } from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { Button, Input, Icon, Form, Container, Menu } from "semantic-ui-react";
import { InputField } from "react-semantic-redux-form";
import { Route, NavLink } from "react-router-dom";
import DatePicker from "react-datepicker";
import moment from "moment";
import Template1 from "./resumeTemplates/template1.js";


import Multiselect from "./Multiselect";
import EditDetailsForm from "./EditDetailsForm";
import EditPage from "./EditPage";

import "react-datepicker/dist/react-datepicker.css";
import "./App.css";

class Build extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "Joe",
      lastName: "Schmoe",
      educations: [],
      date: moment(),
      dirty: false,
      remountKey: 0,
      docUrl: null
    };
  }

  onDocRender = blob => {
    this.setState({ docUrl: URL.createObjectURL(blob.blob), dirty: false });
  };

  render() {
    return (
      <div className="buildWrap">
        <div className="editWrap">
          <div className="editBody">
            <h2>Resumaté</h2>
            {/* <Form>
              <Form.Group widths="equal">
                <Form.Field
                  control={Input}
                  label="First name"
                  value={this.state.firstName}
                  onChange={e =>
                    this.setState({ firstName: e.target.value, dirty: true })
                  }
                />
                <Form.Field
                  control={Input}
                  label="Last name"
                  value={this.state.lastName}
                  onChange={e =>
                    this.setState({ lastName: e.target.value, dirty: true })
                  }
                />
                <Form.Field
                  control={Input}
                  label="email address"
                  value={this.state.emailAddr}
                  onChange={e =>
                    this.setState({ emailAddr: e.target.value, dirty: true })
                  }
                />
              </Form.Group>
              <Form.Field
                label="Date"
                control={DatePicker}
                selected={this.state.date}
                onChange={d => {
                  this.setState({ date: d, dirty: true });
                }}
              />
              {this.state.showEducation && <div>thing</div>}
            </Form> */}
          </div>
          <div className="editFooter">
            <Button
              icon
              labelPosition="left"
              onClick={() =>
                this.setState({ remountKey: new Date().getTime() })
              }
            >
              <Icon name="sync" />
              Refresh
            </Button>
            <a
              href={this.state.dirty ? undefined : this.state.docUrl}
              target="_blank"
              download="resume.pdf"
            >
              <Button icon labelPosition="left" disabled={this.state.dirty}>
                <Icon name="download" />
                Download
              </Button>
            </a>
          </div>
        </div>
        <div className="docWrap">
          <Template1 userData={{
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            emailAddr: this.state.emailAddr,
            date: this.state.date
          }} onDocRender={this.onDocRender} key={this.state.remountKey}></Template1>
          
        </div>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="appWrap">
        <Menu>
          <Menu.Item header>Resume Builder</Menu.Item>
          <Menu.Item
            as={NavLink}
            activeClassName="active"
            to="/edit"
            name="editDetails"
          >
            Edit Details
          </Menu.Item>
          <Menu.Item
            as={NavLink}
            activeClassName="active"
            to="/build"
            name="build"
          >
            Build
          </Menu.Item>
        </Menu>

        <Route path="/build" component={Build} />
        <Route path="/edit" component={EditPage} />
      </div>
    );
  }
}

export default App;
