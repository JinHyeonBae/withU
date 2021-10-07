import React,{useState, useEffect} from 'react';
import { SafeAreaView, StyleSheet, Text, View, ScrollView, TouchableOpacity, Platform, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function AddAlarmPage({props, navigation}) {
  useEffect(()=>{
    setTimeout(()=>{
        navigation.setOptions({
          title:'알람 추가',
          headerLeft: () => (
            <TouchableOpacity style={{marginLeft:10}} onPress={() => navigation.goBack(null)}>
              <Text style={{fontSize:15, fontWeight:"600", color:"#fff"}}>취소</Text>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity style={{marginRight:10}}>
              <Text style={{fontSize:15, fontWeight:"600", color:"#fff"}}>저장</Text>
            </TouchableOpacity>
          ),
        })
    },100)
  },[])

  const days = ['일', '월', '화', '수', '목', '금', '토'];
  const dayList = days.map((day, index) => (
    <TouchableOpacity onPress={()=> alert("요일 선택")}>
      <Text key={index} style={{fontSize: 15, color: "#808080"}}>{day}</Text>
    </TouchableOpacity>
  ));
  
  const [date, setDate] = useState(new Date(1598051730000));
  const [show, setShow] = useState(true);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };
  
  const [memo, setMemo] = React.useState(null);

  return(
    //<ScrollView style={styles.container}>
      <KeyboardAwareScrollView
        style={styles.container}
        resetScrollToCoords={{ x: 0, y: 0 }} 
        scrollEnabled={true}
        enableAutomaticScroll={true}
        >
      <View style={styles.timeContainer}>
        <Text style={styles.titleText}>시간</Text>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={new Date()}
            mode="time"
            is24Hour={true}
            display="spinner"
            onChange={onChange}
          />
        )}
      </View>
      <View style={styles.dayLabelContainer}>
        <Text style={styles.titleText}>요일 반복</Text>
        <View style={styles.selectDay}>{dayList}</View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.titleText}>메모</Text>
        <TextInput
          style={styles.input}
          onChangeText={setMemo}
          value={memo}
          placeholder="메모"
          keyboardType="default"
          placeholderTextColor="#808080"
        />
      </View>
      </KeyboardAwareScrollView>
    //</ScrollView>
  )
}

const styles = StyleSheet.create({ 

  container:{ 
    backgroundColor: "#fff",
    paddingHorizontal: 25,
  },
  timeContainer:{
    marginVertical:20,
    borderBottomColor:'#DDDDDD',
    borderBottomWidth:1
  },
  dayLabelContainer:{
    paddingBottom:40,
    borderBottomColor:'#DDDDDD',
    borderBottomWidth:1
  },
  inputContainer:{
    marginTop:20,
    borderBottomColor:'#DDDDDD',
    borderBottomWidth:1
  },
  selectDay:{
    flexDirection: 'row',
    justifyContent:'space-between'
  },
  titleText:{
    fontSize: 17,
    fontWeight: "600",
    marginVertical:20
  },
  input: {
    height: 40
  },
});