import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import UserInfoPage from '../../pages/user/UserInfoPage';
import EditUserInfoPage from '../../pages/user/EditUserInfoPage';
import LoginOptionPage from '../../pages/login/LoginOptionPage';
import LoginStackNavigator from '../LoginStackNavigatior';
import LogoutPage from '../../pages/login/LogoutPage';

const UserInfoStack = createStackNavigator();

const UserInfoStackNavigator = () => {

  return (
    <UserInfoStack.Navigator
      initialRouteName="userInfo"
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
        <UserInfoStack.Screen name="UserInfo" component={UserInfoPage}/>
        <UserInfoStack.Screen name="UserInfoEdit" component={EditUserInfoPage}/>
        <UserInfoStack.Screen name="Logout" component={LogoutPage} />
      </UserInfoStack.Navigator>

  )
}
 
export default UserInfoStackNavigator;