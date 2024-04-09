import React,{useState} from 'react'
import { Heading } from '../components/Heading'
import { SubHeading } from '../components/SubHeading'
import { InputBox } from '../components/InputBox'
import { Button } from '../components/Button'
import { BottomWarning } from '../components/BottomWarning'
import {useNavigate} from "react-router-dom"
import axios from 'axios'

export function Signin(){
    const[username,setUserName]=useState("")
    const[password,setPassword]=useState("")
    const navigate=useNavigate()

    //handle submit query
    const handleSubmit= async(e) =>{
            e.preventDefault()
            
            //verify login information from database
            await axios.post("http://localhost:3000/api/v1/user/signin",{
                username,
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

    return(
        <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label="Sign in"/>
        <SubHeading label="Enter your credentials to access your Account"/>
        <InputBox label="Email" placeholder="suryansh.tilak@gmail.com" onChange={(e)=>{
            setUserName(e.target.value)
        }}/>
        <InputBox label="Password" placeholder="123456" onChange={(e)=>{
            setPassword(e.target.value)
        }}/>
        <div>
        <Button label="Sign In" onClick={ handleSubmit }
        />
        </div>
        <BottomWarning label="Don't have an account?" linkText="Sign Up" to="/"/>
        </div>
        </div>
        </div>
        
    )
}