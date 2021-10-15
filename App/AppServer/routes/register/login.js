
const { getUser } = require('../db/database.js')

// post 형식으로 오겠지?


function login(request, response){

    const UserConfig = request.body
    
    isExist = getUser(UserConfig)
    
    isExist.then((res)=>{
        if(res){
            response.send({message :"사용자가 확인되었습니다"})
        }
        else{
            response.send({message : "없는 사용자입니다."})
        }
    })
}

module.exports ={
    login
}
