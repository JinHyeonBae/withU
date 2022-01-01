import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

export default function ProtectorJoinPage({ navigation, route }) {
  // text input
  const [protectorJoinForm, setProtectorJoinForm] = useState({
    protectorId: "",
    protectorPw: "",
    protectorName: "",
    protectorBirth: "",
    protectorAddr: "",
    protectorPhone: "",
    relationShip: "",
    userType: "Protector",
  });

  const [registerState, setRegisterState] = useState({
    message: "",
  });

  const submit = () => {
    console.log("submit");
    //localhost로 접속 시 network failed가 일어나서 ngrok으로 임시 설정
    // https 시 network request failed
    const url = "http://3.36.136.26:4000/signUp";

    const result = fetch(url, {
      method: "POST",
      body: JSON.stringify(protectorJoinForm),
      headers: {
        "Content-Type": "application/json",
      },
    });

    result
      .then((res) => res.json())
      .then((res) => {
        console.log("서버로부터의 답변 :", res.message);
        setRegisterState(res.message);
      })
      .catch((error) => {
        console.log(error);
        console.log("페치 작업에 문제가 발생했습니다, POST : " + error.message);
        throw error;
      });
  };
  const protectorDBTitle = [
    "아이디",
    "비밀번호",
    "이름",
    "생년월일",
    "주소",
    "전화번호",
    "사용자와의\n관계",
  ];

  const protectorDBTitleList = protectorDBTitle.map((title, index) => (
    <View style={styles.DBTitlecontainer}>
      <Text key={index} style={styles.DBtitle}>
        {title}
      </Text>
    </View>
  ));

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#E1EADE" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <ScrollView>
          <View style={styles.titleContainer}>
            <Text style={styles.title}> 보호자 회원가입</Text>
          </View>

          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inputContainer}>
              <View style={{ flex: 1 }}>{protectorDBTitleList}</View>
              <View style={{ flex: 3 }}>
                {/* input data ->*/}
                <View style={styles.infoContainer}>
                  <TextInput
                    style={styles.info}
                    onChangeText={(text) => {
                      setProtectorJoinForm({
                        ...protectorJoinForm,
                        protectorId: text,
                      });
                    }}></TextInput>
                </View>
                <View style={styles.infoContainer}>
                  <TextInput
                    style={styles.info}
                    onChangeText={(text) => {
                      setProtectorJoinForm({
                        ...protectorJoinForm,
                        protectorPw: text,
                      });
                    }}></TextInput>
                </View>
                {/* <View style={styles.infoContainer}>
                  <TextInput
                    style={styles.info}
                    onChangeText={(text) => {
                      setProtectorJoinForm({ ...protectorJoinForm, protectorPwd2: text });
                    }}></TextInput>
                </View> */}
                <View style={styles.infoContainer}>
                  <TextInput
                    style={styles.info}
                    placeholder="홍길동"
                    onChangeText={(text) => {
                      setProtectorJoinForm({
                        ...protectorJoinForm,
                        protectorName: text,
                      });
                    }}></TextInput>
                </View>
                <View style={styles.infoContainer}>
                  <TextInput
                    style={styles.info}
                    maxLength="11"
                    keyboardType="numeric"
                    placeholder="1900.01.01"
                    onChangeText={(text) => {
                      setProtectorJoinForm({
                        ...protectorJoinForm,
                        protectorBirth: text,
                      });
                    }}></TextInput>
                </View>
                <View style={styles.infoContainer}>
                  <TextInput
                    style={styles.info}
                    onChangeText={(text) => {
                      setProtectorJoinForm({
                        ...protectorJoinForm,
                        protectorAddr: text,
                      });
                    }}></TextInput>
                </View>
                <View style={styles.infoContainer}>
                  <TextInput
                    style={styles.info}
                    maxLength="11"
                    keyboardType="numeric"
                    placeholder="01012345678"
                    onChangeText={(text) => {
                      setProtectorJoinForm({
                        ...protectorJoinForm,
                        protectorPhone: text,
                      });
                    }}></TextInput>
                </View>
                <View style={styles.infoContainer}>
                  <TextInput
                    style={styles.info}
                    onChangeText={(text) => {
                      setProtectorJoinForm({
                        ...protectorJoinForm,
                        relationShip: text,
                      });
                    }}></TextInput>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
          <View style={{ height: 100, alignItems: "center" }}>
            <TouchableOpacity
              style={styles.joinButton}
              onPress={() => {
                submit();
                navigation.goBack(null);
              }}>
              <Text style={styles.joinButtonText}>가입</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: "center",
    paddingTop: 60,
    paddingBottom: 10,
  },
  DBTitlecontainer: {
    height: 45,
    marginBottom: 10,
    justifyContent: "center",
  },

  inputContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
  },

  DBtitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#385723",
  },
  title: {
    color: "#385723",
    fontSize: 25,
    fontWeight: "600",
    marginBottom: 40,
  },
  infoContainer: {
    paddingHorizontal: 10,
    height: 45,
    justifyContent: "center",
    marginBottom: 10,
    backgroundColor: "#FBFBFB",
    borderWidth: 0.5,
    borderColor: "#DDDDDD",
    borderRadius: 8,
    width: "100%",
  },
  info: {
    fontSize: 14,
    fontWeight: "400",
    color: "#385723",
  },
  numContainer: {
    height: 45,
    marginBottom: 10,
    flexDirection: "row",
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
  joinButton: {
    marginTop: 15,
    height: 50,
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9CC486",
    borderRadius: 8,
  },
  joinButtonText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#385723",
  },
});
