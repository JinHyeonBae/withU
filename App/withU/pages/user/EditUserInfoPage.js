import React,{useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';


export default function EditUserInfoPage({navigation}) {
  useEffect(()=>{  
    navigation.setOptions({
      title:'내 정보 편집',
      headerLeft: () => (
        <TouchableOpacity style={{marginLeft:15}} onPress={() => navigation.goBack(null)}>
          <Text style={{fontSize:15, fontWeight:"600", color:"#fff"}}>취소</Text>
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity style={{marginRight:15}}>
          <Text style={{fontSize:15, fontWeight:"600", color:"#fff"}}>저장</Text>
        </TouchableOpacity>
      ),
    })
  },[])

  const infoTitle = ['이름', '성별', '생년월일', '거주지', '전화번호', '보호자 번호', '기저질환', '주 병원', '연결된 기기']
  const infoTitleList = infoTitle.map((title, index) =>
    <View style={styles.titleContainer}>
      <Text key={index} style={styles.title}>{title}</Text>
    </View>)
  
  const userInfo = {
    name: '이브와',
    gender: '여',
    birth: '2021.1.1',
    address: '부산광역시 남구 용소로 45 부경대학교',
    userPhone: '010-1234-1234',
    protectorPhone: '010-5678-5678',
    disease: ['당뇨 ', '고혈압 ', '위염 '],
    hospital: '부산대학병원',
    device: '연결 기기 없음'
  }
  var birthArray = userInfo.birth.split('.');
  var userPhoneArray = userInfo.userPhone.split('-');
  var protectorPhoneArray = userInfo.protectorPhone.split('-');

  return (
    <ScrollView style={{backgroundColor:"#fff"}}>
      <Image style={styles.userImage} source={require('../../assets/defaultUserImage.png')}/>
      <TouchableOpacity style={{marginVertical:20, alignItems: 'center'}}>
        <Text style={{color: '#006600', fontWeight:'600', fontSize:15}}>프로필 사진 변경하기</Text>
      </TouchableOpacity>
      <View style={styles.container}>
        <View style={{flex:2}}>{infoTitleList}</View>
        <View style={{flex:5}}>
          <View style={styles.infoContainer}><TextInput style={styles.info} >{userInfo.name}</TextInput></View>
          <View style={styles.infoContainer}><TextInput style={styles.info} >{userInfo.gender}</TextInput></View>
          <View style={styles.numContainer}>
            <TextInput style={styles.innerNumContainer} keyboardType="numeric">{birthArray[0]}</TextInput>
            <Text style={styles.info}> . </Text>
            <TextInput style={styles.innerNumContainer} keyboardType="numeric">{birthArray[1]}</TextInput>
            <Text style={styles.info}> . </Text>
            <TextInput style={styles.innerNumContainer} keyboardType="numeric">{birthArray[2]}</TextInput>
          </View>
          <View style={styles.infoContainer}><TextInput style={styles.info} multiline={true} >{userInfo.address}</TextInput></View>
          <View style={styles.numContainer}>
            <TextInput style={styles.innerNumContainer} keyboardType="numeric">{userPhoneArray[0]}</TextInput>
            <Text style={styles.info}> - </Text>
            <TextInput style={styles.innerNumContainer} keyboardType="numeric">{userPhoneArray[1]}</TextInput>
            <Text style={styles.info}> - </Text>
            <TextInput style={styles.innerNumContainer} keyboardType="numeric">{userPhoneArray[2]}</TextInput>
          </View>
          <View style={styles.numContainer}>
            <TextInput style={styles.innerNumContainer} keyboardType="numeric" >{protectorPhoneArray[0]}</TextInput>
            <Text style={styles.info}> - </Text>
            <TextInput style={styles.innerNumContainer} keyboardType="numeric">{protectorPhoneArray[1]}</TextInput>
            <Text style={styles.info}> - </Text>
            <TextInput style={styles.innerNumContainer} keyboardType="numeric">{protectorPhoneArray[2]}</TextInput>
          </View>
          <View style={styles.infoContainer}><TextInput style={styles.info} >{userInfo.disease}</TextInput></View>
          <View style={styles.infoContainer}><TextInput style={styles.info} >{userInfo.hospital}</TextInput></View>
          <View style={styles.infoContainer}><TextInput style={styles.info} >{userInfo.device}</TextInput></View>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  userImage: {
    marginTop: 40,
    width: 100,
    height: 100,
    borderWidth: 1.5,
    borderRadius: 50,
    borderColor: "grey",
    alignSelf: 'center',
  },
  container: {
    flex:1,
    flexDirection: 'row',
    marginHorizontal: 25,
  },
  titleContainer: {
    paddingLeft:10,
    height: 50,
    justifyContent:'center',
  },
  title:{
    fontSize: 15,
    fontWeight:'600',
    color:'#595959'
  },
  infoContainer:{
    paddingHorizontal:10,
    height: 45,
    justifyContent:'center',
    marginBottom: 5,
    backgroundColor:'#FBFBFB',
    borderWidth:0.5,
    borderColor:"#DDDDDD",
    borderRadius: 8,
  },
  info:{
    fontSize: 14,
    fontWeight: '400'
  },
  numContainer:{
    height: 46,
    flexDirection: 'row',
    marginBottom: 5,
    alignItems: 'center',
    justifyContent:'space-between'
  },
  innerNumContainer:{
    height: 46,
    width: 65,
    textAlign:'center',
    backgroundColor:'#FBFBFB',
    borderWidth:0.5,
    borderColor:"#DDDDDD",
    borderRadius: 8,
  }
})