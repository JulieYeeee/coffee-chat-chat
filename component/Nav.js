import React from "react";
import { Link,useNavigate } from "react-router-dom";
import inbox from "../static/picture/inbox.png";
import user from "../static/picture/account.png";
import logo from "../static/picture/logo.png";
// import firebase from "../src/Firebase";
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


const Nav = ( {account,setAccount} ) =>{


    return(
        <div className="nav-container">
            <nav>
                <Link to="/" className="logo"><img src={logo}></img></Link>
                <ul className="menu">
                    <li className="member-list"><Link to="/memberlist">尋找咖啡聊對象</Link></li>
                    <li><Link to="/inbox" ><img src={inbox}></img></Link></li>
                    <li><Link to="/account" ><img src={user}></img></Link></li>
                </ul>
            </nav>
        </div>
    )
}

export default Nav;