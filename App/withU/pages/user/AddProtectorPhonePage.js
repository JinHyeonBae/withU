import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { SwipeListView } from "react-native-swipe-list-view";
import { max } from "react-native-reanimated";

export default function AddProtectorPhonePage({ navigation }) {
  useEffect(() => {
    navigation.setOptions({
      title: "비상 연락처 추가",
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
        <TouchableOpacity
          style={{ marginRight: 15 }}
          onPress={() => navigation.goBack(null)}>
          <Text style={{ fontSize: 15, fontWeight: "600", color: "#fff" }}>
            저장
          </Text>
        </TouchableOpacity>
      ),
    });
  }, []);
  return (
    <View style={styles.container}>
      <Image
        style={styles.protectorOptionImage}
        source={require("../../assets/protectorImage.png")}
      />
      <Text
        style={{
          marginBottom: 25,
          color: "#006600",
          fontWeight: "600",
          fontSize: 15,
        }}>
        보호자 정보
      </Text>
      <View style={styles.rowContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>이름</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input}></TextInput>
        </View>
      </View>
      <View style={styles.rowContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>관계</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input}></TextInput>
        </View>
      </View>
      <View style={styles.rowContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>연락처</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} keyboardType="numeric"></TextInput>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  protectorOptionImage: {
    marginTop: 40,
    marginBottom: 25,
  },
  rowContainer: {
    flexDirection: "row",
    marginVertical: 5,
  },
  titleContainer: {
    flex: 1,
    marginRight: 15,
    paddingLeft: 10,
    height: 50,
    justifyContent: "center",
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
    color: "#595959",
  },
  inputContainer: {
    flex: 5,
    paddingHorizontal: 10,
    height: 45,
    justifyContent: "center",
    marginBottom: 5,
    backgroundColor: "#FBFBFB",
    borderWidth: 0.5,
    borderColor: "#DDDDDD",
    borderRadius: 8,
  },
  input: {
    fontSize: 14,
    fontWeight: "400",
  },
});
