
const { getUser } = require('../db/database.js')

// post 형식으로 오겠지?


function login(req, res){
    console.log("enter")
    
    const UserConfig = req.body
    
    // db 커넥팅하고 테이블에서 가져옴.
    
    getUser(UserConfig)

    // const { storedUserId, storedUserPw } = db()
    // let res;

    // if (storedUserId != userId && storedUserPw != password){
    //     res = {
    //         "resText" :  "아이디 혹은 비밀번호가 틀렸습니다.",
    //         "resNum" : 0
    //     }     
    // }
    // else if (storedUserId != userId || storedUserPw != password){
    //     res = {
    //         "resText" :  "아이디 혹은 비밀번호가 틀렸습니다.",
    //         "resNum" : 0
    //     }    
    // }
    // else{
    //     res = {
    //         "resText" :  "아이디 혹은 비밀번호가 틀렸습니다.",
    //         "resNum" : 1
    //     }    
    // }

    // return response.send(res)
}

module.exports ={
    login
}
