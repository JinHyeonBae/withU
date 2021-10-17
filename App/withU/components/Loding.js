import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function Loading() {
  return (
    <View style={styles.container}>
      <Icon name="sync-outline" style={styles.icon}></Icon>
      <Text style={styles.title}>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    //앱의 배경 색
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",

    color: "#D3D3D3",
  },
  icon: {
    fontSize: 50,
    color: "#D3D3D3",
  },
});
