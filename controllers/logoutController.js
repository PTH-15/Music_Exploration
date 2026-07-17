const session  = require('express-session')

const logout = async (req,res,next)=>{
    try {
        req.session.destroy((err)=>{
            if(err){return next(err)}
            res.clearCookie("connect.sid")
            res.status(200).json({message:"Logout Successfully.."})
        })
        
    } catch (error) {
        next(error)
    }
}

module.exports = {logout}