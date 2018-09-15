import React, { Component } from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { Button, Input, Icon, Form, Container } from "semantic-ui-react";
import DatePicker from "react-datepicker";
import moment from "moment";

import Multiselect from "./Multiselect";

import "react-datepicker/dist/react-datepicker.css";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "Joe",
      lastName: "Schmoe",
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
      <div className="appWrap">
        <div className="editWrap">
          <div className="editBody">
            <h2>hai</h2>
            <Form>
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
              </Form.Group>
              <Form.Field
                label="Date"
                control={DatePicker}
                selected={this.state.date}
                onChange={d => this.setState({ date: d, dirty: true })}
              />
              {/* <Multiselect /> */}
            </Form>
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
          <Document
            key={this.state.remountKey}
            title="aaaa"
            onRender={this.onDocRender}
          >
            <Page size="LETTER">
              <View style={{ width: "100%", textAlign: "center" }}>
                <Text>
                  {this.state.firstName} {this.state.lastName}
                </Text>
              </View>
              <View>
                <Text>{this.state.date.format("MMM D, YYYY")}</Text>
              </View>
            </Page>
          </Document>
        </div>
      </div>
    );
  }
}

export default App;
