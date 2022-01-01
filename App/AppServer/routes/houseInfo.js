
const { storeHouseInfo, UserHouseInfo} = require('./db/database')


function setHouseInfo(request, response){
    
    console.log("house Info")
    // console.log(request.body)
    // console.log(response)
    
    


    confirmToStore = storeHouseInfo(request.body)

    confirmToStore.then((res)=>{
        if(res)
            response.send({status : 200})
        else
            response.send({status : 500})
        
    })
    
}


function getHouseInfo(request, response){

    const houseInfo = UserHouseInfo()

    houseInfo.then((res)=>{
        response.send({ houseData : res, status : 200})
    })
}


module.exports ={
    setHouseInfo,
    getHouseInfo
}