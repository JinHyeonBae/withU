import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Audio } from "expo-av";

export default function RecodePage({ navigation }) {
  useEffect(() => {
    navigation.setOptions(
      {
        title: "말동무",
      },
      []
    );
  });

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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.listContainer}>
        <ScrollView>
          <View style={styles.messegeContainer}>
            <Text>음성 메세지</Text>
            <Text></Text>
          </View>
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
    </SafeAreaView>

    /*
    <View style={styles.container}>
      <TouchableOpacity style={styles.micContainer}>
        <Icon
          name="mic-outline"
          color="#4D4D4D"
          size="100"
          onPress={() => alert("녹음 중")}
        />
      </TouchableOpacity>
      <Text style={styles.micInfo}>마이크 버튼을 누른 후</Text>
      <Text style={styles.micInfo}>사용자에게 전달할 말을 녹음해주세요</Text>
      <Text style={styles.micInfo}> </Text>
    </View>
    */
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
  messegeContainer: {
    borderBottomWidth: 0.7,
    borderColor: "#D3D3D3",
    paddingVertical: 15,
    paddingHorizontal: 5,
    height: 60,
    justifyContent: "center",
  },
  /*
  container: {
    backgroundColor: "#fff",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },

  micButton: {},
  micInfo: {
    alignItems: "center",
    fontSize: 15,
    marginBottom: 5,
  },
  */
});
