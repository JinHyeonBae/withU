const { getUser } = require('../db/database.js')
const crypto = require('crypto')

function identify(UserConfig){

    const { userId, userPw } = UserConfig  

    request.session.userId =userId
    request.session.pwd = userPw
    request.session.isLogined = true
    console.log(request.session)
    
}


function login(request, response){
    

    const UserConfig = request.body
    
    isExist = getUser(UserConfig)
    console.log("isExsit :", isExist)
    isExist.then((res)=>{
        console.log("res :", res)
        if(res){
            const { userId, userPw } = UserConfig  
            request.session.userId =userId
            request.session.pwd = userPw
            request.session.isLogined = true
    
            console.log(request.session)
            response.send({message :"사용자가 확인되었습니다", status : 200})
        }
        else{
            console.log("res :", res)
            response.send({message : "없는 사용자입니다.", status : 404})
        }
    })
}

module.exports ={
    login
}
