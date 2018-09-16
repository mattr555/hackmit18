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
    marginTop: "16px",
    fontSize: 16
  },
  subSec: {
    fontSize: 14
  },
  description: {
    marginLeft: 10
  }
});

function Template1(props) {
  var userData = props.userData;
  var self = props.that;
  
  let addList = (array, left, right, subLeft, subRight, description) => {
    function rightTag(rightText) {
      //console.log(right);
      if (rightText != null && rightText != 'error') {
        //console.log(array[i][subRight]);
        return <Text style={style1.right}>{rightText}</Text>;
      }
      console.log('yes?')
      return "";
    }
    let outList = [];
    for (let i = 0; i < array.length; i++) {
      // concatenate left if needed
      let leftText = putTogether(array[i], left);
      let rightText = putTogether(array[i], right);
      outList.push(<View style={style1.makeRow}><Text>{leftText}</Text><Text style={style1.right}>{rightTag(rightText)}</Text></View>);
      if (subLeft || subRight) {
      outList.push(<View style={style1.makeRow}><Text style={style1.subSec}>{array[i][subLeft]}</Text><Text style={style1.subRight}>{array[i][subRight]}</Text></View>);
      }
      if (description) {
        outList.push(<View style={style1.description}>{formDescript(array[i], description)}</View>)
      }
    }
    return outList;
  }
  
  function putTogether(item, keys) {
    if (typeof(keys) === "string") {
      return item[keys];
    }
    let outList = [];
    if (typeof(keys) === "object") {
      // array. concat the first n-1 objects using n as the delimiter
      let delim = keys[keys.length - 1];
      for (let i = 0; i < keys.length - 1; i++) {
        outList.push(item[keys[i]]);
      }
      return outList.join(delim);
    }
    return "error"
  }
  
  function formDescript(item, key) {
    // assume one-key descriptions. interpret asterisk as bullet point
    
    let bulletPoint = '•';//'\u8226';
    let result = [];
    let descriptionText = item[key].split("*");
    //let descriptionText = item[key].replace(/\*/g, bulletPoint);
    if (descriptionText.length == 1) return <Text>{descriptionText}</Text>;
    for (let i = 0; i < descriptionText.length; i++) {
      if (descriptionText[i].length > 0) {
        result.push(<Text>{bulletPoint+'  '+descriptionText[i]}</Text>);
      }
    }
    return result;
  }
  let addSection = (title, array, left, right, subLeft, subRight, description) => {
    let theList = addList(array);
    return <View>
      <Text style={style1.header}>{title}</Text>
    
      {addList(array, left, right, subLeft, subRight, description)}

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
    },
    {
      "company": "Domino's",
      "title": "CEO",
      "startDate": '9/8/2011',
      "endDate": 'Today',
      "description": "*I made pizza and I unmade pizza*I had fun"
    }
  ]
  
  //skill list that looks better
  var skillList = [
    {
      category: 'Programming Skills:',
      skills: [
      	'Python 3',
      	'JavaScript/ES2015',
      	'Java 8',
      	'C++11'
      	]
    },
    {
      category: 'Web Development:',
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
      category: 'Miscellaneous Software:',
      skills: [
      	'Git',
      	'UNIX',
      	'Bash'
      	]
    }
  ];
  
  var honors = [
  {honor:"Commvault Scholar"},
  {honor:"National Merit Scholar"},
  {honor:"International Collegiate Curling Competition — Semifinalist 2018"}
  ]
  
  //skill list that's easier to implement. handle actual concatenation somewhere else
  //also just realized spec is different
  var differentSkillList = [
    {
      category: 'Programming Skills:',
      skills: 'Python 3, JavaScript/ES2015, Java 8, C++11'
    },
    {
      category: 'Web Development:',
      skills: 'CSS/Sass, Bootstrap, d3.js, React/Redux, Django, Flask'
    },
    {
      category: 'Miscellaneous Software:',
      skills: 'Git, UNIX, Bash'
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
              {addSection("Experience", expList, ["company", "title", ' — '],["startDate", "endDate", ' - ' ], null, null, "description")}
              </View>
              <View style={style1.section}>
              {addSection("Skills", differentSkillList, "category", "skills")}
              </View>
              <View style={style1.section}>
              {addSection("Honors and Awards", honors, "honor")}
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