import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  Image,
  Alert,
  Text,
  TouchableOpacity,
  BackHandler,
  Keyboard,
} from 'react-native';

import { styles } from './styles/tabsScreenStyle';
import { BACK_ACTION } from '../alertCase';
import { TodoContext } from '../todoContext';
import { ProfileStackScreen } from './profileRoot';
import { AuthContext } from '../authcontext';
import { TaskScreen } from './taskList';
import { DB, CREATE_TASK_TABLE } from '../sqliteConnection';
import { LOGOUT } from '../common/logOutProcess';
export const TabsScreen = props => {
  console.log('tabsScreen');
  const authContext = React.useContext(AuthContext);
  const todoContext = React.useContext(TodoContext);
  const [getLengthForBadge, setLength] = useState(); //Task 갯수
  const [taskListWritten, setTaskListWritten] = useState(false); //TaskList 확인 여부

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      CREATE_TASK_TABLE();
      DB.transaction(tx => {
        //badge 형성을 위해 해당 user_no의 남아있는 todoList length 출력
        tx.executeSql(
          'SELECT count(task_no) as count FROM task_info2 WHERE user_no=?',
          [authContext.user_no],
          (tx, res) => {
            let count = res.rows.item(0).count;
            console.log('COunt in Badge Query' + count);
            setLength(count); // 출력된 count를 뱃지 개수 state로
          },
        );
      });
    });
    return unsubscribe;
  }, [props.navigation]);

  const clearAuthContext = () => {
    authContext.user_no = null;
    authContext.id = null;
    authContext.pwd = null;
    authContext.name = null;
    authContext.job = null;
    authContext.email = null;
    authContext.regi_date = null;
    authContext.image = null;
  };
  function logOutConfirm() {
    Alert.alert(
      '로그아웃하시겠습니까?',
      '',
      [
        {
          text: '아니오',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: '예',
          onPress: () => logOutImple()
        },
      ],
      { cancelable: false },
    );
  }
  const logOutImple = () => {
    clearAuthContext()
    props.navigation.navigate('Auth'); // 로그인화면
  }
  const profileScreen_Opt = () => {
    return {
      tabBarActiveTintColor: '#00af9d',
      tabBarLabelStyle: styles.tabbarLabel,
      headerStyle: { backgroundColor: '#E0ffff' },
      headerTitleStyle: styles.headerTitleStyle,
      headerRight: () => (
        <TouchableOpacity style={styles.btnView} onPress={logOutConfirm}>
          <Text style={styles.logoutBtn}>Logout</Text>
        </TouchableOpacity>
      ),
      tabBarIcon: ({}) => {
        return (
          <Image
            source={require('../assets/profileIcon.png')}
            style={styles.tabbarIcon}
          />
        );
      },
    };
  };
  const todoScreen_Opt = () => {
    return {
      //tabBarBadge는 task가 한번 읽혔다면 0, 첫 프로필화면에서는 숫자만큼 출력
      tabBarBadge: taskListWritten ? 0 : getLengthForBadge,
      tabBarActiveTintColor: '#00af9d',
      tabBarLabelStyle: styles.tabbarLabel,
      headerTitleStyle: styles.headerTitleStyle,
      headerStyle: { backgroundColor: '#E0ffff' },
      headerRight: () => (
        <TouchableOpacity style={styles.btnView} onPress={logOutConfirm}>
          <Text style={styles.logoutBtn}>Logout</Text>
        </TouchableOpacity>
      ),
      tabBarIcon: ({}) => {
        return (
          <Image
            source={require('../assets/128x128.png')}
            style={styles.tabbarIcon}
          />
        );
      },
    };
  };

  const Tabs = createBottomTabNavigator();
  return (
    //컴포넌트화
    <TodoContext.Provider value={todoContext}>
      <Tabs.Navigator initialRouteName="Profile">
        <Tabs.Screen
          name="Profile"
          component={ProfileStackScreen}
          options={profileScreen_Opt}
        />
        <Tabs.Screen
          name="Task"
          component={TaskScreen}
          options={todoScreen_Opt}
          listeners={({}) => ({
            tabPress: e => {
              setTaskListWritten(true);
            },
          })}
        />
      </Tabs.Navigator>
    </TodoContext.Provider>
  );
};
