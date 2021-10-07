import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Icon, Alert } from 'react-native';

export default function LoginOptionPage({navigation}) {
  navigation.setOptions({ headerShown: false})

  return (
    <View style={styles.container}> 
      <Text style={styles.title}>버시Ü</Text>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={styles.optionContainer}
          onPress={() => {navigation.navigate('UserLoginPage', { mode: 'User' })}}>
          <Image
            style={styles.userLoginOpionImage}
            source={require('../../assets/userLoginOption.png')}
          />
          <Text style={styles.optionText}>사용자</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.optionContainer}
          onPress={() => {navigation.navigate('ProtectorLoginPage', { mode: 'Protector' })}}>
          <Image
            style={styles.userLoginOpionImage}
            source={require('../../assets/protectorLoginOption.png')}
          />
          <Text style={styles.optionText}>보호자</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.loginExplanation}>로그인 옵션을 선택해주세요</Text>  
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#C5E0B4',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title:{
    color: '#385723',
    fontSize: 25,
    fontWeight: '600'
  },
  optionContainer:{
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    marginHorizontal: 10,
    padding: 5,
    width: 150,
    height: 170,
    backgroundColor:'#fff',
    borderRadius: 20
  },
  optionText:{
    marginTop: 25,
    color: '#385723',
    fontWeight: '700',
    fontSize: 20,
  },
  loginExplanation:{
    color: '#385723',
    fontSize: 15,
    fontWeight: '600',
    marginTop: 60
  }
})