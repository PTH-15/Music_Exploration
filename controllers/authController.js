const authService = require('../services/auth')


const register = async (req ,res, next)=>{
    try {
        const {email, name, password, confirmPassword,username} = req.body
        if (password !== confirmPassword){
            return res.status(400).json({message:"Password ain't matching.."})
        }
        const user = await authService.registerUser({
            name,
            email,
            password,
            username
        })
        res.status(201).json({
            message:"User created successfully",
            user
        })
    } catch (error) {
        next(error)
    }
}
const login = async (req, res, next)=>{
    try {
        const {email, password} = req.body
        const user = await authService.loginUser({email,password})
        // req.session.userId = user.id
        res.status(200).json({
            message:"Login Successfully",
            user
        })
        
    } catch (error) {
        next(error)
    }
}


module.exports={register,login}