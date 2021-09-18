import React, {Component} from 'react'
import {View, Text, Alert} from 'react-native'
import SQLite from 'react-native-sqlite-storage'


export default class App extends Component {


  constructor(props) {
    super(props)
    SQLite.openDatabase({name:'Todo_v1.db', createFromLocation:2}, this.connected, this.failed)
  }

  connected= () =>{
    Alert.alert('Connected with success !')
    
  }

  failed= (e) =>{
    Alert.alert('Something went wrong !', `${e}`)
  }

  render(){
    return(
      <View>
        <Text>Testing SQLite</Text>
      </View>
    )
  }
}