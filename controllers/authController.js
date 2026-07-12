const prisma = require('../utils/prisma')


const regitser = async (req ,res, next)=>{
    try {
        const { name, email, password, confirmPassword } = req.body
    if (password !== confirmPassword) {
        return res.render("register", { error: "Password ain't matching.." });
    }
    const existingUser = await User.findOne({ email })
    if (existingUser) {
        return res.render("register", { error: "Email Already Exists!!!" })
    }
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {

            const newUser = await User.create({
                name,
                email,
                password: hash
            })
            console.log(newUser)
            res.redirect("/login")
        })
    })

    } catch (error) {
        next(error)
    }
}
const login = async (req, res, next)=>{
    try {
        const {email, password} = req.body
        const existingUser = await prisma.user.findUnique({where:{email}})
        if (!existingUser){
            return res.status(404).json({
            message : "User Not Found"
        })}
        bcrypt.compare(password, user.password, (err,result)=>{

        })


    } catch (error) {
        next(error)
    }
}