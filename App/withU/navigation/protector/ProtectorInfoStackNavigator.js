import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProtectorInfoPage from '../../pages/protector/ProtectorInfoPage';
import LogoutPage from '../../pages/login/LogoutPage';
import EditProtectorInfoPage from '../../pages/protector/EditProtectorInfoPage';

const ProtectorInfoStack = createStackNavigator();

const ProtectorInfoStackNavigator = () => {
  return (
    <ProtectorInfoStack.Navigator
      initialRouteName="protectorInfo"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#70AD47",
            borderBottomColor: "black",
            height:100,
          },
          headerTintColor: "#FFFFFF",
          headerBackTitleVisible: false,
          headerTitleStyle:{
            fontSize: 18,
            fontWeight:"700"
          }
        }}
        >
        <ProtectorInfoStack.Screen name="ProtectorInfo" component={ProtectorInfoPage}/>
        <ProtectorInfoStack.Screen name="EditProtectorInfo" component={EditProtectorInfoPage}/>
        <ProtectorInfoStack.Screen name="Logout" component={LogoutPage}/>
      </ProtectorInfoStack.Navigator>

  )
}

export default ProtectorInfoStackNavigator;