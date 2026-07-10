const errorMiddleware = (err, req, res,next)=>{
    if(res.headersSent){
        return next(err)
    }
    console.error(err);
    res.status(err.status || 500).json({
        success : false,
        message : err.message || "Internal Server Error"
    })
    
}

module.exports = errorMiddleware