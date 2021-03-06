import React, { Component } from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import styled from "@react-pdf/styled-components";
import moment from "moment";
import * as templateUtil from "../templateUtil";
//import {Font} from "@react-pdf/renderer";
//Font.register('../fonts/Garamond.ttf', {family: "Garamond"})
const style1 = StyleSheet.create({
  center: {
    width: "100%",
    textAlign: "center"
  },
  nameHeader: {
    fontSize: 32 //,
    //fontFamily:
  },
  contactInfo: {
    fontSize: 14
  },
  blue: {
    color: "blue"
  },
  whole: {
    padding: "20px"
  },
  header: {
    fontSize: 22,
    fontWeight: 900,
    color: "#0022CC"
  },
  right: {
    alignContent: "flex-end"
  },
  makeRow: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  section: {
    marginTop: "16px",
    fontSize: 16
  },
  description: {
    marginLeft: 10
  }
});

function Template1(props) {
  var userData = props.userData;
  var self = props.that;
  console.log(userData);
  return (
    <Document
      font={[{ fontFamily: "Garamond", src: "../fonts/Garamond.ttf" }]}
      title="Resume"
      onRender={props.onDocRender}
    >
      <Page style={style1.whole} size="LETTER">
        <View style={[style1.center, style1.nameHeader]}>
          <Text>
            {userData.firstName} {userData.lastName}
          </Text>
        </View>
        <Text style={[style1.center, style1.contactInfo]}>
          <Text style={style1.blue}>{userData.emailAddr}</Text>{" "}
          <Text>{userData.phone}</Text> <Text>{userData.address}</Text>
        </Text>
        <View style={style1.section}>
          {templateUtil.addSection(
            style1,
            "Education",
            userData.education,
            "school",
            "year",
            ["degree", "major", " "],
            [
              "&&TITLETotal GPA:",
              "totalGPA",
              "&&TITLEMajor GPA:",
              "majorGPA",
              " "
            ],
            "description"
          )}
        </View>
        <View style={style1.section}>
          {templateUtil.addSection(
            style1,
            "Experience",
            userData.experience,
            ["company", "title", " — "],
            ["(((date", "startDate", "endDate", " - "],
            null,
            null,
            "description"
          )}
        </View>
        <View style={style1.section}>
          {templateUtil.addSection(style1, "Skills", userData.skills, "skills")}
        </View>
        <View style={style1.section}>
          {templateUtil.addSection(
            style1,
            "Honors and Awards",
            userData.honors,
            "honor"
          )}
        </View>
      </Page>
    </Document>
  );
}

export default Template1;
