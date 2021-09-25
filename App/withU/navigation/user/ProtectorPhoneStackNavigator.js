import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import {Text,TouchableOpacity} from 'react-native';
import ProtectorPhonePage from '../../pages/user/ProtectorPhonePage';
import AddProtectorPhonePage from '../../pages/user/AddProtectorPhonePage';

const ProtectorPhoneStack = createStackNavigator();

const ProtectorPhoneStackNavigator = () => {

  return (
    <ProtectorPhoneStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#70AD47",
          borderBottomColor: "black",
          height: 100
        },
        headerTintColor: "#FFFFFF",
        headerBackTitleVisible: false
      }}>
      <ProtectorPhoneStack.Screen name="Protector" component={ProtectorPhonePage}/>
      <ProtectorPhoneStack.Screen name="AddProtector" component={AddProtectorPhonePage}/>
    </ProtectorPhoneStack.Navigator>
  )
}

export default ProtectorPhoneStackNavigator;