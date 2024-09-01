import connectDB from '../database/index.js'
import dotenv from 'dotenv'
import connectDB from "./db/index.js";
import {app} from './app.js'

dotenv.config(
    {
        path: "./env"
    }
)



connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`Server is running on ${process.env.PORT} `)
    })
})
.catch((error)=>{
    console.log("ERRORRR in mongo connection!!",error)
})







// ;(async ()=>{
//     try{
//         await mongoose.connect(`${process.env.MONGODB_URL}/ ${DB_Name}`)
//         app.on("Error",(error)=>{
//             console.log("Error:".error)
//             throw error
//         })
//         app.listen(port, ()=>{
//             console.log(`Server is running on ${port} `)
//         })
//     }catch(error){
//         console.error("Error:",error)
//         throw err
//     }
// })()