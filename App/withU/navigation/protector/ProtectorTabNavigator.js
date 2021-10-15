import React from "react";
import {
  createBottomTabNavigator,
  createAppContainer,
} from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import HomeStackNavigator from "../HomeStackNavigator";
import VoiceMsgStackNavigator from "./VoiceMsgStackNavigator";
import ProtectorInfoStackNavigator from "./ProtectorInfoStackNavigator";

const ProtectorTab = createBottomTabNavigator();

const ProtectorTabNavigator = () => {
  return (
    <ProtectorTab.Navigator
      initialRouteName="홈"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "홈") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "말동무") {
            iconName = focused ? "happy" : "happy-outline";
          } else if (route.name === "내정보") {
            iconName = focused ? "person" : "person-outline";
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "black",
        inactiveTintColor: "gray",
      }}>
      <ProtectorTab.Screen name="홈" component={HomeStackNavigator} />
      <ProtectorTab.Screen
        name="말동무"
        component={VoiceMsgStackNavigator}
      />
      <ProtectorTab.Screen
        name="내정보"
        component={ProtectorInfoStackNavigator}
      />
    </ProtectorTab.Navigator>
  );
};

export default ProtectorTabNavigator;
