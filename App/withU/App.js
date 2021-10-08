import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import UserTabNavigator from "./navigation/user/UserTabNavigator";
import { StatusBar } from "expo-status-bar";
import { createStackNavigator } from "@react-navigation/stack";
import LoginOptionPage from "./pages/login/LoginOptionPage";
import LoginPage from "./pages/login/LoginPage";
import ProtectorTabNavigator from "./navigation/protector/ProtectorTabNavigator";
import SwipeValueBasedUi from "./pages/SwipeValueBasedUi";
const Login = createStackNavigator();

export default function App() {
  console.disableYellowBox = true;

  return (
    //<SwipeValueBasedUi />
    <NavigationContainer>
      <StatusBar style="#black" />
      <Login.Navigator
        initialRouteName="LoginOptionPage"
        screenOptions={{
          headerShown: false,
        }}>
        <Login.Screen name="LoginOptionPage" component={LoginOptionPage} />
        <Login.Screen name="UserLoginPage" component={LoginPage} />
        <Login.Screen name="ProtectorLoginPage" component={LoginPage} />
        <Login.Screen name="UserMode" component={UserTabNavigator} />
        <Login.Screen name="ProtectorMode" component={ProtectorTabNavigator} />
      </Login.Navigator>
    </NavigationContainer>
  );
}
