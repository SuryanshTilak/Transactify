
const express=require('express')

const router=new express.Router()

const {User,Accounts} =require("../db")
const {authMiddleware} =require("./middlleware")

const jwt=require("jsonwebtoken")
const {JWT_SECRET}=require('../config')
const zod=require("zod")



const schema=zod.object({
    username : zod.string().email(),
    password : zod.string(),
    firstName : zod.string(),
    lastName : zod.string()
})

router.use(express.json())


//Add new User in database
router.post("/signup",async(req,res)=>{ 
    
    const {success} = schema.safeParse(req.body)
 
    if(!success)
    {
        return res.status(400).json({
            message : "Incorrect inputs"
        })
    }

    const existingUser=await User.findOne({
        username : req.body.username
    })

    if(existingUser)
    {
        return res.status(400).json({
            message : "Email already taken"
        })
    }

    const user=await User.create({
        username : req.body.username,
        password : req.body.password,
        firstName : req.body.firstName,
        lastName : req.body.lastName
    })
    
    const userId=user._id

    const account=await Accounts.create({
        userId,
        balance : 1+ Math.random()*10000
    })


    const token = jwt.sign({
        userId
    },JWT_SECRET)

    res.json({
        message : "USER CREATED SUCCESSFULLY",
        token : token
    })

})


//Signin Schema Check
const signinSchema=zod.object({
    username : zod.string().email(),
    password : zod.string()
})



//Verify user is already present or not in database
router.post('/signin',async (req,res)=>{

    try{
    const result=signinSchema.safeParse(req.body)

    if(!result.success)
    {
        return res.status(411).json({
            message : "Incorrect input"
        })
    }
      
    const existingUser=await User.findOne({
        username : req.body.username,
        password : req.body.password
    })

    if(existingUser)
    {
        const token=jwt.sign({
            userId : existingUser._id
         },JWT_SECRET)

         res.status(200).json({
            token : token
        })
    }
    else
    {
        res.status(411).json({
            message : "Invalid Username or password"
        })
    }
    }
    catch(e)
    {
        console.log(e)
        res.status(411).json({message : "INVALID"})
    }
   
})


router.use(authMiddleware)


//Schema for updation
const updateSchema=zod.object({
    username : zod.string().optional(),
    firstName : zod.string().optional(),
    lastName : zod.string().optional()
})



//update user information in database
router.put("/",async (req,res)=>{

    const {success}=updateSchema.safeParse(req.body)
    if(!success)
    {
        return res.status(411).json({
            message : "Wrong Input"
        })
    }

    const result=await User.updateOne({ _id: req.userId }, req.body);
    
    res.json({
        msg : "DONE"
    })
})




//return all user present in database
router.get("/bulk",async(req,res)=>{
    const filter=req.query.filter || ""
 
   const users=await User.find({
    $or : [
        {firstName : { "$regex" : filter ,$options : 'i'} } ,
        { lastName : { "$regex" : filter, $options : 'i'} }
    ]
    ,
    $and : [
        {
            _id : { "$ne" : req.userId }
        }
    ]
   })

   res.status(200).json({
    user : users.map(user =>({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id
    }))
})

})



//return the firstName of user
router.get("/firstname",authMiddleware,async(req,res)=>{

    const loggedUser=await User.findOne(
        {
            _id : req.userId
        }
    )

    res.status(200).json({
        firstname : loggedUser.firstName
    })
})


module.exports=router