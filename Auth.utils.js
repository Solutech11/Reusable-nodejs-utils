const SessionModel = require("../Model/Session.model");// session models go here
const UserModel = require("../Model/User.model");// user model goes here
const jwt = require("jsonwebtoken");

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

// call it before you call the callback to your router 
// auth is passed to authorization headers
async function SessionAuthMiddleWare(req,res, next){
    try {

        //get Auth token
        let ID = req.header.authorization 

        if(ID){
            //checksID in DB
            let ValidID= ID.length==24?await SessionModel.findOne({_id:ID}):null
            
            // checks user detail
            let user= ValidID?await UserModel.findOne({_id:ValidID.UserId}):null
            
            //if data exist it pushes it out else NoAccess=true
            req.user=user

            return next()
        }

        //no auth
        return res.status(500).json({Access:false, Error:"Dev only:No Auth"})

    } catch (error) {
        res.status(500).json({Access:false, Error:"Dev only:Auth doesnt exist"})
    }
}



/////////////////////Jwt

async function CreateJWTToken(payload) {
    try {
        return await jwt.sign(payload,process.env.jwtSecret,{expiresIn:'30d'})
    } catch (error) {
        throw error
    }
}

function VerifyJWTToken(req, res, next) {
    const token = req.headers.authorization;
  
    if (!token) {
      return res.status(500).json({ Error: 'User Does Not Exist' });
    }
  
    jwt.verify(token, process.env.jwtSecret, (err, decoded) => {
      if (err) {
        return res.status(500).json({ Error: 'User Does Not Exist' });
      }
      req.user = decoded;
      next();
    });
  }

function VerifyWebJWTToken(req, res, next) {
    const token = req.session.Auth;
  
    if (!token) {
      return res.status(500).json({ Error: 'User Does Not Exist' });
    }
  
    jwt.verify(token, process.env.jwtSecret, (err, decoded) => {
      if (err) {
        return res.status(500).json({ Error: 'User Does Not Exist' });
      }
      req.user = decoded;
      next();
    });
}

module.exports= {Errordisplay, SessionAuth,SessionAuthMiddleWare, CreateJWTToken, VerifyJWTToken,VerifyWebJWTToken}