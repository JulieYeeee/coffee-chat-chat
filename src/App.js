// React module
import React, { useEffect} from "react";
import { BrowserRouter , Routes , Route } from "react-router-dom";
//components
import Nav from "../component/Nav";
import Homepage from "../page/Homepage";
import Account from "../page/Account";
import Memberlist from "../page/Memberlist";
import Membership from "../page/membership";
import Signin from "../page/Signin";
import Inbox from "../page/Inbox";
import Ask from "../page/Ask";
import Thankyou from "../page/Thankyou";

import Firebase from "./Firebase";
import { getAuth } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref ,onValue,query,orderByChild,equalTo,set,push } from "firebase/database";

//usecontext
import { GetGlobalContext } from "../component/context/GlobalContext";
//styled-component - Global style & Theme
import { GlobalStyle } from "../component/style/GlobalStyle";
import { ThemeProvider } from "styled-components";



const App = () => {
    
    //styled-component 的 theme，全站共用主題色調
    const theme = {
        fontColor:{
            lightBGfont:"rgb(70, 70, 70)",
            yellowBGfont:"#ffffff",
        },

        bgColor:{
            mainBGColor:"#F2F2F0",
            yellowBGColor:"#F2B544",
        },
          
        decoColor:{
            decoGreen:"#6FBFB1",
            decoOrange: "#F27E63",
            decoYellow: "#f6d393",
            opacityWhite: "rgba(255, 255, 255, 0.75)"

        }
      }
      

    //useContext 取得共用 state 或 ref
    const {
        account,
        setAccount,
        orderNum,
        unreadCount,
        setunreadCount,
        askUnreadRef,
        replyUnreadRef,
        setnotificationCSS
    } = GetGlobalContext();

    //初始抓取 DOM 的 ref,inbox會使用此 ref 來完成聊天視窗維持最底部功能
    const DOMref = React.createRef();


    //確認使用者的登入狀態
    useEffect(() => {
        const auth = getAuth(Firebase);
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setAccount(user.uid);
                setnotificationCSS("menu-notification");
            } else {
                console.log("nobody");
            }
        });
    }, []);


    //全站隨時監聽是否有跟使用者相關的新訂單，並觸發更新右上角訊息未讀
    const database = getDatabase(Firebase);
    const orderRef = query(ref(database, 'order/'), orderByChild("orderNum"), equalTo(orderNum));
    onValue(orderRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
            set(ref(database, 'inbox/' + orderNum), {
                askAccount: data[orderNum]["askAccount"],
                askName: data[orderNum]["askName"],
                consultantAccount: data[orderNum]["consultantAccount"],
                consultantName: data[orderNum]["consultantName"],
                message: null,
                askUnread: 2,
                replyUnread: 0,
                time: Date.now()
            });
            const msgListRef = ref(database, `inbox/${orderNum}/message`);
            const newMsgRef = push(msgListRef);
            set(newMsgRef, {
                from: "ask",
                content: data[orderNum]["askInfo"],
                time: Date.now(),
                read: false
            });
            const newMsgRef2 = push(msgListRef);
            set(newMsgRef2, {
                from: "ask",
                content: data[orderNum]["askQuestion"],
                time: Date.now(),
                read: false
            });
        }
    });

  
    //全站監聽新訊息更新，更新資料庫的未讀資料，並且確認是否與使用者有關，若是，更新資料庫中使用者的總未讀訊息
    const inboxRef = query(ref(database, 'inbox/'));
    onValue(inboxRef, (snapshot) => {
        askUnreadRef.current = 0;
        replyUnreadRef.current = 0;
        const data = snapshot.val();
        let keys = Object.keys(data);
        keys.forEach((item) => {
            if (data[item]["consultantAccount"] && data[item]["consultantAccount"] === account && data[item]["askUnread"]) {
                askUnreadRef.current = askUnreadRef.current + data[item]["askUnread"];
            }
            if (data[item]["askAccount"] && data[item]["askAccount"] === account && data[item]["replyUnread"]) {
                replyUnreadRef.current = replyUnreadRef.current + data[item]["replyUnread"];
            }
        })
        set(ref(database, 'user/' + account), {
            unread: askUnreadRef.current + replyUnreadRef.current,
        });
    });

    
   //資料庫中的總未讀數更新後，更新至網站右上角的訊息通知
   const checkUnreadRef = query(ref(database, `user/${account}`));
   onValue(checkUnreadRef, (snapshot) => {
       const data = snapshot.val();
       if (data) {
           if (unreadCount !== data["unread"]) {
               setunreadCount(data["unread"])
           }
       };
   });



    return(
        <div>
            <ThemeProvider theme={theme}>
            <GlobalStyle/>
            <BrowserRouter>
                <Nav />
                <Routes>
                    <Route path="/" element={<Homepage/>}/>
                    <Route path="/account" element={<Account/> }/>
                    <Route path="/memberlist" element={ <Memberlist /> }/>
                    <Route path= "/membership/:id" element={ <Membership />}/>
                    <Route path="/ask" element={ <Ask /> }/>
                    <Route path="/thankyou" element={ <Thankyou /> }/>
                    <Route path="/inbox/:id" element={<Inbox DOMref={DOMref}/> }/>
                    <Route path="/signin" element={ <Signin />}/>
                </Routes>
            </BrowserRouter>
            </ThemeProvider>
            
        </div>
    )
}

export default App;