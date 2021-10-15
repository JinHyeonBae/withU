import React, { useState } from "react";
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
} from "react-native";

import { SwipeListView } from "react-native-swipe-list-view";

const rowSwipeAnimatedValues = {};
Array(5)
  .fill("")
  .forEach((_, i) => {
    rowSwipeAnimatedValues[`${i}`] = new Animated.Value(0);
  });

export default function SwipeValueBasedUi() {
  const [listData, setListData] = useState(
    Array(20)
      .fill("")
      .map((_, i) => ({ key: `${i}`, text: `${i}` }))
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

  const onSwipeValueChange = (swipeData) => {
    const { key, value } = swipeData;
    rowSwipeAnimatedValues[key].setValue(Math.abs(value));
  };

  const renderItem = (data) => (
    <TouchableHighlight
      onPress={() => console.log("You touched me")}
      style={styles.rowFront}
      underlayColor="#EEEEEE">
      <View>
        <Text>음성 메시지 {data.item.text}</Text>
      </View>
    </TouchableHighlight>
  );

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={styles.backDeleteButton}
        onPress={() => deleteRow(rowMap, data.item.key)}></TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <SwipeListView
        data={listData}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-100}
        onSwipeValueChange={onSwipeValueChange}
        disableRightSwipe={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
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
    width: 100,
    height: "100%",
    backgroundColor: "red",
    right: 0,
  },
});
