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
import UserJoinPage from "./UserJoinPage";

export default function LoginPage({ navigation, route }) {
  const title = route.params.mode === "User" ? "사용자" : "보호자";

  const [loginForm, setLoginForm] = useState({
    userId: "",
    userPw: "",
    userType: route.params.mode,
  });
  const [registerState, setRegisterState] = useState({
    message: "",
  });

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
        setRegisterState(res.message);
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
      <TextInput style={styles.loginContainer} placeholder="ID" />
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
      <TouchableOpacity style={{ marginTop: 15 }}>
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
    width: 280,
    height: 45,
    backgroundColor: "#fff",
    borderRadius: 10,
    fontSize: 18,
  },
  loginButton: {
    height: 45,
    width: 280,
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
