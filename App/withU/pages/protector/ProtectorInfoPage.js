import React,{useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function UserInfoPage({navigation}) {
  const creatLogoutAlert = () =>
  Alert.alert(
    "로그아웃 하시겠습니까?",
    " ",
    [
      {
        text: "취소",
        onPress: () => null,
        style: "cancel"
      },
      { text: "확인", onPress: () => {navigation.reset({routes: [{name: "Logout"}]})}}
    ]

  );

useEffect(()=>{
  setTimeout(()=>{
      navigation.setOptions({
        title:'내 정보',
        headerLeft: () => (
          <TouchableOpacity style={{marginLeft:15}} onPress={() => {navigation.navigate('EditProtectorInfo')}}>
            <Text style={{fontSize:15, fontWeight:"600", color:"#fff"}}>편집</Text>
          </TouchableOpacity>
        ),
        headerRight: () => (
          <Icon style={{ marginRight: 15}}
            name="log-out-outline"
            color="#fff"
            size="23"
            onPress={creatLogoutAlert}
          >
          </Icon>
        ),
      })
  },)
},[])


  const infoTitle = ['이름', '성별', '생년월일', '거주지', '전화번호', '사용자ID', '사용자와의\n관계']
  const infoTitleList = infoTitle.map((title, index) =>
    <View style={styles.titleContainer}>
      <Text key={index} style={styles.title}>{title}</Text>
    </View>)
  
  const userInfo = {
    name: '한이음',
    gender: '여',
    birth: '2021.1.1',
    address: '부산광역시 남구 용소로 45 부경대학교',
    phone: '010-1111-2222',
    userId:'xxxx',
    relationship: '자식'
  }

  return (
    <ScrollView style={{backgroundColor:"#fff"}}>
      <Image style={styles.userImage} source={require('../../assets/defaultUserImage.png')}/>
      <View style={styles.container}>
        <View style={{flex:2}}>{infoTitleList}</View>
        <View style={{flex:5}}>
          <View style={styles.infoContainer}><Text style={styles.info} >{userInfo.name}</Text></View>
          <View style={styles.infoContainer}><Text style={styles.info} >{userInfo.gender}</Text></View>
          <View style={styles.infoContainer}><Text style={styles.info} >{userInfo.birth}</Text></View>
          <View style={styles.infoContainer}><Text style={styles.info} >{userInfo.address}</Text></View>
          <View style={styles.infoContainer}><Text style={styles.info} >{userInfo.phone}</Text></View>
          <View style={styles.infoContainer}><Text style={styles.info} >{userInfo.userId}</Text></View>
          <View style={styles.infoContainer}><Text style={styles.info} >{userInfo.relationship}</Text></View>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  userImage: {
    marginVertical: 40,
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
    height: 50,
    justifyContent:'center',
    borderBottomWidth:1,
    borderBottomColor: '#DDDDDD'
  },
  info:{
    fontSize: 14,
    fontWeight: '400'
  }
})