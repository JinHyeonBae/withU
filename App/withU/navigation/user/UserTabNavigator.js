import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeStackNavigator from '../HomeStackNavigator';
import ProtectorPhoneStackNavigator from './ProtectorPhoneStackNavigator';
import AlarmStackNavigator from './AlarmStackNavigator';
import UserInfoStackNavigator from './UserInfoStackNavigator';

const UserTab = createBottomTabNavigator();

const UserTabNavigator = () => {
  return (
    <UserTab.Navigator
      initialRouteName="홈"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === '홈') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === '연락망') {
            iconName = focused ? 'call' : 'call-outline';
          } else if (route.name === '알람') {
            iconName = focused ? 'alarm' : 'alarm-outline';
          } else if (route.name === '내정보') {
            iconName = focused ? 'person' : 'person-outline';
          }
          
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'black',
        inactiveTintColor: 'gray',
      }}
      
    >
      <UserTab.Screen name="홈" component={HomeStackNavigator} />
      <UserTab.Screen name="연락망" component={ProtectorPhoneStackNavigator} />
      <UserTab.Screen name="알람" component={AlarmStackNavigator} />
      <UserTab.Screen name="내정보" component={UserInfoStackNavigator} />

    </UserTab.Navigator>
  )
}

export default UserTabNavigator;