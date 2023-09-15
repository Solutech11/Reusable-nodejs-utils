# Reusable-nodejs-utils
this are self made utils made by me. Updates wil be added if there are any new utils. These utils can be used in your project repeatedly.

---
## Mailer
Mailer is used to send email to client

Download / Install these 

        npm i nodemailer
        yarn add nodemailer

Fill out this in your .env file

        service
        host
        email
        pass

Import Sendmail function where you want to use it and pass these three argument

        to: String/Array
        Subject: The title of your Email <String>
        html: The body or content in html <String>

Then it will respond with

        {
                sent:true/null,
                error:Error/null
        }

---
## Auth
this is used for errors validation with mongodb and others. 

1. Errordisplay is a function that validates ur mongoose validator and some errors for you by parsing the error to Errordisplay function and it returns msg and logs out the error

2. SessionAuth is an Auth system for Authenticatio, you parse these to the SessionAuth function

        ID: This is to check for the Id in sessionDB
        userID: to create new sessionId and eliminate the rest. e.g SessionAuth(null,theId)

It returns either

        {
                NoAccess:false/true, // this is parsed when ID is parsed
                user // this is parsed when ID is parsed
                Auth //This is passed when creating new session
                error:Error/null
        }

3. Create Session DB
   
           const mongoose = require('mongoose');

        const Schema = mongoose.Schema

        // create this dm
        const SessionModel = new Schema({
            //major user id will be pared here
            UserId:{
        type:String,
        required:[true, "UserID is Required"],
        unique:true
            },

            //when data expires
            expireAt:{
        type:Date,
        default:new Date(new Date().getTime()+2880*60000),
        // expires:'40320m'
            },
    
        },{timestamps:true})

        module.exports = mongoose.model('SessionModel', SessionModel)
   
## Cloudinary
This is for uploading files to your cloudinary

Go to .env file and add

        cloud_name='***'
        api_key='***'
        api_secret='***'

### Cloudinary uploadimg
In here, you parse the file form express-fileuplader... more suitable, and the path inyou cloudinary you wanna save it at.

then it retuns error, url, publicID

### Cloudinary deleteImg
In this, you will parse the publicId and either get error or deleted in return.

### Cloudinary bulk deleteImg
you will parse an array of publicID
