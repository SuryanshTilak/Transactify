import React from 'react'
import { useState } from 'react'
import {Heading} from '../components/Heading'
import { SubHeading } from '../components/SubHeading'
import { InputBox } from '../components/InputBox'
import { Button } from '../components/Button'
import { BottomWarning } from '../components/BottomWarning'
import { useNavigate } from "react-router-dom";
import axios from "axios"

export function Signup(){
   const[firstName,setFirstName]=useState("")
   const[lastName,setLastName]=useState("")
   const[username,setUserName]=useState("")
   const[password,setPassword]=useState("")
   const navigate=useNavigate()

   const handleSubmit= async(e) =>{

    //check and save data in database
    await axios.post("http://localhost:3000/api/v1/user/signup", {
        username,
        firstName,
        lastName,
        password
    })
    .then( (response) => {
        localStorage.setItem("token",response.data.token)
        navigate("/dashboard")
    })
    .catch((err) => {
        alert(err.response.data.message)
    })     
}

    return( <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label="Sign Up"/>
        <SubHeading label="Enter your information to create an account"/>
         <InputBox label="First Name" placeholder="Suryansh" onChange={(e)=>{
            setFirstName(e.target.value)
        }}/>
        <InputBox label="Last Name" placeholder="Tilak" onChange={(e)=>{
            setLastName(e.target.value)
        }}/>
        <InputBox label="Email" placeholder="suryansh.tilak@gmail.com" onChange={(e)=>{
            setUserName(e.target.value)
        }}/>
        <InputBox label="Password" placeholder="123456" onChange={(e)=>{
            setPassword(e.target.value)
        }}/>
        <div className='pt-2'>
        <Button label="Sign up"  onClick={handleSubmit} />
        </div>
        <BottomWarning label="Already have an account?" linkText="Sign in" to="/signin"/>
        </div>
        </div>
    </div>
    ) 
}