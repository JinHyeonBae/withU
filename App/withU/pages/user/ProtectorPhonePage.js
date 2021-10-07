import React,{useState, useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SwipeListView } from 'react-native-swipe-list-view';

export default function ProtectorPhonePage({navigation}) {
  useEffect(()=>{
    navigation.setOptions({
      title:'비상 연락처',
      headerLeft: () => (
        <TouchableOpacity style={{marginLeft:15}} onPress={() => alert('보호자 편집')}>
          <Text style={{fontSize:15, fontWeight:"600", color:"#fff"}}>편집</Text>
        </TouchableOpacity>
      ),
      headerRight: () => (
        <Icon style={{ marginRight: 15}}
          name="add"
          color="#fff"
          size="23"
          onPress={() => {navigation.navigate('AddProtector')}}
        >
        </Icon>
      ),
    })
  },[])

  const protectorData = [{
    name: '강지현',
    relationship: '자식',
    phone: '010-1111-2222'
    },
    {
      name: '박다봄',
      relationship: '복지사',
      phone: '010-3333-4444'
    },
    {
      name: '배진현',
      relationship: '복지사',
      phone: '010-5555-6666'
    },
  ]

  return (
  <ScrollView style={styles.scrollContainer}>
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <View style={styles.name_Rel_Container}><Text style={styles.title}>이름</Text></View>
        <View style={styles.name_Rel_Container}><Text style={styles.title}>관계</Text></View>
        <View style={styles.phoneContainer}><Text style={styles.title}>연락처</Text></View>
      </View>

      {protectorData.map((list, index) =>
        <TouchableOpacity style={styles.listContainer} >
          <View style={styles.name_Rel_Container}><Text key={index} style={{fontSize: 15}}>{list.name}</Text></View>
          <View style={styles.name_Rel_Container}><Text key={index} style={{fontSize: 15}}>{list.relationship}</Text></View>
          <View style={styles.phoneContainer}><Text key={index} style={{fontSize: 15}}>{list.phone}</Text></View>
        </TouchableOpacity>)
      }
    </View>
  </ScrollView>
);
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingTop: 30,
    paddingHorizontal: 20,
    backgroundColor:"#fff",
  },
  container:{
    width: '100%',
  },
  titleContainer:{
    flexDirection: 'row',
    borderBottomWidth: 1.5,
    borderBottomColor: '#DDDDDD',
  },
  listContainer:{
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
  },
  name_Rel_Container:{
    flex:1,
    padding: 18,
  },
  phoneContainer:{
    flex:2,
    padding: 18,
  },
  title:{
    color:'#969696',
    fontWeight: '700',
    fontSize: 15
  },

});