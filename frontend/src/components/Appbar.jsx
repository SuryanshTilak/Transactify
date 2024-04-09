import { Button } from "./Button"
import {useNavigate} from "react-router-dom"
import { useState } from "react"
import axios from "axios"

export function Appbar({label}){
    const navigate=useNavigate()

    //fetch firstname of user from backend
    const [firstName,setFirstName]=useState("")
    axios.get("https://transactify.onrender.com/api/v1/user/firstname",
    {
     headers : {
         authorization : "Bearer "+localStorage.getItem("token")
     }
    }
    ).then( response =>{
        setFirstName(response.data.firstname )
    })
    .catch(e=>{
        console.log(e)
    })

    return(
    <div className="flex justify-between border rounded border-slate-300 shadow h-14">
        <div className="flex flex-col justify-center font-medium h-full ml-4">
            {label}
        </div>
        <div className="flex items-center">
            <div className="rounded-full bg-slate-200 flex justify-center py-1.5 px-2 mx-3">
                <div className="flex flex-col justify-center h-full text-l font-medium">
                    {firstName}
                </div>                
            </div>
            <div>
            <Button className="flex justify-center" 
            label={"logout"} onClick={()=>{
                localStorage.removeItem("token")
                navigate("/signin")
            }}/>
            </div>
        </div>
    </div>
    )
}
