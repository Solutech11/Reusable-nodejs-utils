const randtoken= require('rand-token').generator()


function OTP() {
    return randtoken.generate(4,'0123456789');
}


function Links() {
    return randtoken.generate(16,'0123456789qwertyuiopasdfghjklzxcvbnm$.');
    
}


module.exports={OTP,Links}