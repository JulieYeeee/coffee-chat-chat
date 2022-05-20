// React module
import React, { useState,useEffect } from "react";
import { BrowserRouter , Routes , Route, Navigate } from "react-router-dom";
//components
import Nav from "../component/Nav";
import Homepage from "../page/Homepage";
import Account from "../page/Account";
import Memberlist from "../page/Memberlist";
import Membership from "../page/membership";
import Signin from "../page/Signin";
import Inbox from "../page/Inbox";
import Ask from "../page/Ask";

import firebase from "./Firebase";
import { getAuth } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { getStorage , ref} from "firebase/storage";
import { signOut } from "firebase/auth";




const App = () =>{
    let [ account , setAccount ] = useState (false);
    let [ username, setUsername ]=useState("");
    // function check (){
    //     const auth = getAuth();
    //     onAuthStateChanged(auth, (user) => {
    //     if (user) {
    //         setAccount(user.uid);
    //         console.log(user.uid);
    //     } else {
    //         console.log("nobody");
    //     }
    //     });
    // }
///sign out funtion
    useEffect(()=>{
        const auth = getAuth();
        signOut(auth).then(() => {
            console.log("Sign-out successful.");
        // Sign-out successful.
        }).catch((error) => {
        // An error happened.
        });

    },[])
    
    
    
    useEffect(()=>{
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
        if (user) {
            setAccount(user.uid);
            console.log("home:",account);
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
                    <Route path="/account" element={<Account account={account} setAccount={setAccount} username={username} setUsername={setUsername} /> }/>
                    <Route path="/memberlist" element={ <Memberlist  account={account} setAccount={setAccount}/> }/>
                    <Route path= "/membership/:id" element={ <Membership  account={account} setAccount={setAccount}/>}/>
                    {/* <Route path="/ask" element={account ? <Ask account={account} setAccount={setAccount} /> : <Navigate to='/signin' replace /> }/> */}
                    <Route path="/ask" element={ <Ask account={account} setAccount={setAccount} /> }/>

                    <Route path="/inbox" element={account ? <Inbox  account={account} setAccount={setAccount}/> : <Navigate to='/signin' replace />}/>
                    <Route path="/signin" element={ <Signin  account={account} setAccount={setAccount} username={username} setUsername={setUsername}/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App;