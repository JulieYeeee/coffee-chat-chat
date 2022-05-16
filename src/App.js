import React, { useState,useEffect } from "react";
import { BrowserRouter , Routes , Route, Navigate } from "react-router-dom";
import Nav from "../component/Nav";
import Homepage from "../page/Homepage";
import Account from "../page/Account";
import Memberlist from "../page/Memberlist";
import Signin from "../page/Signin";
import Inbox from "../page/Inbox";
import firebase from "./Firebase";
import { getAuth } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { signOut } from "firebase/auth";




const App = () =>{

    // useEffect(()=>{
    //     const auth = getAuth();
    //     signOut(auth).then(() => {
    //         console.log("Sign-out successful.");
    //     // Sign-out successful.
    //     }).catch((error) => {
    //     // An error happened.
    //     });

    // },[])
    
    let [ account , setAccount ] = useState (false);
    useEffect(()=>{
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
        if (user) {
            setAccount(user.uid);
            console.log(user.uid);
        } else {
            console.log("nobody");
        }
        });

    },[]);
    


    return(
        <div>
            <BrowserRouter>
                <Nav account={account} setAccount={setAccount}/>
                <Routes>
                    <Route path="/" element={<Homepage account={account} setAccount={setAccount} />}/>
                    <Route path="/account" element={<Account account={account} setAccount={setAccount}/> }/>
                    <Route path="/memberlist" element={account ? <Memberlist  account={account} setAccount={setAccount}/> : <Navigate to='/signin' replace />}/>
                    <Route path="/inbox" element={account ? <Inbox  account={account} setAccount={setAccount}/> : <Navigate to='/signin' replace />}/>
                    <Route path="/signin" element={ <Signin  account={account} setAccount={setAccount}/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App;