//let mysql = require('mysql2');
const { createConnection } = require("mysql2/promise");
const mysql = require("mysql2");
const dbConfig = require("../../config/db.config.js");

let connection = mysql.createConnection({
  host: "withDB.cyx4oipm4ian.ap-northeast-2.rds.amazonaws.com",
  user: "ubuntu",
  password: "gksdldma21!",
  database: "withdb",
});

function connect() {
  connection.connect();

  connection.query("SELECT * FROM table", function (error, results, fields) {
    if (error) {
      console.log(error);
    }
    console.log(results);
  });
}


// login 시 유저 확인용 함수
function getUser(UserConfig) {


  console.log("UserConfig :", UserConfig)
  const { userId, userPw, userType } = UserConfig;


  const query = `select * from ${userType} where ${userType}_id = "${userId}" and protector_pwd = "${userPw}"`;

  const promise = new Promise((resolve, reject)=>{ 
    connection.query(query, (error, results, fields) => {
      if (error) console.log(error);

      // 결과 없음
      if(results.length == 0){
        resolve(0)
      }
      else
        resolve(1)
      });
    })

    return promise
}



module.exports = {
  getUser,
};
