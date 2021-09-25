import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {Text,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AlarmPage from '../../pages/user/AlarmPage';
import AddAlarmPage from '../../pages/user/AddAlarmPage';

const AlarmStack = createStackNavigator();

const AlarmStackNavigator = () =>{

    return (
      <AlarmStack.Navigator
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
        <AlarmStack.Screen name="알람" component={AlarmPage}/>
        <AlarmStack.Screen name="알람 추가" component={AddAlarmPage}/>
      </AlarmStack.Navigator>
    )
}

export default AlarmStackNavigator;