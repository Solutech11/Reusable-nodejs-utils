# Reusable-nodejs-utils
this are self made utils made by me. Updates wil be added if there are any new utils. These utils can be used in your project repeatedly.

## Auth
this is used for errors validation with mongodb and others. When you call it just pass your error as parameter and it return msg

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