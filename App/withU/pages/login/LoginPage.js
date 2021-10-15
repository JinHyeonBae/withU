import { NavigationRouteContext } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";

export default function LoginPage({ navigation, route }) {
  const title = route.params.mode === "User" ? "사용자" : "보호자";

  const [loginForm, setLoginForm] = useState({
    userId: "",
    userPw: "",
    userType: route.params.mode,
  });
  const [registerState, setRegisterState] = useState({
    message: "",
    status: 0,
  });
  const [isJoinSuccess, setIsJoinSuccess] = useState(false);
  const [errortext, setErrortext] = useState(null);
  const submit = () => {
    console.log("submit");
    //localhost로 접속 시 network failed가 일어나서 ngrok으로 임시 설정
    // https 시 network request failed
    const url = "http://3.36.136.26:4000/login";

    const result = fetch(url, {
      method: "POST",
      body: JSON.stringify(loginForm),
      headers: {
        "Content-Type": "application/json",
      },
    });

    result
      .then((res) => res.json())
      .then((res) => {
        console.log("서버로부터의 답변 :", res.message);
        setRegisterState({ ...registerState, message: res.message });
        setRegisterState({ ...registerState, status: res.status });
        console.log(registerState);
        if (res.status === 200) {
          navigation.reset({
            routes: [{ name: route.params.mode + "Mode" }],
          });
        } else {
          setErrortext("아이디와 비밀번호를 다시 확인해주세요");
        }
      })
      .catch((error) => {
        console.log(error);
        console.log("페치 작업에 문제가 발생했습니다, POST : " + error.message);
        throw error;
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title} 로그인</Text>
      <TextInput
        style={styles.loginContainer}
        placeholder="ID"
        onChangeText={(text) => {
          setLoginForm({ ...loginForm, userId: text });
        }}
      />
      <TextInput
        style={styles.loginContainer}
        placeholder="password"
        secureTextEntry={true}
        onChangeText={(text) => {
          setLoginForm({ ...loginForm, userPw: text });
        }}
      />
      {/* 오류 메시지 출력 */}
      {errortext !== null ? (
        <View style={{ width: "75%", paddingLeft: 10 }}>
          <Text style={{ color: "red", marginBottom: 5 }}>
            {"* " + errortext}
          </Text>
        </View>
      ) : null}

      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => {
          submit();
        }}>
        <Text style={{ color: "#fff", fontSize: 18, fontWeight: "700" }}>
          로그인
        </Text>
      </TouchableOpacity>

      {/*onPress={() => {navigation.navigate('JoinPage')}*/}
      <TouchableOpacity
        style={{ marginTop: 15 }}
        onPress={() => {
          navigation.navigate({ name: route.params.mode + "JoinPage" });
        }}>
        <Text style={{ color: "#385723", fontSize: 16, fontWeight: "600" }}>
          회원가입
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C5E0B4",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#385723",
    fontSize: 25,
    fontWeight: "600",
    marginBottom: 40,
  },
  loginContainer: {
    justifyContent: "center",
    marginBottom: 8,
    paddingHorizontal: 15,
    width: "75%",
    height: 45,
    backgroundColor: "#fff",
    borderRadius: 10,
    fontSize: 18,
  },
  loginButton: {
    height: 45,
    width: "75%",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9CCA7C",
  },
  loginExplanation: {
    color: "#385723",
    fontSize: 15,
    fontWeight: "600",
    marginTop: 60,
  },
});
