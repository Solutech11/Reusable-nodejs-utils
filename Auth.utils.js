
function Errordisplay(error) {
    console.log(error.message);
        if (error.message) {
            const msg=(error.message.split(':')[2])
            return {msg:msg?(msg.split(',')[0])?(msg.split(',')[0].split(' ').find(i=>i=='dup'))?'Account details already exist':(msg.split(',')[0]):'Error occured':'Error occured with file upload'}
        } else {
            console.log(error);
            return{msg:'Severe error occured'}

        }  

}

module.exports= {Errordisplay}