import { Handler } from '../utils/Handler.js';
import {ApiError} from '../utils/ApiError.js';
import {User} from '../models/user.model.js';
import {ApiResponse} from '../utils/ApiResponse.js'
export {uploadFile} from '../utils/fileupload.js'

const generateAccessAndRefreshToken = async(userId) =>{
    try {
        const user = await User.findById(userId)
        const accessToken =user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken =refreshToken
        await user.save({validateBeforeSave: false})
        return {refreshToken,accessToken}
    } catch (error) {
        throw new ApiError(500,"something went wrong in generating refresh tokens!!");
        
    }
}

const registerUser = Handler(async (req,res) => {
    res.status(200).json({
        message: 'Running Status Ok :200!'
    })
    
})

const LoginUser = Handler(async (req,res)=>{

    const {email,username,password} = req.body
    if (!(username || email)) {
        throw new ApiError(400,"Username or Email is required Badrequest 400!!");
        
    }
   const user = await User.findOne(
        {
            $or : [{email},{username}]
        }
    )
    if (!user) {
        throw new ApiError(404,"User Does Not Exist!!");
        }
    const isPasswordValid = await user.isPasswordCorrect(password)
    if (!isPasswordValid) {
        throw new ApiError(401,"Password Does Not matched or correct!!");
        }
    const {refreshToken,accessToken}= await generateAccessAndRefreshToken(user._id)
    const loggedinUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure:true
    }

    return res.status(200).cookie("accessToken",accessToken,options).cookie("refreshToken",refreshToken,options).
    json(new ApiResponse(
        200,
        {user: loggedinUser,refreshToken,accessToken},
        "User LoggedIn SucessFully !!"
    ))
  
})

const logoutUser = Handler(async(req,res)=>{
   await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {refreshToken:undefined}
        }
    )

    const options = {
        httpOnly: true,
        secure:true
    }

    return res.status(200).clearCookie("accessToken",accessToken,options).clearCookie("refreshToken",refreshToken,options)
    .json(new ApiResponse(
        200,"","User Logged Out !!"
    ))
})


export {registerUser,LoginUser,logoutUser};