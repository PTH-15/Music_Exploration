const authMiddleware= (req, res, next)=>{
    console.log("checking user....");
    next()
}

const isloggedin = (req,res,next)=>{
    if(!req.session.userId){
        return res.status(401).json({
            message:"Login Required"
        })
    }
    next()
}

module.exports = {authMiddleware,isloggedin}