

const { registerUser } = require('../db/database.js')


function signUp(request, response){
    
    const UserConfig = request.body
    
    sign = registerUser(UserConfig)

    sign.then((res)=>{
        console.log("0이면 성공, 1이면 실패 : ",res)
        if(res)
            response.send({message: "회원가입 완료", status : 200 })
        else
            response.send({message : "이미 있는 아이디입니다.", status : 500})
    })

   

}


module.exports = {
    signUp
}