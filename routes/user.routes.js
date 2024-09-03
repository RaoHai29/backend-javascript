import { Router } from "express";
import {registerUser,LoginUser, logoutUser} from './../controller/user.controller.js'
import {upload} from '../middleware/multer.js'
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router()

router.route("/register",registerUser).post(
    upload.fields(
        [
            {
                name: "avatar",
                maxCount:1
            },
            {
                name:"coverImage",
                maxCount:1
            }
        ]
    )
)

//Secure Route
router.route("/login",LoginUser).post(verifyJWT,logoutUser)
export default router;