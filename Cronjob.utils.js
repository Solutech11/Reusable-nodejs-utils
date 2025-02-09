const { default: axios } = require("axios")
const parseTimestring = require("timestring");


async function createCron(title, url,duration,){
    try { 

        let integratecronApi= await axios({
            url:`https://app.fastcron.com/api/v1/cron_add`,
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

function DateTime_toMiliseconds(date,time){
    return (new Date(`${date}T${time}`)).getTime()
}

function AddTime(duration){
    console.log(parseTimestring(duration,'ms'));
    return Date.now()+parseTimestring(duration,'ms')
}

function isExpired(dateString) {
    const currentDate = Date.now();
    const taskDate = dateString; // Parse the string to a Date object
    return taskDate < currentDate; // Check if the task date is earlier than the current date
}


async function deleteCron(id){
    try {

        
        await axios({
            url:`https://app.fastcron.com/api/v1/cron_delete`,
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

module.exports={createCron, deleteCron, AddTime, isExpired, DateTime_toMiliseconds}