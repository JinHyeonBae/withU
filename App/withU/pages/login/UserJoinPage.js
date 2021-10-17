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
import Icon from "react-native-vector-icons/Ionicons";

export default function UserJoinPage({ navigation, route }) {
  // text input
  const [userJoinForm, setUserJoinForm] = useState({
    userId: "",
    userPw: "",
    userName: "",
    userGender: "",
    userBirth: "",
    userAddr: "",
    userPhone: "",
    userDis: "",
    userHospital: "",
    userType: "User",
  });

  const [registerState, setRegisterState] = useState({
    message: "",
  });
  const [isJoinSuccess, setIsJoinSuccess] = useState(false); // 회원 가입 성공 여부

  // 로그인 오류 메시지 출력
  const [errortext, setErrortext] = useState(null);
  const submit = () => {
    console.log("submit");
    //localhost로 접속 시 network failed가 일어나서 ngrok으로 임시 설정
    // https 시 network request failed
    const url = "http://3.36.136.26:4000/signUp";

    const result = fetch(url, {
      method: "POST",
      body: JSON.stringify(userJoinForm),
      headers: {
        "Content-Type": "application/json",
      },
    });

    result
      .then((res) => res.json())
      .then((res) => {
        console.log("서버로부터의 답변 :", res.message);
        console.log(res);
        setRegisterState(res.message);
        if (res.status === 200) {
          setIsJoinSuccess(true);
          console.log("회원 가입 성공. 로그인 필요.");
        } else {
          setErrortext("모든 항목을 작성해주세요");
        }
      })
      .catch((error) => {
        console.log(error);
        console.log("페치 작업에 문제가 발생했습니다, POST : " + error.message);
        throw error;
      });
  };

  const userDBTitle = [
    "아이디",
    "비밀번호",
    "이름",
    "성별",
    "생년월일",
    "주소",
    "전화번호",
    "질병",
    "주병원",
  ];

  const userDBTitleList = userDBTitle.map((title, index) => (
    <View style={styles.DBTitlecontainer}>
      <Text key={index} style={styles.DBtitle}>
        {title}
      </Text>
    </View>
  ));

  // 회원 가입 성공 화면
  if (isJoinSuccess) {
    return (
      <SafeAreaView style={styles.successContainer}>
        <View>
          <Icon
            name="checkmark-circle-outline"
            style={styles.successIcon}></Icon>
        </View>
        <View>
          <Text style={{ color: "#385723", fontSize: 20, fontWeight: "500" }}>
            회원가입이 완료되었습니다
          </Text>
        </View>
        <View style={{ width: "100%", alignItems: "center", marginTop: 40 }}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => {
              submit();
              navigation.goBack(null);
            }}>
            <Text style={styles.loginButtonText}>로그인하기</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
  // 회원가입 기본 화면
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#E1EADE" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <ScrollView>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>사용자 회원가입</Text>
            {errortext !== null ? (
              <Text style={{ color: "red", fontWeight: "500" }}>
                {"* " + errortext}
              </Text>
            ) : null}
          </View>

          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inputContainer}>
              <View style={{ flex: 1 }}>{userDBTitleList}</View>
              <View style={{ flex: 3 }}>
                {/* input data ->*/}
                <View style={styles.infoContainer}>
                  <TextInput
                    style={styles.info}
                    placeholder="ID"
                    keyboardType="ascii-capable"
                    onChangeText={(text) => {
                      setUserJoinForm({ ...userJoinForm, userId: text });
                    }}></TextInput>
                </View>
                <View style={styles.infoContainer}>
                  <TextInput
                    style={styles.info}
                    placeholder="Password"
                    keyboardType="ascii-capable"
                    secureTextEntry={true}
                    onChangeText={(text) => {
                      setUserJoinForm({ ...userJoinForm, userPw: text });
                    }}></TextInput>
                </View>
                {/* <View style={styles.infoContainer}>
                  <TextInput
                    style={styles.info}
                    onChangeText={(text) => {
                      setUserJoinForm({ ...userJoinForm, userPwd2: text });
                    }}></TextInput>
                </View> */}
                <View style={styles.infoContainer}>
                  <TextInput
                    style={styles.info}
                    placeholder="홍길동"
                    onChangeText={(text) => {
                      setUserJoinForm({ ...userJoinForm, userName: text });
                    }}></TextInput>
                </View>
                <View style={styles.infoContainer}>
                  <TextInput
                    style={styles.info}
                    placeholder="남 / 여"
                    onChangeText={(text) => {
                      setUserJoinForm({ ...userJoinForm, userGender: text });
                    }}></TextInput>
                </View>
                <View style={styles.infoContainer}>
                  <TextInput
                    style={styles.info}
                    maxLength="11"
                    keyboardType="numbers-and-punctuation"
                    placeholder="1900.01.01"
                    onChangeText={(text) => {
                      setUserJoinForm({ ...userJoinForm, userBirth: text });
                    }}></TextInput>
                </View>
                <View style={styles.infoContainer}>
                  <TextInput
                    style={styles.info}
                    placeholder="주소"
                    onChangeText={(text) => {
                      setUserJoinForm({ ...userJoinForm, userAddr: text });
                    }}></TextInput>
                </View>
                <View style={styles.infoContainer}>
                  <TextInput
                    style={styles.info}
                    maxLength="13"
                    keyboardType="numbers-and-punctuation"
                    placeholder="010-1234-5678"
                    onChangeText={(text) => {
                      setUserJoinForm({ ...userJoinForm, userPhone: text });
                    }}></TextInput>
                </View>

                <View style={styles.infoContainer}>
                  <TextInput
                    style={styles.info}
                    placeholder="질병"
                    onChangeText={(text) => {
                      setUserJoinForm({ ...userJoinForm, userDisease: text });
                    }}></TextInput>
                </View>
                <View style={styles.infoContainer}>
                  <TextInput
                    style={styles.info}
                    placeholder="다니는 병원명"
                    onChangeText={(text) => {
                      setUserJoinForm({ ...userJoinForm, userHospital: text });
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
              }}>
              <Text style={styles.joinButtonText}>가입하기</Text>
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
    paddingTop: 50,
    paddingBottom: 20,
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
    marginBottom: 25,
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
    fontSize: 18,
    fontWeight: "500",
    color: "#fff",
  },

  successContainer: {
    flex: 1,
    backgroundColor: "#E1EADE",
    justifyContent: "center",
    alignItems: "center",
  },
  successIcon: {
    fontSize: 130,
    color: "#548235",
  },
  loginButton: {
    width: "80%",
    height: 50,
    backgroundColor: "#548235",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "500",
  },
});
