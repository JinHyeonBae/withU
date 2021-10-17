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
import Loading from "../components/Loding";

export default function HomePage() {
  const [houseForm, setHouseForm] = useState({
    house_id: -1, // int
    temperature: -1,
    humidity: -1,
    risk: -1,
    infrared: -1, // 적외선
    user_number: "",
  });
  const [isLoading, setLoading] = useState(true);

  // const getHouseInfo = async () => {
  //   try {
  //     const response = await fetch("http://3.36.136.26:4000/getHouseInfo");
  //     const json = await response.json();
  //     console.log(json.house_id);
  //     setHouseForm({ ...houseForm, house_id: json.house_id });
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    setTimeout(() => {
      // getHouseInfo();
      const url = "http://3.36.136.26:4000/getHouseInfo";

      fetch(url)
        .then((response) => response.json())
        .then((res) => {
          setHouseForm({ ...houseForm, house_id: res.house_id });
          setHouseForm({ ...houseForm, temperature: res.temperature });
          setHouseForm({ ...houseForm, humidity: res.humidity });
          setHouseForm({ ...houseForm, risk: res.risk });
          setHouseForm({ ...houseForm, infrared: res.house_id });
          setHouseForm({ ...houseForm, user_number: res.user_number });
          setHouseForm({ ...houseForm, HouseCol: res.HouseCol });
          console.log(res);
        })
        .catch((error) => {
          console.error(error);
        });
      setLoading(false);
    }, 2000);
  }, []);

  const riskState = "";
  const riskColor = "";

  switch (houseForm.risk) {
    case 0:
      riskColor = "#70AD47";
      riskState = "양호";
      break;
    case 1:
      riskColor = "#ffcc00";
      riskState = "경고";
      break;
    case 2:
      riskColor = "#ec1c24";
      riskState = "위험";
      break;
  }

  return isLoading ? (
    <Loading />
  ) : (
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
          <Text style={styles.riskStateText}>{houseForm.risk}</Text>
        </ProgressCircle>
      </View>

      <View style={styles.sensorContainer}>
        <View style>
          <View style={styles.sensorInfo}>
            <Text style={styles.sensorTitle}>온도</Text>
            <Text style={styles.sensorResult}>
              {houseForm.temperature + "°C"}{" "}
            </Text>
          </View>
          <View style={styles.sensorInfo}>
            <Text style={styles.sensorTitle}>습도</Text>
            <Text style={styles.sensorResult}>{houseForm.humidity + "%"} </Text>
          </View>
        </View>

        <View>
          <View style={styles.sensorInfo}>
            <Text style={styles.sensorTitle}>활동 감지</Text>
            <Text style={styles.sensorResult}>{houseForm.infrared} </Text>
          </View>
          {/* <View style={styles.sensorInfo}>
            <Text style={styles.sensorTitle}>말동무 사용</Text>
            <Text style={styles.sensorResult}>{houseForm.} </Text>
          </View> */}
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
