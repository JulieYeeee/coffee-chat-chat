import React from "react";
import { Link } from "react-router-dom";
//圖片
import inbox from "../static/picture/inbox.png";
import user from "../static/picture/account.png";
import logo2 from "../static/picture/logo2.png";
import signout from "../static/picture/signout.png";
//firebase modules
import firebase from "../src/Firebase";
import { getAuth } from "firebase/auth";
import { signOut } from "firebase/auth";
//useContext
import { GetGlobalContext } from "./context/GlobalContext";
//styled component

import { NavContainer,NavSelf,LogoLink,RightMenu,FunctionBox,SearchLink, Item,Notification} from "./style/Nav.styled";




const Nav = () =>{
    //useContext 取得共用 state
    const {
        account,
        setAccount,
        unreadCount,
        notificationCSS,
        setnotificationCSS
    } = GetGlobalContext();


    const signoutHandler = () => {
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
            <NavSelf>
                <LogoLink to="/"><img src={logo2}></img></LogoLink>
                <RightMenu>
                    <Item>
                        <SearchLink  to="/memberlist" >尋找咖啡聊對象</SearchLink>
                    </Item>
                    <Item>
                        <FunctionBox to="/inbox/default"><img src={inbox}></img></FunctionBox>
                        <Notification closeCheck={notificationCSS}>{unreadCount}</Notification>
                    </Item>
                    <Item>
                    <FunctionBox to="/account"><img src={user}></img></FunctionBox>

                    </Item>
                    { account? <Item onClick={signoutHandler}><img src={signout}></img></Item> :null }
                </RightMenu>
            </NavSelf>

        </NavContainer>  

    )
}

export default Nav;