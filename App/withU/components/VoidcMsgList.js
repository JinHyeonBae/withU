import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  SafeAreaView,
  TouchableHighlight,
  Animated,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Audio } from "expo-av";
import { SwipeListView } from "react-native-swipe-list-view";

export default function VoiceMsgList({ content }) {
  // 스와이프로 목록 삭제
  const [listData, setListData] = useState(
    Array(listData)
      .fill("")
      .map((listData, i) => ({ key: `${i}`, title: `${listData.msgTitle}` }))
  );
  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    const newData = [...listData];
    const prevIndex = listData.findIndex((item) => item.key === rowKey);
    newData.splice(prevIndex, 1);
    setListData(newData);
  };

  const renderItem = (data) => (
    <TouchableHighlight
      onPress={() => console.log("You touched me")}
      style={styles.rowFront}
      underlayColor="#EEEEEE">
      <View>
        <Text>{data.item.title}</Text>
      </View>
    </TouchableHighlight>
  );

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={styles.backDeleteButton}
        onPress={() => deleteRow(rowMap, data.key)}>
        <Icon name="trash" color="#fff" size="30" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View>
      <SwipeListView
        data={listData}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-80}
        disableRightSwipe={true}
      />
      {/* <Text>{listData.msgTitle}</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 4,
    paddingHorizontal: 10,
  },
  recodeContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#D3D3D3",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: "#f1f1f1",
  },
  rowFront: {
    justifyContent: "center",
    backgroundColor: "#fff",
    borderBottomWidth: 0.7,
    borderColor: "#D3D3D3",
    paddingVertical: 15,
    paddingHorizontal: 5,
    height: 70,
  },
  rowBack: {
    flex: 1,
    borderBottomWidth: 0.7,
    borderColor: "#D3D3D3",
    height: 70,
  },

  backDeleteButton: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    width: 80,
    height: "100%",
    backgroundColor: "#FF3300",
    right: 0,
  },
});
