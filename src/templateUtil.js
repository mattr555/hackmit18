import React, { Component } from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

function addList (style, array, left, right, subLeft, subRight, description) {
  function rightTag(rightText) {
    if (rightText != null && rightText != 'error') {
      return <Text style={style.right}>{rightText}</Text>;
    }
    return "";
  }
  let outList = [];
  for (let i = 0; i < array.length; i++) {
    // concatenate left if needed
    let leftText = putTogether(array[i], left);
    let rightText = putTogether(array[i], right);
    let subLeftText = putTogether(array[i], subLeft);
    let subRightText = putTogether(array[i], subRight);
    outList.push(<View style={style.makeRow}><Text>{leftText}</Text><Text style={style.right}>{rightTag(rightText)}</Text></View>);
    if (subLeft || subRight) {
    outList.push(<View style={style.makeRow}><Text>{subLeftText}</Text><Text style={style.subRight}>{subRightText}</Text></View>);

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
  if (keys == null) {
    return "error"
  }
  let outList = [];
  if (typeof(keys) === "object") {
  	var moment = require('moment');
    // array. concat the first n-1 objects using n as the delimiter
    let delim = keys[keys.length - 1];
    for (let i = 0; i < keys.length - 1; i++) {
      if (moment(item[keys[i]]).isValid()) {
      	outList.push(dateConverter(item[keys[i]], "MMM YYYY"));
      }
      else if (keys[i].indexOf("&&TITLE") == 0) {
        outList.push(keys[i].substring(7));
      }
      else {
      	outList.push(item[keys[i]]);=
      }
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

function dateConverter(date, format) {
  var moment = require('moment');
  let convertedDate = moment(date).format(format);
  return convertedDate
}

export function addSection (style, title, array, left, right, subLeft, subRight, description) {
  //let theList = addList(style, array);
  return <View>
    <Text style={style.header}>{title}</Text>
  
    {addList(style, array, left, right, subLeft, subRight, description)}

  </View>
}