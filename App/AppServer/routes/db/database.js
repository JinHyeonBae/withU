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


connection.connect();

connection.query("show tables", function (error, results, fields) {
  if (error) {
    console.log(error);
  }
  console.log(results);
});



// login 시 유저 확인용 함수
function getUser(UserConfig) {

  console.log("UserConfig :", UserConfig)
  const { userId, userPw, userType } = UserConfig;

  const query = `select * from ${userType} where ${userType}_id = "${userId}" and protector_pwd = "${userPw}"`;

  const promise = new Promise((resolve, reject)=>{ 
    connection.query(query, (error, results, fields) => {
      if (error) console.log(error);

      // 결과 없음
      if(results.length == 0)
        resolve(0)
      else
        resolve(1)
      });
    })
    return promise
}

function registerUser(UserConfig){

  // 같은 아이디가 있는지의 여부
  // 이건 유저의 정보이고..

  const { userType, userId } = UserConfig
  const commonQuery = `select * from ${userType} where ${userType}_id = "${userId}"`
  let response;

  if(userType == 'User'){
    const { userId, userPw, userType, userName, userGender, userBirth, userAddr, userPhone, userHospital, UserDis} = UserConfig
  
    response = new Promise((resolve, reject)=>{
      connection.query(commonQuery, (error, results, fields) => {
        if (error) console.log(error);

        if(results.length == 0){
          query = `insert into ${userType} (user_id, user_pwd, user_name, user_gender, user_birth, user_address, user_phone, user_hospital, user_disease, user_device)
          values ("${userId}", "${userPw}", "${userName}", "${userGender}", "${userBirth}", "${userAddr}", "${userPhone}", "${userHospital}", "${UserDis}", "dev")`
          connection.query(query, (error, results, fields)=>{
            if (error) console.log(error)

            resolve(0)
          })  
        }
        else{
          resolve(1) //reject로 가면 안되는 건지?
        } 
     })
    })
  }
  else{
    response = new Promise((resolve, reject)=>{

      const { protectorId, protectorPw, protectorName, protectorBirth, protectorAddr, protectorPhone, relationShip} = UserConfig

      connection.query(commonQuery, (error, results, fields) => {
        if (error) console.log(error);

        if(results.length == 0){
          query = `insert into ${userType} (protector_id, protector_pwd, protector_name, protector_gender, protector_birth, protector_address,  protector_phone, protector_relationship)
            values ("${protectorId}", "${protectorPw}", "${protectorName}","${protectorBirth}", "${protectorAddr}", "${protectorPhone}", "${relationShip}")`
          connection.query(query, (error, results, fields)=>{
            if (error) console.log(error)

            resolve(0)
          })  
        }
        else{
          resolve(1) //reject로 가면 안되는 건지?
        } 
     })
    })
  }

  return response
}

function storeHouseInfo(houseInfo){
    
  console.log("database")
  const { temporature, humidity, infrared } = houseInfo
  const date = Date.now()
  console.log(date)
  const query = `insert into HouseInfo values (${temporature}, ${humidity}, ${infrared}, "${date}")`
  
  const response = connection.query(query, (error, results, field)=>{
      if(error) console.log(error)

      resolve(1)
  })

  return response

}

function UserHouseInfo(){
    console.log("getHouseInfo")
    const query = `select * from House`

    const response = new Promise((resolve, reject)=>{
      connection.query(query, (error, results, fields)=>{

        resolve(results[0])

      })
    })
    
    return response

}

module.exports = {
  getUser,
  registerUser,
  storeHouseInfo,
  UserHouseInfo
};
