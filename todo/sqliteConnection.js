import SQLite from 'react-native-sqlite-storage';
import moment from 'moment';
import { AuthContext } from './authcontext';
import { useContext } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
export const DB = SQLite.openDatabase(
  {
    name: 'testDB5',
    location: 'default',
    createFromLocation: 2,
  },
  () => {},
  err => {
    console.log(err);
  },
);
export const CREATE_TASK_TABLE = () =>
  DB.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS task_info2 (' +
        'task_no INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,' +
        'user_no INTEGER NOT NULL,' +
        'task_name VARCHAR(50) NOT NULL,' +
        'priority VARCHAR(30) DEFAULT "Middle",' +
        'exp VARCHAR(100),' +
        'performed boolean,' +
        'FOREIGN KEY(user_no) REFERENCES user_info(user_no) ON DELETE CASCADE)',
      [],
      (tx, res) => {
        console.log('Tasktable created');
      },
      error => {
        console.log('Task table created fail ' + error);
      },
    );
  });

export const CREATE_USER_TABLE = () =>
  DB.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS user_info (' +
        'user_no INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,' +
        'id VARCHAR(30) NOT NULL,' +
        'pwd VARCHAR(30) NOT NULL,' +
        'name VARCHAR(30) NOT NULL,' +
        'job VARCHAR(30),' +
        'email VARCHAR(100),' +
        'regi_date VARCHAR(100) default "' +
        moment().format('YYYY-MM-DD') +
        '", image VARCHAR(255));',
      [],
      (tx, res) => {
        console.log('User_Table created successfully');
      },
      error => {
        console.log('Table unsuccessfully created');
      },
    );
  });


    

export const GOOGLE_LOGIN = userInfo => {
  let name = userInfo.user.name;
  let email = userInfo.user.email;
  let id = userInfo.user.id;
  DB.transaction(tx => {
    tx.executeSql(
      'SELECT COUNT(*) AS count FROM user_info WHERE email=?',
      [email],
      (tx, res) => {
        let count = res.rows.item(0).count;
        if (count > 0) {
          console.log('Dup Exists');
        } else if (count == 0) {
          console.log('pwd and inputpwd not matched');
          insertUserFromGoogle(name, email, id); //로그인 이력이 있는 구글ID가 아니라면 새로 Insert
        }
      },
      error => {
        console.log('Select Count of Google Logined Duplicated User' + error);
      },
    );
  });

  const insertUserFromGoogle = (name, email, id) => {
    const current_time = moment().format('llll'); //현재 시간을 'llll'로 포맷하여 Stringify
    let tempPwdForGoogleLogin = '';
    const possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    Array.from(Array(15)).forEach(() => {
      tempPwdForGoogleLogin += possible.charAt(
        Math.floor(Math.random() * possible.length),
      );
    });
    DB.transaction(tx => {
      tx.executeSql(
        'INSERT INTO user_info (id, pwd, job, name, email, image, regi_date) VALUES (?,?,?,?,?,?,?)',
        [id, tempPwdForGoogleLogin, null, name, email, null, current_time],
        (tx, res) => {
          console.log('Google Login Insert Success ');
        },
        error => {
          console.log('Insert google Login user Failed' + error);
        },
      );
    });
  };
};

export const GET_USER_INFO_BY_GOOGLE_ID = id => {
    const userInfo={
        user_no:'',
        id:'',
        pwd:'',
        name:'',
        email:'',
        job:'',
        image:'',
        regi_date:'',
   }
    DB.transaction(tx => {
        tx.executeSql(
            'SELECT id, pwd, name, email, job, regi_date, image, user_no FROM user_info WHERE id=?',
            [id],
            (tx,res)=>{
                console.log("GET USER INFO BY GG ID SUCCESS")
                userInfo.id=res.rows.item(0).id
                userInfo.pwd=res.rows.item(0).pwd
                userInfo.user_no=res.rows.item(0).user_no
                userInfo.name=res.rows.item(0).name
                userInfo.email=res.rows.item(0).email
                userInfo.job=res.rows.item(0).job
                userInfo.regi_date=res.rows.item(0).regi_date
            },error => {
                console.log("GET USER INFO BY GG ID FAILED")
            }
        )
    })
    return userInfo;
}
