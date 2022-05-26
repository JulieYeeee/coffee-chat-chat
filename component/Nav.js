import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import inbox from "../static/picture/inbox.png";
import user from "../static/picture/account.png";
import logo from "../static/picture/logo.png";
import signout from "../static/picture/signout.png";

import firebase from "../src/Firebase";
import { getAuth } from "firebase/auth";
import { signOut } from "firebase/auth";

import { getDatabase,ref,onValue,query,set } from "firebase/database";



const Nav = ( {account,setAccount} ) =>{

    
    const database = getDatabase(firebase);
    let [unreadCount,setunreadCount]=useState();  
    const checkUnreadRef=query(ref(database, 'user/',account)); 
    onValue(checkUnreadRef, (snapshot) => {
        const data = snapshot.val();
        if(data[account]){
            if(unreadCount!==data[account]["unread"]){
                setunreadCount(data[account]["unread"])
            }else{
                console.log("Nav check nothing change");
            }

        };
        
    });

    const signoutHandler =()=>{
            const auth = getAuth(firebase);
            signOut(auth).then(() => {
                setAccount(false);
                console.log("Sign-out successful.");
            // Sign-out successful.
            }).catch((error) => {
                console.log(error);
            // An error happened.
            });

    }

    return(
        <div className="nav-container">
            <nav>
                <Link to="/" className="logo"><img src={logo}></img></Link>
                <ul className="menu">
                    <li className="member-list"><Link to="/membership/nxOet24zw3gZ5ZqkiJfKwwS72Iy2">尋找咖啡聊對象</Link></li>
                    <li>
                        <Link to="/inbox" ><img src={inbox}></img></Link>
                        <div className="menu-notification">{unreadCount}</div>
                    </li>
                    <li><Link to="/account" ><img src={user}></img></Link></li>
                    { account? <li onClick={signoutHandler}><img src={signout} className="signout"></img></li> :null

                    }
                   
                </ul>
            </nav>
        </div>
    )
}

export default Nav;