import React,{useEffect} from "react";
import { useNavigate } from "react-router-dom";
import {  getAuth, onAuthStateChanged } from "firebase/auth";
import checkAuth from "../src/CheckAuth";


const Account = ( {account,setAccount} ) =>{
    useEffect(()=>{
        checkAuth;
        if(account){
            console.log("someone login");
        }else{
            // let navigate=useNavigate();
            // navigate("/signin");
            console.log("nobody login");
        };},[]
    );

    
       
    


    return(
        <main>
            Hi
        </main>
    )
}

export default Account;