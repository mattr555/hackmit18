import React, { Component } from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { Button, Input, Icon, Form, Container, Checkbox } from "semantic-ui-react";
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
      docUrl: null,
      showEducation: false,
      showUni1: false,
      showUni2: false,
      showUni3: false,
      universityName1: "Massachusetts Institute of Technology",
      universityName2: "Massachusetts Institute of Technology",
      universityName3: "Massachusetts Institute of Technology"
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
	      <Form.Field
	        label="Education"
	        control={Checkbox}
	        value={this.state.showUni1}
	        onChange={f => 
		  this.setState({showEducation: !this.state.showEducation,showUni1: false, showUni2: false, showUni3: false, dirty: true})}
	      {this.state.showEducation && <div>
	      <Button.Group>
		<Button>
		  content="One"
                  onClick={() => 
		    this.setState({ showUni1: true, showUni2: false, showUni3: false})}
		</Button>
		<Button>
		  content="Two"
		  onClick={() =>
		    this.setState({ showUni1: true, showUni2: true, showUni3: false})}
		</Button>
		<Button>
		  content="Three"
		  onClick={() =>
		    this.setState({ showUni1: true, showUni2: true, showUni3: true})}
		</Button>
	      </Button.Group>      
	      {this.state.showUni1 && <div>
	      <Form.Field
                control={Input}
                label="Name of Institution 1"
                value={this.state.universityName1}
                onChange={e => this.setState({ universityName1: e.target.value, dirty: true})}
              />
	      /div>}
	      {this.state.showUni2 && <div>
	      <Form.Field
                control={Input}
                label="Name of Institution 2"
                value={this.state.universityName2}
                onChange={e => this.setState({ universityName2: e.target.value, dirty: true})}
              />	
	      </div>}
	      {this.state.showUni3 && <div>
	      <Form.Field
                control={Input}
                label="Name of Institution 3"
                value={this.state.universityName3}
                onChange={e => this.setState({ universityName3: e.target.value, dirty: true})}
              />
	      </div>}
	      }
	      </div>
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
