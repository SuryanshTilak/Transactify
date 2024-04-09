const { JWT_SECRET }=require("../config");

const jwt=require('jsonwebtoken')
const {User}=require('../db')


//function to verify user is already logged in or not
function authMiddleware(req,res,next)
{
    const Authorization=req.headers.authorization

    if(!Authorization || !Authorization.startsWith('Bearer '))
    {
        return res.status(403).json({})
    }

    const token=Authorization.split(' ')[1]

    try{
        const decoded=jwt.verify(token,JWT_SECRET)
       
        req.userId=decoded.userId;

        next();
    }
    catch(err)
    {
        return res.status(403).json({})
    }
}

module.exports={
    authMiddleware
}