import React, { useState } from 'react';
import { Button, View } from 'react-native'; 
import { RNCamera } from 'react-native-camera';
import CameraRoll from '@react-native-community/cameraroll';


export const Profile2 = ( { navigation }) => {

  // const camera=React.useRef(); //
  // // useRef 로 관리하는 변수는 값이 바뀐다고 해서 컴포넌트가 리렌더링되지 않습니다. 
  // // 리액트 컴포넌트에서의 상태는 상태를 바꾸는 함수를 호출하고 나서 그 다음 렌더링 이후로 업데이트 된 상태를 조회 할 수 있는 반면,
  // //  useRef 로 관리하고 있는 변수는 설정 후 바로 조회 할 수 있습니다.
  // const takePicture = async () => {  //async 비동기 
  //   if(camera.current){ // 
  //     const options = {quality : 1 , base64: false, writeExif : false  }
  //     const data = await camera.current.takePictureAsync(options); 
  //     // 통신을 하는 코드 앞에 await , data는 await 뒤의 함수 로직이 값을 반환해야 동작

  //     CameraRoll.save(data.uri);
  //     alert(data.uri)
  //   }
  // } 
  // const getPhotos = async () => {
  //   try {
  //     const {edges} = await CameraRoll.getPhotos({
  //       first: 1,
  //     });
  //     console.log('📸', edges);
  //   } catch (error) {
  //     console.log('getPhoto', error);
  //   }
  // };
  return(
    <View>
     
      <View>
      <Button title="camera" onPress={navigation.navigate("To do")}/>
      <Button title="Gallery" />
      </View>
    </View>
  )
}