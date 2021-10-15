const { getUser } = require('../db/database.js')


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

    isExist.then((res)=>{
        if(res){
            const { userId, userPw } = UserConfig  
            request.session.userId =userId
            request.session.pwd = userPw
            request.session.isLogined = true
    
            console.log(request.session)
            response.send({message :"사용자가 확인되었습니다", status : 200})
        }
        else{
            response.send({message : "없는 사용자입니다.", status : 404})
        }
    })
}

module.exports ={
    login
}
