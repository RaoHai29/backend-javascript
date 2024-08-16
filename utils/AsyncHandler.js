// higer order function is used which accept func as parameters and behave like variable
// const AsyncHander = (func) => async (req,res,next)=>{
//     try {
//         await func(req,res,next)
//     } catch (error) {
//         res.status(err.code || 500).json(
//             {
//                 sucess: false,
//                 message: err.message
//             }
//         )
//     }
// }
//instead of using async/await, Promise.resolve is used to handle the asynchronous func and manage errors with .catch.

const AsyncHandler = (reqfunc) => (req, res, next) => {
    Promise.resolve(reqfunc(req, res, next))
        .catch((err) => next(err));
};
