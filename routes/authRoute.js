const express = require('express')
const {register,login} = require('../controllers/authController')
const { isloggedin } = require('../middleware/authMiddleware') 
const router = express.Router()

router.post("/register",register)
router.post("/login",login)
router.get('/me', isloggedin, (req,res)=>{
    res.json({
        message:"You are logged in..",
        userId:req.session.userId
    })
})


module.exports = router