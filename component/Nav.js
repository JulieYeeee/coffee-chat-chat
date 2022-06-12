import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import inbox from "../static/picture/inbox.png";
import user from "../static/picture/account.png";
import logo from "../static/picture/logo.png";
import logo2 from "../static/picture/logo2.png";
import signout from "../static/picture/signout.png";

import firebase from "../src/Firebase";
import { getAuth } from "firebase/auth";
import { signOut } from "firebase/auth";

import { GetGlobalContext } from "./context/GlobalContext";

import { getDatabase,ref,onValue,query,set } from "firebase/database";


import { NavContainer,NavSelf,LogoLink,RightMenu,SearchLink, Item,Notification} from "./style/Nav.styled";



const Nav = () =>{

    const {account,setAccount,unreadCount,setunreadCount,notificationCSS,setnotificationCSS}=GetGlobalContext();
    // const database = getDatabase(firebase);
    // let [unreadCount,setunreadCount]=useState();  
    // const checkUnreadRef=query(ref(database, 'user/',account)); 
    // onValue(checkUnreadRef, (snapshot) => {
    //     const data = snapshot.val();
    //     if(data[account]){
    //         if(unreadCount!==data[account]["unread"]){
    //             setunreadCount(data[account]["unread"])
    //         }else{
    //             console.log("Nav check nothing change");
    //         }

    //     };
        
    // });

    const signoutHandler =()=>{
            const auth = getAuth(firebase);
            signOut(auth).then(() => {
                setAccount(false);
                setnotificationCSS(null);
            // Sign-out successful.
            }).catch((error) => {
                console.log(error);
            // An error happened.
            });

    }

    return(
        <NavContainer>
        {/* <div className="nav-container"> */}
        <NavSelf>
            {/* <nav> */}
                <LogoLink to="/"><img src={logo2}></img></LogoLink>
                {/* <Link to="/" className="logo"><img src={logo2}></img></Link> */}
                <RightMenu>
                {/* <ul className="menu"> */}
                    <Item>
                        <SearchLink  to="/memberlist" borderStyle="yes">尋找咖啡聊對象</SearchLink>
                        {/* <Link to="/memberlist" borderStyle="yes">尋找咖啡聊對象</Link> */}
                    </Item>

                    <Item>
                        <Link to="/inbox/default" ><img src={inbox}></img></Link>
                        <Notification closeCheck={notificationCSS}>{unreadCount}</Notification>
                        {/* <div className={notificationCSS}>{unreadCount}</div> */}
                    </Item>

                    <Item>
                    <Link to="/account" ><img src={user}></img></Link>
                    </Item>
                    
                    { account? <Item onClick={signoutHandler}><img src={signout}></img></Item> :null }
                    
                    {/* <li className="member-list"><Link to="/memberlist">尋找咖啡聊對象</Link></li>
                    <li className="inbox-notification">
                        <Link to="/inbox/default" ><img src={inbox}></img></Link>
                        <div className={notificationCSS}>{unreadCount}</div> */}
                        {/* {unreadCount && <div className="menu-notification">{unreadCount}</div>} */}
                    {/* </li>
                    <li><Link to="/account" ><img src={user}></img></Link></li>
                    { account? <li onClick={signoutHandler}><img src={signout} className="signout"></img></li> :null} */}
                   
                {/* </ul> */}
                </RightMenu>
            {/* </nav> */}
        </NavSelf>
        {/* </div> */}
        </NavContainer>
    )
}

export default Nav;