
const mongoose=require("mongoose")

//connect to mongoDB database
mongoose.connect("mongodb+srv://suryansh:tilak@cluster0.graxnu4.mongodb.net/paytm").then(()=>{
    console.log("Connected to MongoDB")
});

//User Schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    password: {
        type: String,
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    }
});

//Account Schema
const accountsSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    balance : {
        type : Number,
        required : true
    }
})

const User = mongoose.model('User',userSchema)
const Accounts=mongoose.model('Account',accountsSchema)

module.exports={
    User, Accounts
}

