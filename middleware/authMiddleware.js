const authMiddleware= (req, res, next)=>{
    console.log("checking user....");
    next()
}

module.exports = authMiddleware