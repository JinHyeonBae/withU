import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";

export default function EditProtectorInfoPage({ navigation }) {
  useEffect(() => {
    navigation.setOptions({
      title: "내 정보 편집",
      headerLeft: () => (
        <TouchableOpacity
          style={{ marginLeft: 15 }}
          onPress={() => navigation.goBack(null)}>
          <Text style={{ fontSize: 15, fontWeight: "600", color: "#fff" }}>
            취소
          </Text>
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity style={{ marginRight: 15 }}>
          <Text style={{ fontSize: 15, fontWeight: "600", color: "#fff" }}>
            저장
          </Text>
        </TouchableOpacity>
      ),
    });
  }, []);

  const infoTitle = [
    "이름",
    "성별",
    "생년월일",
    "거주지",
    "전화번호",
    "사용자ID",
    "사용자와의\n관계",
  ];
  const infoTitleList = infoTitle.map((title, index) => (
    <View style={styles.titleContainer}>
      <Text key={index} style={styles.title}>
        {title}
      </Text>
    </View>
  ));

  const ProtectorInfo = {
    name: "한이음",
    gender: "여",
    birth: "2021.1.1",
    address: "부산광역시 남구 용소로 45 부경대학교",
    phone: "010-1111-2222",
    userId: "xxxx",
    relationship: "자식",
  };
  var birthArray = ProtectorInfo.birth.split(".");
  var phoneArray = ProtectorInfo.phone.split("-");

  return (
    <ScrollView style={{ backgroundColor: "#fff" }}>
      <Image
        style={styles.image}
        source={require("../../assets/protectorImage.png")}
      />
      <View style={styles.container}>
        <View style={{ flex: 4 }}>{infoTitleList}</View>
        <View style={{ flex: 11 }}>
          <View style={styles.infoContainer}>
            <TextInput style={styles.info}>{ProtectorInfo.name}</TextInput>
          </View>
          <View style={styles.infoContainer}>
            <TextInput style={styles.info}>{ProtectorInfo.gender}</TextInput>
          </View>
          <View style={styles.numContainer}>
            <TextInput style={styles.innerNumContainer} keyboardType="numeric">
              {birthArray[0]}
            </TextInput>
            <Text style={styles.info}> . </Text>
            <TextInput style={styles.innerNumContainer} keyboardType="numeric">
              {birthArray[1]}
            </TextInput>
            <Text style={styles.info}> . </Text>
            <TextInput style={styles.innerNumContainer} keyboardType="numeric">
              {birthArray[2]}
            </TextInput>
          </View>
          <View style={styles.infoContainer}>
            <TextInput style={styles.info} multiline={true}>
              {ProtectorInfo.address}
            </TextInput>
          </View>
          <View style={styles.numContainer}>
            <TextInput style={styles.innerNumContainer} keyboardType="numeric">
              {phoneArray[0]}
            </TextInput>
            <Text style={styles.info}> - </Text>
            <TextInput style={styles.innerNumContainer} keyboardType="numeric">
              {phoneArray[1]}
            </TextInput>
            <Text style={styles.info}> - </Text>
            <TextInput style={styles.innerNumContainer} keyboardType="numeric">
              {phoneArray[2]}
            </TextInput>
          </View>
          <View style={styles.infoContainer}>
            <TextInput style={styles.info}>{ProtectorInfo.userId}</TextInput>
          </View>
          <View style={styles.infoContainer}>
            <TextInput style={styles.info}>
              {ProtectorInfo.relationship}
            </TextInput>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    marginTop: 60,
    marginBottom: 40,
    width: 100,
    height: 91,
    alignSelf: "center",
  },
  container: {
    flex: 1,
    flexDirection: "row",
    marginHorizontal: 25,
  },
  titleContainer: {
    paddingLeft: 5,
    height: 55,
    justifyContent: "center",
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
    color: "#595959",
  },
  infoContainer: {
    paddingLeft: 10,
    paddingRight: 5,
    height: 55,
    justifyContent: "center",
    marginBottom: 5,
    backgroundColor: "#FBFBFB",
    borderWidth: 0.5,
    borderColor: "#DDDDDD",
    borderRadius: 8,
  },
  info: {
    fontSize: 14,
    fontWeight: "400",
  },
  numContainer: {
    height: 46,
    flexDirection: "row",
    marginBottom: 5,
    alignItems: "center",
    justifyContent: "space-between",
  },
  innerNumContainer: {
    height: 46,
    width: 65,
    textAlign: "center",
    backgroundColor: "#FBFBFB",
    borderWidth: 0.5,
    borderColor: "#DDDDDD",
    borderRadius: 8,
  },
});
