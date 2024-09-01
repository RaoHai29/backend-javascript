import { Handler } from '../utils/Handler.js'

const registerUser = Handler(async (req,res) => {
    res.status(200).json({
        message: 'Running Status Ok :200!'
    })
    
})

export {registerUser};