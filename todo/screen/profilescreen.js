import React, { useState } from 'react';
import { View,  Text, StyleSheet, Image, TextInput, TouchableOpacity, } from 'react-native';
import GestureRecognizer, { swipeDirections,} from 'react-native-swipe-gestures';
import { AuthContext } from '../authcontext';

export const Profile = ({ navigation }) => {
  const authContext = React.useContext(AuthContext);
  
  const config = { velocityThreshold: 0.5, directionalOffsetThreshold: 80 };
  function onSwipe(gestureName, gestureState) {
    const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
    switch (gestureName) {
      case SWIPE_RIGHT:
        console.log(gestureName)
        break;
      case SWIPE_UP:
        console.log(gestureName)
        break;
      case SWIPE_DOWN:
        console.log(gestureName)
        break;
      case SWIPE_LEFT:
        navigation.navigate("To do")
        break;
    }
  }
  function editProfile(){
    navigation.replace("ProfileEdit");
  }
  return ( //svg
    <GestureRecognizer
      style={{ height:"100%"}}
      onSwipe={(direction, state) => onSwipe(direction, state)}
      onSwipeUp={state => state}
      onSwipeDown={state => state}
      onSwipeLeft={state => state}
      onSwipeRight={state => state}
      config={config}>
      <View style={styles.container}>
        <Text style={styles.headerText}>프 로 필</Text>
        <View style={styles.overlap}>
          <View style={styles.profileBox}>
            <Image 
            source={ authContext.image === null || authContext.image === undefined ?
            require('../assets/profile3.jpg') : {uri: authContext.image }}
              style={styles.profileImage}/>
            <Text style={styles.nameText}> {authContext.name} </Text>
            <Text style={styles.emailText}> {authContext.email === null ? authContext.emailNull : authContext.email } </Text>
            <TouchableOpacity onPress={editProfile} style={styles.editBox}>
              <Text style={styles.editText }>  프로필 수정 </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.bottom}>
          <View style={styles.detailContainer}>
            <Text style={styles.detailCategory}> ■ Register Date </Text>
            <Text style={styles.detailContent }>  -  {authContext.regi_date} </Text>
          </View>
          <View style={styles.detailContainer2}>
            <Text style={styles.detailCategory}> ■ Job </Text>
            <Text style={styles.detailContent}>  -  {authContext.job === null ? authContext.jobNull: authContext.job}  </Text>
          </View>
          <View style={styles.detailContainer2}>
            <Text style={styles.detailCategory}> ■ City </Text>
            <Text style={styles.detailContent}>  - From DB </Text>
          </View>
          
        </View>
      </View>
    </GestureRecognizer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#191970',
    padding: 0,
  },
  headerText: {
    fontFamily: 'BMJUA',
    fontSize: 33,
    color: 'white',
    marginTop: 20,
    marginLeft:10,
  },
  nameText: {
    fontFamily: 'BMJUA',
    fontSize: 23,
    marginTop: 10,
  },
  emailText: {
    fontFamily: 'BMJUA',
    fontSize: 15,
    color: 'gray',
    marginTop: 2,
  },
  overlap: {
    marginTop: 10,
    width: 300,
    height: 230,
    borderRadius: 25,
    backgroundColor: 'white',
    borderColor: '#191970',
    borderWidth: 3,
    position: 'absolute',
    top: 80,
    zIndex: 9999,
    overflow: 'visible',
    shadowColor: '#191970',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.96,
    shadowRadius: 11.14,

    elevation: 17,
  },
  profileBox: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 100,
    marginTop: 25,
    position: 'absolute',
  },
  profileImage:{
    borderRadius: 70,
    width: 100,
    height: 100,
    borderColor: '#191970',
    borderWidth: 5,
  },
  editBox:{

  },
  editText:{
    fontFamily: 'BMJUA',
    color: '#191970',
    fontSize: 17,
    fontWeight: 'bold',
    textDecorationLine:'underline',
    marginTop:10,
    marginRight:5
  },
  bottom: {
    backgroundColor: 'white',
    height: 550,
    width: 390,
    marginTop: 170,
    borderRadius: 70,
  },
  detailContainer: {
    marginTop: 120,
    marginLeft: 40
  },
  detailContainer2:{
    marginLeft:40,
    marginTop:10
  },
  detailCategory: {
    fontFamily: 'BMJUA',
    color: '#191970',
    fontSize: 20,
    fontWeight: 'bold',
  },
  detailContent:{
    fontFamily: 'BMJUA',
    color: '#191970',
    fontSize: 18,
    marginTop:10,
    
  },
});
