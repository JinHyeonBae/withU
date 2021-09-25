import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from '../pages/HomePage';

const HomeStack = createStackNavigator();

const HomeStackNavigator = ({navigation}) =>{
  navigation.setOptions({ tabBarVisible: true});

    return (
      <HomeStack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#70AD47",
            borderBottomColor: "black",
            height:100
          },
          headerTintColor: "#FFFFFF",
          headerBackTitleVisible: false
        }}>
        <HomeStack.Screen name="실내 정보" component={HomePage}/>
      </HomeStack.Navigator>
    )
}

export default HomeStackNavigator;