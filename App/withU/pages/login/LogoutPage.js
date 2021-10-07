import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput } from 'react-native';

export default function LogoutPage({navigation}) {
  useEffect(()=>{
    setTimeout(()=>{
      navigation.setOptions({ headerShown: false})

     navigation.reset({routes: [{name: 'LoginOptionPage'}]})
      //navigation.navigate('LoginOptionPage')
    })
  },[])
  return (
    <View style={{flex:1, backgroundColor: '#fff'}}></View>
  );
}

const styles = StyleSheet.create({

});