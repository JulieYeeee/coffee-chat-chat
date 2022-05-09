import React from "react";
import { Link } from "react-router-dom";
import inbox from "../static/picture/inbox.png";
import account from "../static/picture/account.png";

const Nav = () =>{
    return(
        <div className="nav-container">
            <nav>
                <Link to="/" className="logo">Coffee Chat Chat</Link>
                <ul className="menu">
                    <li className="member-list"><Link to="/memberlist">尋找咖啡聊對象</Link></li>
                    <li><Link to="/inbox"><img src={inbox}></img></Link></li>
                    <li><Link to="/account"><img src={account}></img></Link></li>
                </ul>
            </nav>
        </div>
    )
}

export default Nav;