import { StyleSheet } from 'react-native';
import React from 'react';
import { View,Text } from 'react-native'
import {
  Animated,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

export default function App() {
  var len=4;

  const progress=[]
  progress.length=len;
  console.log(progress.length)
  progress.fill( () => useSharedValue(30))
  console.log(progress[0])
  const ad=useSharedValue(30)
  console.log(ad)

  // const reanimatedStyle = []
  // reanimatedStyle.length=len
  // reanimatedStyle.fill(
  //   useAnimatedStyle(()=> {
  //     // console.log("progressValue:"+progress.value)
  //     return{ 
  //       transform:[{translateX:progress[1].value}], 
  //       flex:1, 
  //       }
  //   })
  // );
  // console.log(reanimatedStyle[0])
    return(
      <View><Text> dd</Text></View>
    )
}
const styles = StyleSheet.create({
  box: {
    height: 50,
    backgroundColor: 'blue',
  },
});