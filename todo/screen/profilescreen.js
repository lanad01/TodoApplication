import React from 'react';
import { View,  Text, Image, TouchableOpacity} from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import { AuthContext } from '../authcontext';
import { styles } from './styles/profileScreenStyle';
import { HEIGHT } from '../dp';
export const Profile = ({ navigation }) => {
  const authContext = React.useContext(AuthContext);
  const config = { velocityThreshold: 0.5, directionalOffsetThreshold: 50 }; //swipe gesture Handler Option 
  function onSwipe(gestureName) {
    // const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
    console.log("GestureName :"+gestureName)
    if(gestureName==="SWIPE_LEFT") navigation.navigate("Task") //Swipe Left할 시 Screen.Task로 이동
  }
  return ( 
    <GestureRecognizer
      style={{ height:HEIGHT}}
      onSwipe={(direction, state) => onSwipe(direction, state)}
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
            <TouchableOpacity onPress={ () => navigation.push("ProfileEdit") } style={styles.editBox}>
              <Text style={styles.editText }>  프로필 수정 </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.bottom}>
          <View style={styles.detailContainer}>
            <Text style={styles.detailCategory}> * Register Date </Text>
            <Text style={styles.detailContent }>  -  {authContext.regi_date} </Text>
          </View>
          <View style={styles.detailContainer2}>
            <Text style={styles.detailCategory}> * Job </Text>
            <Text style={styles.detailContent}>  -  {authContext.job === null ? authContext.jobNull: authContext.job}  </Text>
          </View>
          <View style={styles.detailContainer2}>
            <Text style={styles.detailCategory}> * City </Text>
            <Text style={styles.detailContent}>  - From DB </Text>
          </View>
        </View>
      </View>
    </GestureRecognizer>
  );
};
