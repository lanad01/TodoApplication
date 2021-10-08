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
//GOOGLE LOGIN 처리. 기존 접속이력이 있는 id의경우 insert구문은 실행안됨.
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
        console.log("구글아이디 중복 몇개?"+count)
        if (count > 0) {
          console.log('Dup Exists');
        } else if (count == 0) {
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
//Kakao Login 처리. 기존 접속이력이 있는 id의경우 insert구문은 실행안됨.
export const KAKAO_LOGIN = async userInfo => {
  let id = userInfo.id;
  let name=userInfo.nickname
  let email=userInfo.email
  let image=userInfo.profileImageUrl
  console.log("Kakao id 스클릿 커넥션"+id)
  
  await DB.transaction(tx => {
    console.log("Debug1")
    tx.executeSql(
      'SELECT COUNT(*) AS count FROM user_info WHERE id=?',
      [id],
      (tx, res) => {
        let count = res.rows.item(0).count;
        console.log("Debug2")

        if (count > 0) {
          console.log('Dup Exists');
        } else if (count == 0) {
          console.log("중복없음 => insertUser")
          insertUserFromKakao(name, id); //로그인 이력이 있는 구글ID가 아니라면 새로 Insert
        }
      },
      error => {
        console.log('Select Count of Google Logined Duplicated User' + error);
      },
    );
  });

  const insertUserFromKakao = async (name, id) => {
    const current_time = moment().format('llll'); //현재 시간을 'llll'로 포맷하여 Stringify
    let tempPwdForKakaoLogin = '';
    const possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    Array.from(Array(15)).forEach(() => {
      tempPwdForKakaoLogin += possible.charAt(
        Math.floor(Math.random() * possible.length),
      );
    });
    await DB.transaction(tx => {
      console.log("Debug3")

      tx.executeSql(
        'INSERT INTO user_info (id, pwd, job, name, email, image, regi_date) VALUES (?,?,?,?,?,?,?)',
        [id, tempPwdForKakaoLogin, null, name, email, image, current_time],
        (tx, res) => {

          console.log('kakao Login Insert Success ');
        },
        error => {
          console.log('Insert google Login user Failed' + error);
        },
      );
    });
  };
}
