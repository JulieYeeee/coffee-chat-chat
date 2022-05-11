import React,{useEffect} from "react";
import { useNavigate } from "react-router-dom";
import result from "../src/CheckAuth";

const Inbox = ( {account,setAccount}) =>{

    let navigate = useNavigate();
    useEffect(()=>{
        if(result){
            console.log(result);
            navigate("/");
        }

    })
  


    return(
        <div>hi</div>
    )

}

export default Inbox;