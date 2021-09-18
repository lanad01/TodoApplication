import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import GestureRecognizer, {
  swipeDirections,
} from 'react-native-swipe-gestures';
import { AuthContext } from '../context';

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
  return (
    <GestureRecognizer
      style={{ height:"100%"}}
      onSwipe={(direction, state) => onSwipe(direction, state)}
      onSwipeUp={state => state}
      onSwipeDown={state => state}
      onSwipeLeft={state => state}
      onSwipeRight={state => state}
      config={config}>
      <View style={styles.container}>
        <Text style={styles.headerText}>PROFILE</Text>
        <View style={styles.overlap}>
          <View style={styles.editImg}>
            <Image source={require('../assets/edit.png')} style={{ width: 50, height: 50 }}
            />
          </View>
          <View style={styles.profileBox}>
            <Image
              source={require('../assets/winter.jpg')}
              style={styles.profileImage}
            />
            <Text style={styles.nameText}> {authContext.userName} </Text>
            <Text style={styles.emailText}> swKwon@pine-patners </Text>
          </View>
        </View>
        <View style={styles.bottom}>
          <View style={styles.detailContainer}>
            <Text style={styles.detailCategory}> ■ Register Date </Text>
            <Text style={styles.detailContent}>  - 2021. 09 .27 </Text>
          </View>
          <View style={styles.detailContainer2}>
            <Text style={styles.detailCategory}> ■ Job </Text>
            <Text style={styles.detailContent}>  - Database Architecture  </Text>
          </View>
          <View style={styles.detailContainer2}>
            <Text style={styles.detailCategory}> ■ City </Text>
            <Text style={styles.detailContent}>  - North Carolina </Text>
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
    fontSize: 25,
    color: 'white',
    marginTop: 30,
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
    marginTop: 40,
    width: 300,
    height: 200,
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
  editImg: {
    alignItems: 'flex-end',
    marginRight: 10,
    marginTop: 10,
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
  bottom: {
    backgroundColor: 'white',
    height: 550,
    width: 350,
    marginTop: 170,
  },
  detailContainer: {
    marginTop: 120,
    marginLeft:20
  },
  detailContainer2:{
    marginLeft:20,
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
