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
  const protectorDBTitle = [
    "아이디",
    "비밀번호",
    "비밀번호\n확인",
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
                  <TextInput style={styles.info}></TextInput>
                </View>
                <View style={styles.infoContainer}>
                  <TextInput style={styles.info}></TextInput>
                </View>
                <View style={styles.infoContainer}>
                  <TextInput style={styles.info}></TextInput>
                </View>
                <View style={styles.infoContainer}>
                  <TextInput style={styles.info}></TextInput>
                </View>
                <View style={styles.numContainer}>
                  <TextInput
                    style={styles.innerNumContainer}
                    keyboardType="numeric"
                    maxLength="4"></TextInput>
                  <Text style={styles.info}> . </Text>
                  <TextInput
                    style={styles.innerNumContainer}
                    keyboardType="numeric"
                    maxLength="2"></TextInput>
                  <Text style={styles.info}> . </Text>
                  <TextInput
                    style={styles.innerNumContainer}
                    keyboardType="numeric"
                    maxLength="2"></TextInput>
                </View>
                <View style={styles.infoContainer}>
                  <TextInput style={styles.info}></TextInput>
                </View>
                <View style={styles.numContainer}>
                  <TextInput
                    style={styles.innerNumContainer}
                    keyboardType="numeric"
                    maxLength="3"></TextInput>
                  <Text style={styles.info}> - </Text>
                  <TextInput
                    style={styles.innerNumContainer}
                    keyboardType="numeric"
                    maxLength="4"></TextInput>
                  <Text style={styles.info}> - </Text>
                  <TextInput
                    style={styles.innerNumContainer}
                    keyboardType="numeric"
                    maxLength="4"></TextInput>
                </View>
                <View style={styles.infoContainer}>
                  <TextInput style={styles.info}></TextInput>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
          <View style={{ height: 100, alignItems: "center" }}>
            <TouchableOpacity style={styles.joinButton}>
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
