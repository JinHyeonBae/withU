import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';

export default function EditProtectorPhonePage() {
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
  const protectorList = [{
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
      {protectorList.map((list, index) =>
        <View style={styles.listContainer}>
          <View style={styles.name_Rel_Container}><Text key={index} style={{fontSize: 15}}>{list.name}</Text></View>
          <View style={styles.name_Rel_Container}><Text key={index} style={{fontSize: 15}}>{list.relationship}</Text></View>
          <View style={styles.phoneContainer}><Text key={index} style={{fontSize: 15}}>{list.phone}</Text></View>
        </View>)
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