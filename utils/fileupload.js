import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

const uploadFile = async(localFilePath)=> {
    try {
        if(!localFilePath) return console.log('File path is not found!!')
        
    const response = await cloudinary.uploader.upload(localFilePath,{
        resource_type: "auto"
    })
    console.log("Uploaded !!",response.url)
    return response;

    } catch (error) {
        fs.unlinkSync(localFilePath)
        return null;
    }
}

export {uploadFile}