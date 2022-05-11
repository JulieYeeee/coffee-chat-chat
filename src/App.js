import React, { useState } from "react";
import { BrowserRouter , Routes , Route ,Navigate } from "react-router-dom";
import Nav from "../component/Nav";
import Homepage from "../page/Homepage";
import Account from "../page/Account";
import Memberlist from "../page/Memberlist";
import Signin from "../page/Signin";
import Inbox from "../page/Inbox";

import firebase from "./Firebase";


const App = () =>{
    let [ account , setAccount ] = useState (false);
    


    return(
        <div>
            <BrowserRouter>
                <Nav account={account} setAccount={setAccount}/>
                <Routes>
                    <Route path="/" element={<Homepage account={account} setAccount={setAccount} />}/>
                    <Route path="/account" element={<Account  account={account} setAccount={setAccount}/>}/>
                    <Route path="/memberlist" element={<Memberlist  account={account} setAccount={setAccount}/>}/>
                    <Route path="/inbox" element={ <Inbox  account={account} setAccount={setAccount}/>}/>
                    <Route path="/signin" element={ <Signin  account={account} setAccount={setAccount}/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App;