import React from "react";
import { Link } from "react-router-dom";

import inbox from "../../static/picture/inbox.png";
import accounticon from "../../static/picture/account.png";
import signout from "../../static/picture/signout.png";

import { DownNavBox, DownNotification } from "./style/Nav.styled";
import { GetGlobalContext } from "./context/GlobalContext";

import firebase from "../../src/Firebase";
import { getAuth } from "firebase/auth";
import { signOut } from "firebase/auth";

const DownNav = () => {
  //useContext 取得共用 state
  const {
    account,
    setAccount,
    unreadCount,
    notificationCSS,
    setnotificationCSS,
  } = GetGlobalContext();

  const signoutHandler = () => {
    const auth = getAuth(firebase);
    signOut(auth)
      .then(() => {
        setAccount(false);
        setnotificationCSS(null);
        // Sign-out successful.
      })
      .catch((error) => {
        console.log(error);
        // An error happened.
      });
  };

  return (
    <DownNavBox>
      <Link to="/inbox/default">
        <img src={inbox}></img>
        <DownNotification closeCheck={notificationCSS}>
          {unreadCount}
        </DownNotification>
      </Link>

      <Link to="/account">
        <img src={accounticon}></img>
      </Link>

      {account ? (
        <div onClick={signoutHandler}>
          <img src={signout}></img>
        </div>
      ) : null}
    </DownNavBox>
  );
};

export default DownNav;
