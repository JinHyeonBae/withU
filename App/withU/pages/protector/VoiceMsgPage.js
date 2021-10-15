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
import VoiceMsgList from "../../components/VoidcMsgList";

// const rowSwipeAnimatedValues = {};
// Array(5)
//   .fill("")
//   .forEach((_, i) => {
//     rowSwipeAnimatedValues[`${i}`] = new Animated.Value(0);
//   });

export default function VoiceMsgPage({ navigation }) {
  useEffect(() => {
    navigation.setOptions(
      {
        title: "말동무",
      },
      []
    );
  });

  // 재생
  const [sound, setSound] = React.useState();

  async function playSound() {
    const { sound } = await Audio.Sound
      .createAsync
      //require("./assets/Hello.mp3")
      ();
    setSound(sound);

    await sound.playAsync();
  }

  React.useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const [recording, setRecording] = React.useState();
  // 녹음 시작
  async function startRecording() {
    await Audio.requestPermissionsAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });
    const { recording } = await Audio.Recording.createAsync(
      Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
    );
    setRecording(recording);
  }
  // 녹음 중지
  async function stopRecording() {
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
  }

  // 임시 데이터
  const voiceMsgData = [
    { msgTitle: "음성 메세지 1" },
    { msgTitle: "음성 메세지 2" },
    { msgTitle: "음성 메세지 3" },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.listContainer}>
        <ScrollView>
          {voiceMsgData.map((content, i) => {
            return <VoiceMsgList content={content} key={i} />;
          })}
        </ScrollView>
      </View>
      <View style={styles.recodeContainer}>
        <TouchableOpacity>
          <Icon
            name={recording ? "stop-circle" : "mic-circle"}
            color="#9c9d9b"
            size="80"
            onPress={recording ? stopRecording : startRecording}
          />
        </TouchableOpacity>
      </View>
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
