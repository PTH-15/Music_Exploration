const prisma = require('../utils/prisma')
const bcrypt  = require('bcrypt')

const registerUser = async ({ name, email, password,username})=>{
    const existingUser = await prisma.user.findUnique({where: {email} })
    if (existingUser) {
        throw new Error("Email Already Exists...")
    }
    const hashedPass = await bcrypt.hash(password,10)
    const newUser = await prisma.user.create({
            data : {
                name,
                email,
                username,
                password: hashedPass
            }
        })
        return newUser
   
}

const loginUser = async ({email,password})=>{
    const existingUser = await prisma.user.findUnique({where: {email} })
    if (!existingUser) {
        throw new Error("User not Exists...")
    }
    const isMatch= await bcrypt.compare(password, existingUser.password) 
    if(!isMatch){throw new Error("Password aint matching...")}

    return existingUser
}

module.exports = {
    registerUser,loginUser
}