const express=require('express')
const mongoose=require('mongoose')
const {Accounts}=require('../db')
const {authMiddleware} =require("./middlleware")

const router=new express.Router()

router.use(express.json())

router.get('/balance',authMiddleware,async(req,res)=>{
    
    //find User is present or not
    const account=await Accounts.findOne(
        {
            userId : req.userId
        }
    )

    res.status(200).json({
        balance : account.balance
    })
})



router.post("/transfer",authMiddleware,async(req,res)=>{

    const session=await mongoose.startSession()

    session.startTransaction()

    const amount=req.body.amount
    const to=req.body.to
    const from=req.userId

    //check Receiver Account exist or Not
    const receiver=await Accounts.findOne({
        userId : to
    }).session(session)

    if (!receiver)
    {
        await session.abortTransaction()
        
        return res.status(400).json({
            message : "Invalid Account"
        })
    }

    // Find Sender
    const sender=await Accounts.findOne(
        {userId : from}
    ).session(session)

    const senderBalance=sender.balance
    const receiverBalance=receiver.balance

    
    if(senderBalance<amount)
    {
        await session.abortTransaction()
        return res.status(400).json({
            message : "Insufficient Balance"
        })
    }

    // //Update Account
    await Accounts.updateOne({userId : from},{ $inc: {balance : -amount} }).session(session)
    await Accounts.updateOne({userId : to},  { $inc: {balance : amount} }).session(session)
    

    await session.commitTransaction()

    res.status(200).json({
       message : "Transfer Successfully"
    })

})



module.exports=router
