import React, {useState,useEffect}  from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Alert, } from 'react-native';
import ProgressCircle from 'react-native-progress-circle';
import { StatusBar } from 'expo-status-bar';
import Icon from 'react-native-vector-icons/Ionicons';

export default function RecodePage({navigation}) {
  useEffect(()=>{
    navigation.setOptions({
      title:'말동무',
      headerRight: () => (
        <Icon style={{ marginRight: 15}}
          name="list"
          color="#fff"
          size="23"
          onPress={() => alert('녹음 파일 ')}
        >
        </Icon>
      ),
  },[])
}) 

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.micContainer}>
        <Icon
          name="mic-outline"
          color="#4D4D4D"
          size="100"
          onPress={() => alert('녹음 중')}
        />
      </TouchableOpacity>
      <Text style={styles.micInfo}> 마이크 버튼을 누른 후</Text>
      <Text style={styles.micInfo}> 사용자에게 전달할 말을 녹음해주세요</Text>
    </View>
  )

}

const styles = StyleSheet.create({
  container:{
    backgroundColor:"#fff",
    flex:1,
    alignItems:"center",
    justifyContent:"center",
    paddingHorizontal: 10
  },
  micContainer:{
    borderWidth:1.5,
    alignItems: "center",
    justifyContent:"center",
    borderRadius: 100,
    width: 150,
    height: 150,
    borderColor: "#4D4D4D",
    paddingLeft:10,
    marginBottom: 40
  },
  micButton:{
  },
  micInfo:{
    alignItems: "center",
    fontSize: 15,
    marginBottom: 5
  },
})