//let mysql = require('mysql2');

/*
models 폴더 내의 파일을 읽고 그것들을 모델로 정의함.
원하는 테이블 이름을 파일 이름으로 js 파일을 만들고, 모델을 정의하면 테이블 완성
*/
const mysql = require("mysql2");
const crypto = require('crypto')
const Sequelize = require('sequelize')

const config = require('../../config/config.json')
const db = {}

console.log(config.host)

// 명시적으로 해야했다
const sequelize = new Sequelize(config.database, config. username, config.password,{
    dialect: 'mysql',
    host: "withdb.cyx4oipm4ian.ap-northeast-2.rds.amazonaws.com",
    port: "3306",
    dialectOptions: {
        ssl: "Amazon RDS"
    }
})


sequelize.sync({force : false})
.then(()=> console.log("데이터베이스 연결 성공"))
.catch((err)=> console.error(err))


// connection.connect();

// connection.query("show tables", function (error, results, fields) {
//   if (error) {
//     console.log(error);
//   }
//   console.log(results);
// });





// login 시 유저 확인용 함수
function getUser(UserConfig) {

  console.log("UserConfig :", UserConfig)
  const { userId, userPw, userType } = UserConfig;
  console.log(userId)
  const query = `select * from ${userType} where ${userType}_id = "${userId}" and ${userType}_pwd = "${userPw}"`;
  
  const response = new Promise((resolve, reject)=>{ 
    connection.query(query, (error, results, fields) => {
      if (error) console.log(error);
      console.log(results)
      // 결과 없음
      if(results.length == 0)
        resolve(true)
      else
        resolve(false)
      });
    })

  return response
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

                resolve(true)
                console.log("회원가입 성공")
            })  
        }
        else{
          resolve(false) //reject로 가면 안되는 건지?
          console.log("이미 있는 아이디입니다.")
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

            resolve(true)
          })  
        }
        else{
          resolve(false) //reject로 가면 안되는 건지?
          print("보호자 탭 이미 있는 아이디입니다.!")
        } 
     })
    })
  }

  return response
}

function storeHouseInfo(houseInfo){
    
  console.log("database")
  console.log(houseInfo)
  const { temperature, humidity, PIR } = houseInfo
  const date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')

  let risk = 0
  console.log(date)

  if (temperature > 40 || PIR > 39)
      risk =2
  else if (PIR <40 && temperature > 30)
      risk = 1

  const query = `insert into House (temperature, humidity, risk, infrared, times) values (${temperature}, ${humidity}, ${risk},${PIR}, "${date}")`
  
  const response = new Promise((resolve, reject)=>{
    connection.query(query, (error, results, fields)=>{
      if(error) console.log(error)
      resolve(1)
      console.log("온습도 데이터베이스 저장")
    })
  })

  return response
}

function UserHouseInfo(){
    console.log("getHouseInfo")
    const query = `SELECT * FROM House ORDER BY times DESC limit 1`

    const response = new Promise((resolve, reject)=>{
      connection.query(query, (error, results, fields)=>{
        console.log("UserHouse")
        console.log(results[0])
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
