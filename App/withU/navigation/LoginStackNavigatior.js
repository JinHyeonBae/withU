import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import UserTabNavigator from "./user/UserTabNavigator";
import ProtectorTabNavigator from "./protector/ProtectorTabNavigator";
import LoginOptionPage from "../pages/login/LoginOptionPage";
import LoginPage from "../pages/login/LoginPage";
import UserJoinPage from "../pages/login/UserJoinPage";
import ProtectorJoinPage from "../pages/login/ProtectorJoinPage";

const LoginStack = createStackNavigator();

const LoginStackNavigator = () => {
  return (
    <LoginStack.Navigator
      initialRouteName="LoginOptionPage"
      screenOptions={{
        headerShown: false,
      }}>
      <LoginStack.Screen name="LoginOptionPage" component={LoginOptionPage} />
      <LoginStack.Screen name="UserLoginPage" component={LoginPage} />
      <LoginStack.Screen name="UserMode" component={UserTabNavigator} />
      <LoginStack.Screen name="ProtectorLoginPage" component={LoginPage} />
      <LoginStack.Screen
        name="ProtectorMode"
        component={ProtectorTabNavigator}
      />
      <LoginStack.Screen name="UserJoinPage" component={UserJoinPage} />
      <LoginStack.Screen
        name="ProtectorJoinPage"
        component={ProtectorJoinPage}
      />
    </LoginStack.Navigator>
  );
};

export default LoginStackNavigator;
