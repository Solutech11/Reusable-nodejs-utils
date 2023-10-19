const { default: axios } = require("axios")


async function createCron(title, url,duration,){
    try { 

        let integratecronApi= await axios({
            url:`https://www.fastcron.com/api/v1/cron_add`,
            method:'get',
            params:{
                name:title,
                url,
                expression:duration,
                token:process.env.cronApiKey,
            }
        })

        return {Jobid:integratecronApi.data.data.id}
    } catch (error) {
        console.log(error.response)
        return {
            Error:'Couldnt create cron'
        }
    }
}


async function deleteCron(id){
    try {

        
        await axios({
            url:`https://www.fastcron.com/api/v1/cron_delete`,
            params:{
                token:process.env.cronApiKey,
                id
            }
            
        })

        return {Deleted:true}
    } catch (error) {
        console.log(error);
        return {
            Error:'Couldnt delete cron'
        }
    }
}

module.exports={createCron, deleteCron}