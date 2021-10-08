import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import VoiceMsgPage from "../../pages/protector/VoiceMsgPage";

const VoiceMsgStack = createStackNavigator();

const VoiceMsgStackNavigator = () => {
  return (
    <VoiceMsgStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#70AD47",
          borderBottomColor: "black",
          height: 100,
        },
        headerTintColor: "#FFFFFF",
        headerBackTitleVisible: false,
      }}>
      <VoiceMsgStack.Screen name="VoiceMsgPage" component={VoiceMsgPage} />
    </VoiceMsgStack.Navigator>
  );
};

export default VoiceMsgStackNavigator;
