const SessionModel = require("../Model/Session.model");// session models go here
const UserModel = require("../Model/User.model");// user model goes here

function Errordisplay(error) {
    console.log(error.message);// can be removed
        if (error.message) {
            const msg=(error.message.split(':')[2])
            return {msg:msg?(msg.split(',')[0])?(msg.split(',')[0].split(' ').find(i=>i=='dup'))?'Details already exist':(msg.split(',')[0]):'Error occured':'Issue occured from your end'}
        } else {
            console.log(error);
            return{msg:'Severe error occured'}

        }  

}

//if saving ID use ID= null userID=....
//if u are checking the Id ID=...
async function SessionAuth(ID,userID){
    try {
        console.log(ID);
        // if Id was given
        if(ID){
            //checksID in DB
            let ValidID= ID.length==24?await SessionModel.findOne({_id:ID}):null
            
            // checks user detail
            let user= ValidID?await UserModel.findOne({_id:ValidID.UserId}):null
            
            //if data exist it pushes it out else NoAccess=true
            return ValidID?{NoAccess:false,user}:{NoAccess:true}
        }

        //if ID not found it moves on hee
        //deleting all previous session
        await SessionModel.deleteMany({UserId:userID})

        //creating a new want
        let newsession = new SessionModel({UserId:userID})
        let savesession= await newsession.save()

        return {error:false,Auth:savesession._id}
    } catch (error) {
        return {error:Errordisplay(error).msg}
    }
}
module.exports= {Errordisplay, SessionAuth}