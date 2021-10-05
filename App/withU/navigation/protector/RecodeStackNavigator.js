import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import RecodePage from "../../pages/protector/RecodePage";

const RecodeStack = createStackNavigator();

const RecodeStackNavigator = () => {
  return (
    <RecodeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#70AD47",
          borderBottomColor: "black",
          height: 100,
        },
        headerTintColor: "#FFFFFF",
        headerBackTitleVisible: false,
      }}>
      <RecodeStack.Screen name="RecodePage" component={RecodePage} />
    </RecodeStack.Navigator>
  );
};

export default RecodeStackNavigator;
