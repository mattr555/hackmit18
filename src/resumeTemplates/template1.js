import React, { Component } from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import styled from '@react-pdf/styled-components';
//import {Font} from "@react-pdf/renderer";
//Font.register('../fonts/Garamond.ttf', {family: "Garamond"})
const style1 = StyleSheet.create({
  center: {
    width: "100%",
    textAlign: "center"
  },
  nameHeader: {
    fontSize: 32//,
    //fontFamily: 
  },
  contactInfo: {
    fontSize: 14,
    color : 'blue'
  },
  whole: {
    padding:"20px"
  },
  header: {
    fontSize: 22,
    fontWeight: 900,
    color: '#0022CC'
  },
  right: {
    alignContent: "flex-end"
  },
  makeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  section: {
    marginTop: "16px"
  }
});

function Template1(props) {
  var userData = props.userData;
  var self = props.that;
  let addList = (array, left, right, subLeft, subRight) => {
    let outList = [];
    for (let i = 0; i < array.length; i++) {
      // concatenate left if needed
      let leftText = putTogether(array[i], left);
      outList.push(<View style={style1.makeRow}><Text>{leftText}</Text><Text style={style1.right}>{array[i][right]}</Text></View>);
      if (subLeft || subRight) {
        outList.push(<View style={style1.makeRow}><Text>{array[i][subLeft]}</Text><Text style={style1.right}>{array[i][subRight]}</Text></View>);
      }
    }
    return outList;
  }
  
  function putTogether(item, keys) {
    if (typeof(keys) == "string") {
      return item[keys];
    }
    let outList = [];
    if (typeof(keys) == "object") {
      // array. concat the first n-1 objects using n as the delimiter
      let delim = keys[keys.length - 1];
      console.log(item);
      for (let i = 0; i < keys.length - 1; i++) {
        console.log(keys[i]);
        outList.push(item[keys[i]]);
      }
      return outList.join(delim);
    }
    return "error"
  }
  let addSection = (title, array, left, right, subLeft, subRight) => {
    let theList = addList(array);
    return <View>
      <Text style={style1.header}>{title}</Text>
    
      {addList(array, left, right, subLeft, subRight)}

    </View>
  }
  var eduList = [
    {
      school: 'Rutgers University, New Brunswick, NJ',
      year: '2021',
      degree: 'BSE Electrical Engineering',
      GPA: 'GPA: 3.14'
    },
    {
      school: 'High Technology High School, Lincroft, NJ',
      year: '2016'
    }
  ];
  
  var expList = [
    {
      "company": "Vault Gang",
      "title": "Squad Lead",
      "startDate": 30,
      "endDate": 3232,
      "description": "did some stuff"
    }
  ]
  
  return <Document 
            font={[
             { fontFamily: 'Garamond', src: '../fonts/Garamond.ttf' }
            ]}
            title="aaaa"
            onRender={props.onDocRender}
          >
            <Page style={style1.whole} size="LETTER">
              <View style={[style1.center, style1.nameHeader]}>
                <Text>
                  {userData.firstName} {userData.lastName}
                </Text>
              </View>
              <View style={[style1.center, style1.contactInfo]}>
                <Text>{userData.emailAddr}</Text>
              </View>
              <View style={style1.section}>
              {addSection("Education", eduList, "school", "year", "degree", "GPA")}
              </View>
              <View style={style1.section}>
              {addSection("Experience", expList, ["company", "title", ' -- '],["startDate", "endDate", ' -- ' ])}
              </View>
            </Page>
          </Document>
}

export default Template1;

//export default class Template1 extends React.Component {
/*function Template1(props) {

  let createTable = () => {
    let table = []

    // Outer loop to create parent
    for (let i = 0; i < 3; i++) {
      let children = []
      //Inner loop to create children
      for (let j = 0; j < 5; j++) {
        children.push(<td>{`Column ${j + 1}`}</td>)
      }
      //Create the parent and add the children
      table.push(<tr>{children}</tr>)
    }
    return table
  }


  
    return(
      <table>
        {createTable()}
      </table>
    )
  

}*/

//{[1,2,3].map(i => <Text>Hii{i}</Text>)}