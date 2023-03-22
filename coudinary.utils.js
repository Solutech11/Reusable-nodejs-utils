//cloudinary
const cloudinary= require('cloudinary')
cloudinary.config({
    cloud_name:process.env.cloud_name,
    api_key:process.env.api_key,
    api_secret:process.env.api_secret
})


async function uploadimg(file, path) {
  try {
    let files = file?file:false
    let paths = path?path:false
    if (files!=false && paths!=false) {
        
        let upload =await cloudinary.v2.uploader.upload(files.tempFilePath,{resource_type:'image',folder:paths,use_filename:false,unique_filename:true})
        return {url:upload.secure_url, publicID:upload.public_id}
    }
    return {error:'Images are missing'}
  } catch (error) {
    console.log(error);
    return {error:error.message}
  }
}

async function deleteImg(publicIDs){
    try {
        let publicID= publicIDs?publicIDs:false
        console.log(publicID);
    if (publicID!=false) {
        await cloudinary.v2.uploader.destroy(publicID)  
        return {deleted:true}  
    }
    return {error:'no file like this'}
    } catch (error) {
        console.log(error);
    return {error:error.message}
        
    }
}

async function deleteBulkImg(publicIDs){
    try {
        let publicID= publicIDs.length>0?publicIDs:false
        console.log(publicID);
    if (publicID!=false) {
        for (let i = 0; i < publicID.length; i++) {
            // const element = publicID[i];
            await cloudinary.v2.uploader.destroy(publicID[i])
        }
          
        return {deleted:true}  
    }
    return {error:'no public Ids'}
    } catch (error) {
        console.log(error);
    return {error:error.message}
        
    }
}

async function addpdf(file) {
    try {
        let files = file?file:false
        if (files!=false && paths!=false) {
            let upload =await cloudinary.v2.uploader.upload(files.tempFilePath,{resource_type:'image',folder:process.env.notes,use_filename:false,unique_filename:true})
            return {url:upload.secure_url, publicID:upload.public_id}
        }
        return {error:'file not found'}
      } catch (error) {
        console.log(error);
        return {error:error.message}
      }
}

module.exports={uploadimg, deleteImg , deleteBulkImg, addpdf}