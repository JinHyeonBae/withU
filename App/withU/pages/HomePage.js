import React, { useState, useEffect } from "react";
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

export default function HomePage() {
  // 임시 데이터
  let riskState = "경고"; // 0: 양호, 1: 경고, 2: 위험
  let temperature = 25;
  let humidity = 10;
  let activity = "양호";
  let robotUseFrequency = "양호";
  let riskColor = "";

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
          <Text style={styles.riskText}>사용자 상태</Text>
          <Text style={styles.riskStateText}>{riskState}</Text>
        </ProgressCircle>
      </View>

      <View style={styles.sensorContainer}>
        <View style>
          <View style={styles.sensorInfo}>
            <Text style={styles.sensorTitle}>온도</Text>
            <Text style={styles.sensorResult}>{temperature + "°C"} </Text>
          </View>
          <View style={styles.sensorInfo}>
            <Text style={styles.sensorTitle}>습도</Text>
            <Text style={styles.sensorResult}>{humidity + "%"} </Text>
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
