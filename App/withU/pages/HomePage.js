import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import ProgressCircle from "react-native-progress-circle";
import { StatusBar } from "expo-status-bar";
import HouseState from './House'
import ReactLoading from 'react-loading';
import Loader from "./Loader";


export default function HomePage() {
  // 임시 데이터
  let riskState = "경고"; // 0: 양호, 1: 경고, 2: 위험
  let temperature = 25;
  let humidity = 10;
  let activity = "양호";
  let robotUseFrequency = "양호";
  let riskColor = "";

  const [loading, setLoading] = useState(true);
  const [houseState, setHouseState] = useState({
    temperature : 0,
    humidity : 0,
    infrared : 0,
    risk : -1
  })

  switch (riskState) {
    case "양호":
      riskColor = "#70AD47";
      break;
    case "경고":
      riskColor = "#ffcc00";
      break;
    case "위험":
      riskColor = "#ec1c24";
      break;
  }

  


  useEffect(()=>{
  
    const submit = () =>{

      console.log("submit")
      //localhost로 접속 시 network failed가 일어나서 ngrok으로 임시 설정
      // https 시 network request failed
      const url = 'http://3.36.136.26:4000/getHouseInfo'
  
  
      const result = fetch(url)
      
      result
      .then((res)=> res.json())
      .then((res)=>{
        console.log(res)
        setHouseState({...houseState, temperature : res.houseData.temperature})
        setHouseState({...houseState, humidity : res.houseData.humidity})
        setHouseState({...houseState, infrared : res.houseData.infrared})
        setHouseState({...houseState, risk : res.houseData.risk})
      })
      .then(()=>{ setLoading(false); console.log("loading sc")})
      .catch((error)=>{
        console.log(error)
        console.log ( '페치 작업에 문제가 발생했습니다, POST : ' + error.message );
       throw error;
      })
    console.log("useEffect")
    submit()

  }}, [])

    
  if(loading) return <Loader type="spin" color="111111" message={"잠시만 기다려주세요"} />

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="black" />
      <View style={styles.riskContainer}>
        <ProgressCircle
          percent={100}
          radius={130}
          borderWidth={30}
          color={riskColor}
          bgColor="#fff">
          <HouseState textStyle={styles.riskText} dataStyles={styles.riskStateText} innerText={"사용자 상태"} data={houseState.risk}/>
        </ProgressCircle>
      </View>

      <View style={styles.sensorContainer}>
        <View style>
          <View style={styles.sensorInfo}>
          <HouseState textStyle={styles.sensorTitle} dataStyles={styles.sensorResult} innerText={"온도"} data={houseState.temperature + "°C"}/>
          </View>
          <View style={styles.sensorInfo}>
          <HouseState textStyle={styles.sensorTitle} dataStyles={styles.sensorResult} innerText={"습도"} data={houseState.humidity + "%"}/>
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
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 10,
  },
  riskContainer: {
    paddingTop: 30,
    paddingBottom: 50,
    borderColor: "#D3D3D3",
    borderBottomWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  sensorContainer: {
    flexDirection: "row",
    paddingTop: 40,
    alignSelf: "center",
    width: "90%",
  },
  sensorTitle: {
    color: "#696969",
    fontSize: 15,
    fontWeight: "400",
    marginVertical: 5,
  },
  sensorResult: {
    color: "#000",
    fontSize: 20,
    fontWeight: "400",
  },
  riskStateText: {
    fontSize: 30,
    fontWeight: "600",
    marginTop: 10,
  },
  riskText: {
    fontSize: 20,
    marginTop: 7,
  },
  sensorInfo: {
    borderBottomWidth: 1,
    borderColor: "#696969",
    width: 150,
    height: 70,
    justifyContent: "center",
    marginHorizontal: 5,
  },
});
