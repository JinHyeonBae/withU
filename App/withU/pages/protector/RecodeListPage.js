import React, {useState,useEffect}  from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Alert, } from 'react-native';
import ProgressCircle from 'react-native-progress-circle';
import { StatusBar } from 'expo-status-bar';
import Icon from 'react-native-vector-icons/Ionicons';

export default function RecodeListPage({navigation}) {

useEffect(()=>{  
  navigation.setOptions({
    title:'말동무 목록',
    headerLeft: () => (
      <TouchableOpacity style={{marginLeft:15}} onPress={() => navigation.goBack(null)}>
        <Text style={{fontSize:15, fontWeight:"600", color:"#fff"}}>취소</Text>
      </TouchableOpacity>
    ),
    headerRight: () => (
      <TouchableOpacity style={{marginRight:15}}>
        <Text style={{fontSize:15, fontWeight:"600", color:"#fff"}}>저장</Text>
      </TouchableOpacity>
    ),
  })
},[])

  return (

  )

}

const styles = StyleSheet.create({
})