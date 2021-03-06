import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { createStackNavigator } from "@react-navigation/stack";
import UserTabNavigator from "./navigation/user/UserTabNavigator";
import ProtectorTabNavigator from "./navigation/protector/ProtectorTabNavigator";
import LoginOptionPage from "./pages/login/LoginOptionPage";
import LoginPage from "./pages/login/LoginPage";
import UserJoinPage from "./pages/login/UserJoinPage";
import ProtectorJoinPage from "./pages/login/ProtectorJoinPage";

//import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';//

const Login = createStackNavigator();

export default function App() {
  console.disableYellowBox = true;

  return (
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
        <Login.Screen name="UserJoinPage" component={UserJoinPage} />
        <Login.Screen name="ProtectorJoinPage" component={ProtectorJoinPage} />
      </Login.Navigator>
    </NavigationContainer>
  );
}
