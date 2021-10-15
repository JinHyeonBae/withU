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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title} 로그인</Text>
      <TextInput style={styles.loginContainer} placeholder="ID" />
      <TextInput
        style={styles.loginContainer}
        placeholder="password"
        secureTextEntry={true}
      />
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => {
          navigation.reset({ routes: [{ name: route.params.mode + "Mode" }] });
        }}>
        <Text style={{ color: "#fff", fontSize: 18, fontWeight: "700" }}>
          로그인
        </Text>
      </TouchableOpacity>

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
