import React, { Component } from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

function addList (style, array, left, right, subLeft, subRight, description) {
  function rightTag(rightText) {
    //console.log(right);
    if (rightText != null && rightText != 'error') {
      //console.log(array[i][subRight]);
      return <Text style={style.right}>{rightText}</Text>;
    }
    console.log('yes?')
    return "";
  }
  let outList = [];
  for (let i = 0; i < array.length; i++) {
    // concatenate left if needed
    let leftText = putTogether(array[i], left);
    let rightText = putTogether(array[i], right);
    outList.push(<View style={style.makeRow}><Text>{leftText}</Text><Text style={style.right}>{rightTag(rightText)}</Text></View>);
    if (subLeft || subRight) {
    outList.push(<View style={style.makeRow}><Text style={style.subSec}>{array[i][subLeft]}</Text><Text style={style.subRight}>{array[i][subRight]}</Text></View>);
    }
    if (description && array[i][description]) {
      outList.push(<View style={style.description}>{formDescript(array[i], description)}</View>)
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

export function addSection (style, title, array, left, right, subLeft, subRight, description) {
  //let theList = addList(style, array);
  return <View>
    <Text style={style.header}>{title}</Text>
  
    {addList(style, array, left, right, subLeft, subRight, description)}

  </View>
}