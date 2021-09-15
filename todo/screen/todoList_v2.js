import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View, Image, ScrollView, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TodoContext } from '../todoContext';

const TodoList_v2 = () => {
  const todoContext = React.useContext(TodoContext);
  const [showBox, setShowBox] = useState(true);
  const deleteTask = (index) => {
    return(
    Alert.alert(
      "정말로 삭제하시겠습니까?",
      "복구하실 수 없습니다!",
      [
          {
              text:"Yes",
              onPress : () => {
                todoContext.deleteTask(index);
                setShowBox(false);
              },
          },
          {
              text: "No",
          },
      ]
    )
    );
  }
  return (
    <View style={styles.container}>
    <FlatList
        data={todoContext.taskArray, todoContext.priorityArray, todoContext.expArray}
        renderItem={({ index }) => (
        <View style={styles.container}>
        <View style={todoContext.priorityArray[index]==="High" ? styles.HighPriority : styles.itemContainer}>  
            <View>
                <View style={{flexDirection:'row' }}>
                    <Text style={styles.listtext} ellipsizeMode={'tail'} numberOfLines={1} >{todoContext.taskArray[index]}   </Text>
                    <Text style={styles.priorityText}>[ {todoContext.priorityArray[index]} ]</Text>
                    <View>
                    <TouchableOpacity onPress={() => deleteTask(index)}>
                    <Image source={require("../assets/bin.png")} style={{width:35, height:30, marginTop:5}}/>
                    </TouchableOpacity>
                    </View>
                </View>
                <Text style={styles.exp}> Until -  {todoContext.expArray[index]}</Text>
            </View>
        </View>
        </View>
        )}
      />
      </View>
  );
};

export default TodoList_v2;

const styles=StyleSheet.create({
    container : {
        flex:1,
    },
    itemContainer : {
        flex:1,
        marginTop:10,
        backgroundColor:'white',
        borderRadius:7,
        width:280,
        height:70

    },
    listtext : {
        fontFamily:"BMJUA",
        color:"#191970",
        fontSize:20,
        width:'55%',
        marginLeft:8,
        marginTop:10
    },
    priorityText : {
        fontFamily:"BMJUA",
        color:"#191970",
        fontSize:20,
        width:85,
        marginLeft:3,
        marginTop:10
    },
    exp : {
        fontFamily:"BMJUA",
        color:"#191970",
        fontSize:15,
        marginLeft:12,
        marginTop:10,
    },
    itemTaskContainer:{
        flexDirection:'row',

    },
    HighPriority:{
        flex:1,
        marginTop:10,
        backgroundColor:'#FFC0CB',
        borderRadius:7,
        width:280,
        height:70
    },
})
