

import React, { Fragment } from 'react';
import {
    StyleSheet,
    Text,
    ActivityIndicator,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
  } from "react-native";

function Loader({type, color, message}) { 

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          justifyContent: "center"
        },
        horizontal: {
          flexDirection: "row",
          justifyContent: "space-around",
          padding: 10
        }
      });


    return ( 
        <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color="#00ff00" />
        </View>
    ); 
} 
    
    
export default Loader;

