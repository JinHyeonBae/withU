

const { registerUser } = require('../db/database.js')


function signUp(request, response){
    
    const UserConfig = request.body
    registerUser(UserConfig)


    

}


module.exports = {
    signUp
}