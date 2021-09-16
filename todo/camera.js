import React from 'react'
import { View, Button, Image } from 'react-native'
import ImagePicker from 'react-native-image-crop-picker';

export default camera = () => {
    function picture(){
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
          }).then(image => {
            console.log(image);
          });
    }
    return(
        <View>
            <Button title="Pick One Photo" onPress={picture}  />
            <Button title="Pick Multiple Photos" onPress={picture}  />
            <Button title="Let me take picture myself" onPress={picture}  />
        </View>
    )
}