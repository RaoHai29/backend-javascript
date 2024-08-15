import connectDB from '../database/index.js'
import dotenv from 'dotenv'

dotenv.config(
    {
        path: "./env"
    }
)

connectDB()







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