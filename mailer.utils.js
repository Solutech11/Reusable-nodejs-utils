const mailer = require("nodemailer");
const { default: axios } = require("axios");
const myemail = mailer.createTransport({
  service: process.env.service,
  host: process.env.host,
  port: 465,
  auth: {
    user: process.env.email,
    pass: process.env.pass,
  },
  tls: {
    rejectUnauthorized: false
  }
});

async function Sendmail(to, subject, html) {
    try {
        const mailoption = {
            from: `${process.env.Company} <${process.env.email}>`,
            to:to,
            subject: subject,
            html: html,
          };
          await myemail.sendMail(mailoption);
          return {sent:true}
    } catch (error) {
        console.log(error.message);
        return{error:error.message}
    }
}

//expo notification
async function SendExpoNotification(expoPushToken, title, body,priority) {
  try {
    const message = {
      to: expoPushToken,
      sound: 'default',
      title,
      body,
      priority,
      
    };
  
    await axios({
      url:'https://exp.host/--/api/v2/push/send', 
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(message),
    });
        return {sent:true}
  } catch (error) {
      console.log(error.message);
      return{error:error.message}
  }
}
async function SendSMS(to, text){
  try {

    //integrating api
    await axios({
      url:'https://www.bulksmsnigeria.com/api/v2/sms',
      method:'post',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json'
      },
      data:JSON.stringify({
        from:process.env.company,
        to,
        body:text,
        api_token:process.env.bulkSMSApiKey
      })
    })

    return{sent:true}
    
  } catch (error) {
    console.log(error.response.data);

    return {Error:error.response.data.data.message}
  }
}
module.exports={Sendmail, SendExpoNotification, SendSMS}