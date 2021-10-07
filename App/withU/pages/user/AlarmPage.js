import React,{useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';
import { Switch } from 'react-native-paper';
import SwitchToggle from "react-native-switch-toggle";
import Icon from 'react-native-vector-icons/Ionicons';

export default function AlarmPage({navigation,route}) {
  useEffect(()=>{
    setTimeout(()=>{
        navigation.setOptions({
          title:'알람',
          headerLeft: () => (
            <TouchableOpacity style={{marginLeft:15}} onPress={() => alert('편집')}>
              <Text style={{fontSize:15, fontWeight:"600", color:"#fff"}}>편집</Text>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <Icon style={{marginRight:10}}
              name="add"
              color="#fff"
              size="25"
              onPress={() => {navigation.navigate('알람 추가')}}
            /> 
          ),
        })
    },100)
  },[])


  const alarmInfo=[{
    hour: 10,
    min: '00',
    memo: '혈압약',
    activation: true
  },
  {
    hour: '16',
    min: '30',
    memo: '비타민',
    activation: false
  }]

  const [isSwitch, setIsSwitch] = useState(false);
  const isSwitchChange = () => setIsSwitch(!isSwitch);

  const alarmList = alarmInfo.map((alarm, index) =>
    <View style={styles.alarmContainer}>
      <View>
        <Text style={styles.alarmTime}>{alarm.hour + ':' + alarm.min}</Text>
        <Text style={styles.alarmMemo}>{alarm.memo}</Text>
      </View>
      <View>
        <SwitchToggle
          switchOn={alarm.activation} // state반영해야함
          onPress={isSwitchChange}
          circleColorOff='white'
          backgroundColorOn='#70AD47'
          backgroundColorOff='#C4C4C4'
          containerStyle={styles.switchContainer}
          circleStyle={styles.switchCircle}
        />
      </View>
    </View>

  )

  return (
    <ScrollView style={styles.container}>
        {alarmList}
    </ScrollView>
    
  );
}

const styles = StyleSheet.create({
  container:{
    paddingTop: 30,
    paddingHorizontal: 20,
    backgroundColor:"#fff"
  },
  alarmContainer:{
    flexDirection: 'row',
    width:'100%',
    height: 100,
    marginTop: 10,
    padding:10,
    alignItems:'center',
    justifyContent:'space-between',
    borderBottomColor:'#DDDDDD',
    borderBottomWidth:1
  },
  alarmTime:{
    fontSize: 40,
  },
  alarmMemo:{
    fontSize: 20,
  },
  switchContainer:{
    width: 80,
    height: 40,
    borderRadius: 25,
    padding: 5,
  },
  switchCircle:{
    width: 33,
    height: 33,
    borderRadius: 20,
  }
})