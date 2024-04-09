import { useState } from "react"
import axios from "axios"

export function Balance(){
    
    const [bal,setBal]=useState(0)

    //fetch balance from backend
    axios.get("http://localhost:3000/api/v1/account/balance",
    {
     headers : {
         authorization : "Bearer "+localStorage.getItem("token")
     }
    }
    ).then( response =>{
        setBal(Math.round(response.data.balance * 100) / 100)
    })
    .catch((e)=>{
        console.log(e)
    })


    return(
        <div className="flex">
            <div className="font-bold text-lg">
            Your balance 
            </div>
           
            <div className="font-medium text-lg ml-4">
                Rs {bal}
            </div>
           
        </div>
    )
}