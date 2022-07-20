import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "../src/component/Nav";
import DownNav from "../src/component/DownNav";
import Homepage from "../src/page/Homepage";
import Account from "../src/page/Account";
import Memberlist from "../src/page/Memberlist";
import Membership from "../src/page/Membership";
import Signin from "../src/page/Signin";
import Inbox from "../src/page/Inbox";
import Ask from "../src/page/Ask";
import Thankyou from "../src/page/Thankyou";

import firebase from "./Firebase";
import { getAuth } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import {
  getDatabase,
  ref,
  onValue,
  query,
  orderByChild,
  equalTo,
  set,
  push,
} from "firebase/database";

import { GetGlobalContext } from "../src/component/context/GlobalContext";
import { GlobalStyle } from "../src/component/style/GlobalStyle";
import { ThemeProvider } from "styled-components";

const App = () => {
  //styled-component 的 theme，全站共用主題色調
  const theme = {
    fontColor: {
      lightBGfont: "rgb(70, 70, 70)",
      yellowBGfont: "#ffffff",
    },

    bgColor: {
      mainBGColor: "#F2F2F0",
      yellowBGColor: "#F2B544",
    },

    decoColor: {
      decoGreen: "#6FBFB1",
      decoOrange: "#F27E63",
      decoYellow: "#f6d393",
      opacityWhite: "rgba(255, 255, 255, 0.75)",
    },
  };
  //useContext 取得共用 state 或 ref
  const {
    account,
    setAccount,
    orderNum,
    unreadCount,
    setunreadCount,
    askUnreadRef,
    replyUnreadRef,
    setnotificationCSS,
  } = GetGlobalContext();
  //初始抓取 DOM 的 ref,inbox會使用此 ref 來完成聊天視窗維持最底部功能
  const DOMref = React.createRef();
  //確認使用者的登入狀態
  useEffect(() => {
    const auth = getAuth(firebase);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAccount(user.uid);
        setnotificationCSS("menu-notification");
      } else {
        console.log("nobody");
      }
    });
  }, []);
  //全站監聽新訂單，若有新訂單，另起聊天室資料表
  const database = getDatabase(firebase);
  const orderRef = query(
    ref(database, "order/"),
    orderByChild("orderNum"),
    equalTo(orderNum)
  );
  onValue(orderRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      set(ref(database, "inbox/" + orderNum), {
        askAccount: data[orderNum]["askAccount"],
        askName: data[orderNum]["askName"],
        consultantAccount: data[orderNum]["consultantAccount"],
        consultantName: data[orderNum]["consultantName"],
        message: null,
        askUnread: 2,
        replyUnread: 0,
        time: Date.now(),
      });
      const msgListRef = ref(database, `inbox/${orderNum}/message`);
      const newMsgRef = push(msgListRef);
      set(newMsgRef, {
        from: "ask",
        content: data[orderNum]["askInfo"],
        time: Date.now(),
        read: false,
      });
      const newMsgRef2 = push(msgListRef);
      set(newMsgRef2, {
        from: "ask",
        content: data[orderNum]["askQuestion"],
        time: Date.now(),
        read: false,
      });
    }
  });
  //全站監聽新訊息更新，更新資料庫的未讀資料，並且確認是否與使用者有關，若是，更新資料庫中使用者的總未讀訊息
  const inboxRef = query(ref(database, "inbox/"));
  onValue(inboxRef, (snapshot) => {
    askUnreadRef.current = 0;
    replyUnreadRef.current = 0;
    const data = snapshot.val();
    let keys = Object.keys(data);
    keys.forEach((item) => {
      if (
        data[item]["consultantAccount"] &&
        data[item]["consultantAccount"] === account
      ) {
        let msgKeys = Object.keys(data[item]["message"]);
        msgKeys.forEach((single) => {
          if (
            data[item]["message"][single]["from"] === "ask" &&
            data[item]["message"][single]["read"] === false
          ) {
            askUnreadRef.current = askUnreadRef.current + 1;
          }
        });
      }
      if (data[item]["askAccount"] && data[item]["askAccount"] === account) {
        let msgKeys = Object.keys(data[item]["message"]);
        msgKeys.forEach((single) => {
          if (
            data[item]["message"][single]["from"] === "reply" &&
            data[item]["message"][single]["read"] === false
          ) {
            replyUnreadRef.current = replyUnreadRef.current + 1;
          }
        });
      }
    });
    set(ref(database, "user/" + account), {
      unread: askUnreadRef.current + replyUnreadRef.current,
    });
  });
  //資料庫中的總未讀數更新後，更新至網站右上角的訊息通知
  const checkUnreadRef = query(ref(database, `user/${account}`));
  onValue(checkUnreadRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      if (unreadCount !== data["unread"]) {
        setunreadCount(data["unread"]);
      }
    }
  });

  return (
    <div>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/account" element={<Account />} />
            <Route path="/memberlist" element={<Memberlist />} />
            <Route path="/membership/:id" element={<Membership />} />
            <Route path="/ask" element={<Ask />} />
            <Route path="/thankyou" element={<Thankyou />} />
            <Route path="/inbox/:id" element={<Inbox DOMref={DOMref} />} />
            <Route path="/signin" element={<Signin />} />
          </Routes>
          <DownNav />
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
};

export default App;
