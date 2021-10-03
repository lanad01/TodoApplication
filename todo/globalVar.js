 import SQLite from 'react-native-sqlite-storage';

 export const DB=SQLite.openDatabase({ name: 'testDB5', location: 'default', createFromLocation: 2, } );
 export const CREATE_TASK_TABLE = () => DB.transaction(tx => {
    tx.executeSql(
        'CREATE TABLE IF NOT EXISTS task_info2 ('
        +'task_no INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,'
        +'user_no INTEGER NOT NULL,'
        +'task_name VARCHAR(50) NOT NULL,'
        +'priority VARCHAR(30) DEFAULT "Middle",'
        +'exp VARCHAR(100),'
        +'performed boolean,'
        +'FOREIGN KEY(user_no) REFERENCES user_info(user_no) ON DELETE CASCADE)',
        [],
        (tx , res) => {
            console.log("Tasktable created");
        }, error => {
          console.log("Task table created fail "+error)
        }
    )
})

export const CREATE_USER_TABLE = () => 
    DB.transaction(tx => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS user_info ('
            +'user_no INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,'
            +'id VARCHAR(30) NOT NULL,'
            +'pwd VARCHAR(30) NOT NULL,'
            +'name VARCHAR(30) NOT NULL,'
            +'job VARCHAR(30),'
            +'email VARCHAR(100),'   
            +'regi_date VARCHAR(100) default "'+moment().format('YYYY-MM-DD')
            +'", image VARCHAR(255));'
            ,
            [],
            (tx , res) => {
                console.log("table created successfully");
            }, error => {
            console.log("Table unsuccessfully created")
            }
        );
    });
 