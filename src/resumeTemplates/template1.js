import React, { Component } from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const style1 = StyleSheet.create({
  center: {
    width: "100%",
    textAlign: "center"
  }
});
function Template1(props) {
  var userData = props.userData;
  var self = props.that;
  return <Document
            title="aaaa"
            onRender={props.onDocRender}
          >
            <Page size="LETTER">
              <View style={style1.center}>
                <Text>
                  {userData.firstName} {userData.lastName}
                </Text>
              </View>
              <View style={style1.center}>
                <Text>{userData.emailAddr}</Text>
              </View>
            </Page>
          </Document>
}

export default Template1;

const anotherWay = () => (
  <Document
            key={this.state.remountKey}
            title="aaaa"
            onRender={this.onDocRender}
          >
            <Page size="LETTER">
              <View style={{ width: "100%", textAlign: "center" }}>
                <Text>
                  First Last
                </Text>
              </View>
              <View>
                <Text>Date</Text>
              </View>
            </Page>
          </Document>
)

//export default anotherWay;

/*
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
          */