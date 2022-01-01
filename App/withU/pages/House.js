import React, { useState, useEffect, Fragment } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
  } from "react-native";




export default function HouseState(props){

    const {textStyle, dataStyle, data, innerText} = props
    

    return(
        <Fragment>
            <Text style={textStyle}>{innerText}</Text>
            <Text style={dataStyle}>{data}</Text>
        </Fragment>
    )

}