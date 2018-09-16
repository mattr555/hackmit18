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
  let addList = (array) => {
    let outList = [];
    for (let i = 0; i < array.length; i++) {
      outList.push(<View style={style1.makeRow}><Text>{array[i].left}</Text><Text style={style1.right}>{array[i].right}</Text></View>);
    }
    return outList;
  }
  let addSection = (title, array) => {
    let theList = addList(array);
    return <View>
      <Text style={style1.header}>{title}</Text>
    
      {addList(eduList)}
    </View>
  }
  var eduList = [
    {
      school: 'Rutgers University, New Brunswick, NJ',
      year: '2021'
    },
    {
      school: 'High Technology High School, Lincroft, NJ',
      year: '2016'
    }
  ]
  
  var skillList = [
    {
      category: 'Programming Skills',
      skills: [
      	'Python 3',
      	'JavaScript/ES2015',
      	'Java 8',
      	'C++11'
      	]
    },
    {
      category: 'Web Development',
      skills: [
      	'CSS/Sass',
      	'Bootstrap',
      	'd3.js',
      	'React/Redux',
      	'Django',
      	'Flask'
      	]
      	
    },
    {
      category: 'Miscellaneous Software',
      skills: [
      	'Git',
      	'UNIX',
      	'Bash'
      	]
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
              {addSection("Education", eduList)}
              </View>
              <View style={style1.section}>
              {addSection("Experience", eduList)}
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