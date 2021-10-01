import React, { useState, useEffect, useRef, useContext } from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Alert,
  PanResponder,
  TouchableOpacity,
} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Card } from 'react-native-shadow-cards';
import ActionButton from 'react-native-action-button';
import SQLite from 'react-native-sqlite-storage';

import { Loading } from '../modal/Loading';
import { TodoContext } from '../todoContext';
import { AuthContext } from '../authcontext';
import { AddModal } from '../modal/AddModal';

const db = SQLite.openDatabase({
  name: 'testDB5',
  location: 'default',
  createFromLocation: 2,
});
const rowTranslateAnimatedValues = {};

export const TodoList_v3 = () => {
  const todoContext = useContext(TodoContext);
  const authContext = useContext(AuthContext);
  const [render, reRender] = useState(1);

  const [loading, setLoading] = useState(false);
  const [addModal, setAddModal] = useState(false);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM task_info2 WHERE user_no=?',
        [authContext.user_no],
        (tx, res) => {
          var len = res.rows.length;
          if (len === 0) {
            // console.log("Array length 0")
          } else if (len > 0) {
            for (var i = 0; i < len; i++) {
              var priority = res.rows.item(i).priority;
              if (priority === null) {
                priority = 'Middle';
              }
              todoContext.task_no[i] = res.rows.item(i).task_no;
              todoContext.task_name[i] = res.rows.item(i).task_name;
              todoContext.task_prior[i] = priority;
              todoContext.task_exp[i] = res.rows.item(i).exp;
              todoContext.performed[i] = res.rows.item(i).performed;
              setList();
            }
          }
        },
        error => {
          console.log('Failed' + error);
        },
      );
    });
    return () => {};
  }, [render, loading]);

  const deleteTask = (i, task_no) => {
    console.log('Index : ' + i);
    console.log(task_no); // arg working
    db.transaction(tx => {
      db.executeSql(
        'DELETE FROM task_info2 WHERE task_no=?',
        [task_no],
        (tx, res) => {
          console.log('Delete Success');
          todoContext.task_name.splice(i, 1);
          todoContext.task_prior.splice(i, 1);
          todoContext.task_exp.splice(i, 1);
          todoContext.task_no.splice(i, 1);
          todoContext.performed.splice(i, 1);
        },
        error => {
          console.log('Delete Failed' + error);
        },
      );
    });
  };

  Array(todoContext.task_name.length)
    .fill('')
    .forEach((_, i) => {
      rowTranslateAnimatedValues[`${i}`] = new Animated.Value(1);
    });
  const [listData, setListData] = useState();
  const setList = () => {
    setListData(
      Array(todoContext.task_name.length)
        .fill('')
        .map((_, i) => ({ key: `${i}`, text: todoContext.task_no[i] })),
    );
  };
  // console.log(listData[1].text)
  const animationIsRunning = useRef(false);
  const onSwipeValueChange = swipeData => {
    const { key, value } = swipeData;
    console.log('Key :   ' + key);
    console.log('Value :   ' + value);
    if (
      value < -Dimensions.get('window').width &&
      !animationIsRunning.current
    ) {
      console.log('Running');
      animationIsRunning.current = true;
      Animated.timing(rowTranslateAnimatedValues[key], {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start(() => {
        const newData = [...listData];
        const prevIndex = listData.findIndex(item => item.key === key);
        newData.splice(prevIndex, 1);
        setListData(newData);
        deleteTask(key, listData[key].text);
        animationIsRunning.current = false;
      });
    }
  };
  const renderHiddenItem = () => (
    <View style={styles.rowBack}>
      <View style={[styles.backRightBtn, styles.backRightBtnRight]}>
        <Text style={styles.backTextWhite}>Delete</Text>
      </View>
    </View>
  );
  const flatListSeparator = () => {
    return (
      <View
        style={{
          height: 10,
          backgroundColor: '#AFEEEE',
          width: 300,
          borderRadius: 9,
          alignSelf: 'center',
        }}
      />
    );
  };
  const addButton = () => {
    console.log('Add');
    setAddModal(true);
  };

  const pan = new Animated.ValueXY();
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      return !(gestureState.dx === 0 && gestureState.dy === 0);
    },
    onPanResponderGrant: () => {
      pan.setOffset({
        x: pan.x._value,
        y: pan.y._value,
      });
    },
    onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
      useNativeDriver: false,
    }),
    onPanResponderRelease: () => {
      pan.flattenOffset();
    },
  });
  return (
    <View style={styles.container}>
      <View
        style={{
          height: 10,
          backgroundColor: '#AFEEEE',
          width: '100%',
          borderRadius: 9,
          alignSelf: 'center',
        }}
      />
      <SwipeListView
        ItemSeparatorComponent={flatListSeparator}
        disableRightSwipe
        data={listData}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-Dimensions.get('window').width}
        onSwipeValueChange={onSwipeValueChange}
        useNativeDriver={false}
        renderItem={({ data, index }) => (
          <Card style={styles.card}>
            <Animated.View
              style={[
                styles.rowFrontContainer,
                { height: rowTranslateAnimatedValues[index] },
              ]}>
              <TouchableHighlight
                onPress={() => console.log('You touched me')}
                style={styles.rowFront}
                underlayColor={'#AAA'}>
                <View style={styles.taskCont}>
                  <View style={styles.task1st}>
                    <Text
                      style={styles.taskName}
                      ellipsizeMode={'tail'}
                      numberOfLines={1}>
                      {todoContext.task_name[index]}
                    </Text>
                    <Text style={styles.taskPrior}>
                      {' '}
                      [ {todoContext.task_prior[index]} ]{' '}
                    </Text>
                  </View>
                  <View
                    style={{
                      alignSelf: 'flex-start',
                      alignItems: 'flex-start',
                    }}>
                    <Text style={styles.taskExp}>
                      {todoContext.task_exp[index]}{' '}
                    </Text>
                  </View>
                </View>
              </TouchableHighlight>
            </Animated.View>
          </Card>
        )}
      />
      <Animated.View
        style={{
          transform: [{ translateX: pan.x }, { translateY: pan.y }],
          justifyContent: 'flex-end',  alignContent: 'flex-end',
          alignSelf: 'flex-end',
          alignItems: 'flex-end',
        }}
        {...panResponder.panHandlers}>
        <TouchableOpacity onPress={addButton}>
          <View style={{ width: 50,height: 50,marginBottom: 50, backgroundColor: 'yellow', right: 5,}}>
            <View style={{ bottom: 30, left: 33 }}>
              <ActionButton buttonColor="rgba(231,76,60,1)" />
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
      <View
        style={{
          height: 10,
          backgroundColor: '#AFEEEE',
          width: '100%',
          borderRadius: 9,
          alignSelf: 'center',
        }}
      />
      <AddModal
        modalOn={addModal}
        modalOff={() => setAddModal(false)}
        render={() => reRender(render + 1)}
      />
      <Loading modalOn={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  headerCont: {
    justifyContent: 'center',
    alignSelf: 'center',
    flex: 0.3,
    marginBottom: 50,
  },
  headerText: {
    fontFamily: 'BMJUA',
    color: '#191970',
    fontSize: 32,
    justifyContent: 'center',
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowFrontContainer: {
    height: 80,
  },
  rowFront: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    marginHorizontal: 20,
    elevation: 4,
  },
  card: {
    shadowOpacity: 0.5,
    elevation: 3,
    height: 80,
    width: 330,
    alignSelf: 'center',
    padding: -10,
  },
  taskCont: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    height: 80,
  },
  task1st: {
    flexDirection: 'row',
  },
  taskName: {
    fontFamily: 'BMJUA',
    color: '#191970',
    fontSize: 22,
    width: 130,
    marginRight: 20,
  },

  taskPrior: {
    fontFamily: 'BMJUA',
    color: '#191970',
    fontSize: 22,
  },
  taskExp: {
    fontFamily: 'BMJUA',
    color: 'red',
    fontSize: 15,
    justifyContent: 'center',
    alignSelf: 'flex-start',
    marginTop: 5,
  },
  rowBack: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'red',
    height: 80,
    width: 300,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
  },
  backRightBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    height: 80,

    borderRadius: 10,
    width: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    height: 80,

    right: 0,
  },
});
