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
import DetailSelectForm from "./DetailSelectForm";

import { dataLocalStorageKey } from "./consts";

import "react-datepicker/dist/react-datepicker.css";
import "./App.css";

class Build extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: {},
      selections: {},
      dirty: false,
      remountKey: 0,
      docUrl: null
    };
  }

  componentWillMount() {
    const details = JSON.parse(
      window.localStorage.getItem(dataLocalStorageKey) || "{}"
    );
    this.setState({
      details,
      selections: {
        firstName: true,
        lastName: true,
        address: false,
        email: true,
        phone: false,
        honors: new Array(details.honors ? details.honors.length : 0).fill(
          false
        ),
        education: new Array(
          details.education ? details.education.length : 0
        ).fill(false),
        skills: new Array(details.skills ? details.skills.length : 0).fill(
          false
        ),
        experience: new Array(
          details.experience ? details.experience.length : 0
        ).fill(false)
      }
    });
  }

  onDocRender = blob => {
    this.setState({ docUrl: URL.createObjectURL(blob.blob), dirty: false });
  };

  render() {
    const sels = this.state.selections;
    const details = this.state.details;
    return (
      <div className="buildWrap">
        <div className="editWrap">
          <div className="editBody">
            <DetailSelectForm
              options={details}
              state={sels}
              onChange={(key, index) => {
                if (typeof index == "undefined") {
                  this.setState({
                    selections: {
                      ...sels,
                      [key]: !sels[key]
                    },
                    dirty: true
                  });
                } else {
                  this.setState({
                    selections: {
                      ...sels,
                      [key]: [
                        ...sels[key].slice(0, index),
                        !sels[key][index],
                        ...sels[key].slice(index + 1)
                      ]
                    },
                    dirty: true
                  });
                }
              }}
            />
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
          <Template1
            userData={{
              firstName: details.firstName,
              lastName: details.lastName,
              emailAddr: sels.email ? details.email : null,
              phone: sels.phone ? details.phone : null,
              address: sels.address ? details.address : null,
              education: details.education.filter((v, i) => sels.education[i]),
              experience: details.experience.filter(
                (v, i) => sels.experience[i]
              ),
              skills: [
                {
                  skills: details.skills
                    .filter((v, i) => sels.skills[i])
                    .join(", ")
                }
              ],
              honors: details.honors
                .filter((v, i) => sels.honors[i])
                .map(v => ({ honor: v }))
            }}
            onDocRender={this.onDocRender}
            key={this.state.remountKey}
          />
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
          <Menu.Item header>Resumaté</Menu.Item>
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
