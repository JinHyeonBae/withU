import React, {useState,useEffect}  from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';
import ProgressCircle from 'react-native-progress-circle';
import { StatusBar } from 'expo-status-bar';

export default function HomePage() {
  // 임시 데이터 
  let riskPercent = 25;
  let temperature = 25;
  let humidity = 10;
  let dust = 30;
  let activity = '양호';
  let robotUseFrequency = '양호';

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="black" />
      <View style={styles.riskContainer}>
        <ProgressCircle
          percent={riskPercent}
          radius={130}
          borderWidth={40}
          color="#70AD47"
          shadowColor="#D3D3D3"
          bgColor="#fff"
        > 
          <Text style={styles.riskText}>위험도</Text>
          <Text style={styles.riskPercentText}>{riskPercent + '%'}</Text>
        </ProgressCircle>
      </View>

      <View style={styles.sensorContainer}>
        <View style>
          <View style={styles.sensorInfo}>
            <Text style={styles.sensorTitle}>온도</Text>
            <Text style={styles.sensorResult}>{temperature + '°C'} </Text>
          </View>
          <View style={styles.sensorInfo}>
            <Text style={styles.sensorTitle}>습도</Text>
            <Text style={styles.sensorResult}>{humidity + '%'} </Text>
          </View>
          <View style={styles.sensorInfo}>
            <Text style={styles.sensorTitle}>먼지</Text>
            <Text style={styles.sensorResult}>{dust + '%'} </Text>
          </View>
        </View>

        <View>
          <View style={styles.sensorInfo}>
            <Text style={styles.sensorTitle}>활동 감지</Text>
            <Text style={styles.sensorResult}>{activity} </Text>
          </View>
          <View style={styles.sensorInfo}>
            <Text style={styles.sensorTitle}>말동무 사용</Text>
            <Text style={styles.sensorResult}>{robotUseFrequency} </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  )

}

const styles = StyleSheet.create({
  container:{
    backgroundColor:"#fff",
    padding:10
  },
  riskContainer:{
    paddingTop: 30,
    paddingBottom: 40,
    borderColor: "#D3D3D3",
    borderBottomWidth: 1,
    alignItems:"center",
    justifyContent:"center"
  },
  sensorContainer:{
    flexDirection:"row",
    padding:10,
    paddingTop: 30,
    alignSelf: "center",
    width: "90%",
  },
  sensorTitle:{
    color:"#696969",
    fontSize:15,
    fontWeight:"400"
  },
  sensorResult:{
    color:"#000",
    fontSize:20,
    fontWeight:"400"
  },
  riskText:{
    fontSize:30,
    fontWeight:"500",
    marginTop:7
  },
  riskPercentText:{
    fontSize:20,
    marginTop:7
  },
  sensorInfo:{
    borderBottomWidth:1,
    borderColor:"#696969",
    width: 150,
    height:70,
    justifyContent:"center",
  },

})