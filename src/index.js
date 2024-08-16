import connectDB from '../database/index.js'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'

dotenv.config(
    {
        path: "./env"
    }
)

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}))

app.use(express.json({limit: "32kb"}))
app.use(express.urlencoded({extended:true, limit:"32kb"}))
app.use(express.static("public"))
app.use(cookieParser())



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