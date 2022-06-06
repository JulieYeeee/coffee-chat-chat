// React module
import React, { useState,useEffect, useRef } from "react";
import { BrowserRouter , Routes , Route, Navigate } from "react-router-dom";
//components
import Nav from "../component/Nav";
import Homepage from "../page/Homepage";
import Account from "../page/Account";
import Memberlist from "../page/Memberlist";
import Membership from "../page/membership";
import Signin from "../page/Signin";
import Inbox from "../page/Inbox";
import InboxDefault from "../page/Inbox-default";
import Ask from "../page/Ask";
import Thankyou from "../page/Thankyou";

import Firebase from "./Firebase";
import { getAuth } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref ,onValue,query,orderByChild,equalTo,set,push } from "firebase/database";






const App = () =>{
    const DOMref=React.createRef();

    let [ account , setAccount ] = useState (false);
    let [ username, setUsername ]=useState(null);
    let [ orderNum, setOrderNum ]=useState("");



    let [notificationCSS,setnotificationCSS]=useState("menu-notification menu-notification-hide");
    useEffect(()=>{
        const auth = getAuth(Firebase);
        onAuthStateChanged(auth, (user) => {
        if (user) {
            setAccount(user.uid);
            setnotificationCSS("menu-notification");
        } else {
            console.log("nobody");
        }
        }); 

    },[]);


   
        const database = getDatabase(Firebase);
        const orderRef=query(ref(database, 'order/'), orderByChild("orderNum"), equalTo(orderNum));
        onValue(orderRef, (snapshot) => {
        const data = snapshot.val();
        if(data){
            set(ref(database, 'inbox/' + orderNum), {
              askAccount: data[orderNum]["askAccount"],
              askName: data[orderNum]["askName"],
              consultantAccount:data[orderNum]["consultantAccount"],
              consultantName: data[orderNum]["consultantName"],
              message:null,
              askUnread:2,
              replyUnread:0,
              time:Date.now()
            });
            const msgListRef = ref(database, `inbox/${orderNum}/message`);
            const newMsgRef = push(msgListRef);
            let time=new Date();
            set(newMsgRef, {
                from:"ask",
                content: data[orderNum]["askInfo"],
                time:Date.now(),
                read:false
            });
            
            let time2=new Date();
            const newMsgRef2 = push(msgListRef);
            set(newMsgRef2, {
                from:"ask",
                content: data[orderNum]["askQuestion"],
                time:Date.now(),
                read:false
            });
          }
        }
        
    );

  

    const inboxRef=query(ref(database, 'inbox/'));
    let askUnreadRef=useRef();
    let replyUnreadRef=useRef();
    onValue(inboxRef, (snapshot) => {
        askUnreadRef.current=0;
        replyUnreadRef.current=0;
        const data = snapshot.val();
        let keys=Object.keys(data);
        keys.forEach((item)=>{
            if (data[item]["consultantAccount"] && data[item]["consultantAccount"]===account && data[item]["askUnread"]){
                askUnreadRef.current=askUnreadRef.current+data[item]["askUnread"]; 
            }
            if (data[item]["askAccount"] && data[item]["askAccount"]===account && data[item]["replyUnread"]){
                replyUnreadRef.current=replyUnreadRef.current+data[item]["replyUnread"]; 
            }
        })
        set(ref(database, 'user/' + account), {
            unread:askUnreadRef.current+replyUnreadRef.current,
        });
        
    });

    
    let [unreadCount,setunreadCount]=useState();  
    const checkUnreadRef=query(ref(database, `user/${account}`)); 
    onValue(checkUnreadRef, (snapshot) => {
        const data = snapshot.val();
        if(data){
            if(unreadCount!==data["unread"]){
                setunreadCount(data["unread"])
            }else{
                console.log("Nav check nothing change:",unreadCount,data["unread"]);
            }

        };
        
    });


    // onValue(inboxRef, (snapshot) => {
    //     const data = snapshot.val();
    //     let keys=Object.keys(data);
    //     unReadref.current=0;
    //     keys.forEach((item)=>{
    //         if (data[item]["consultantAccount"] && data[item]["consultantAccount"]===account){
    //             if(data[item]["message"]){
    //                 let msgKeys=Object.keys(data[item]["message"]);
    //                 msgKeys.forEach((item2)=>{ 
    //                     if(data[item]["message"][item2]["from"]==="ask" && data[item]["message"][item2]["read"]===false){
    //                         unReadref.current=unReadref.current+1
    //                         console.log("APP REF VALUE:",unReadref.current)
    //                     }
    //                 })
    //             }
    //         }
            

    //     })
    //     countTrigger=unReadref.current
        
    // });

    // useEffect(()=>{
    //     console.log("trigger");
    // },[])
    // useEffect(()=>{
    //     console.log("useEffect:",unReadref.current)
    //     setunreadNum(unReadref.current);
    // },[unReadref.current])

   
    // const database = getDatabase(Firebase);
    // const orderRef=query(ref(database, 'order/'), orderByChild("orderNum"), equalTo(orderNum));
    // onValue(orderRef, (snapshot) => {
    //     const data = snapshot.val();
    //     console.log("realtimelisten:",data);
    //     if(data){
    //         set(ref(database, 'inbox/' + orderNum), {
    //           askAccount: data[orderNum]["askAccount"],
    //           consultantAccount:data[orderNum]["consultantAccount"],
    //           message:null
    //         });
    //         const msgListRef = ref(database, `inbox/${orderNum}/message`);
    //         const newMsgRef = push(msgListRef);
    //         let time=new Date();
    //         set(newMsgRef, {
    //             from:"ask",
    //             content: data[orderNum]["askInfo"],
    //             time:time.toLocaleString(),
    //             read:false
    //         });
            
    //         let time2=new Date();
    //         const newMsgRef2 = push(msgListRef);
    //         set(newMsgRef2, {
    //             from:"ask",
    //             content: data[orderNum]["askQuestion"],
    //             time:time2.toLocaleString(),
    //             read:false
    //         });
    //       }
    //     }
        
    // );

  

    // const inboxRef=query(ref(database, 'inbox/'));
    // // const inboxRef=query(ref(database, 'inbox/'), where("orderNum.consultantAccount","==",account));
    // const unReadref=useRef(0);
    // let preUndreadCount=0;
    // onValue(inboxRef, (snapshot) => {
    //     const data = snapshot.val();
    //     let keys=Object.keys(data);
    //     keys.forEach((item)=>{
    //         if (data[item]["consultantAccount"] && data[item]["consultantAccount"]===account){
    //             if(data[item]["message"]){
    //                 let msgKeys=Object.keys(data[item]["message"]);
    //                 msgKeys.forEach((item2)=>{ 
    //                     if(data[item]["message"][item2]["from"]==="ask" && data[item]["message"][item2]["read"]===false){
    //                         console.log(data[item]["message"][item2]["content"])
    //                         unReadref.current=unReadref.current+1
    //                         console.log(unReadref.current)
    //                     }
    //                 })
    //             }
    //         }
            

    //     })
        
        

    // });


    // useEffect(()=>{
    //     setUnread((preValue)=>{
    //         preValue=undreadCount;
    //         console.log(undreadCount,unread);
    //         return preValue;
    //     })

    // },[undreadCount])
    
        

  
    
  
    // set(ref(database, 'order/' + docRef.id), {
    //     payment: false,
    //     askAcount: account,
    //     consultantAccount:consultantAccount
    // });

    

    // console.log(orderRef);
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

    
    
    
    
    


    return(
        <div>
            <BrowserRouter>
                <Nav account={account} setAccount={setAccount}  unreadCount={unreadCount} setunreadCount={setunreadCount} notificationCSS={notificationCSS} setnotificationCSS={setnotificationCSS} />
                <Routes>
                    <Route path="/" element={<Homepage account={account} setAccount={setAccount} />}/>
                    <Route path="/account" element={<Account account={account} setAccount={setAccount} username={username} setUsername={setUsername} /> }/>
                    <Route path="/memberlist" element={ <Memberlist  account={account} setAccount={setAccount}/> }/>
                    <Route path= "/membership/:id" element={ <Membership username={username} setUsername={setUsername} account={account} setAccount={setAccount} orderNum={orderNum} setOrderNum={setOrderNum}/>}/>
                    {/* <Route path="/ask" element={account ? <Ask account={account} setAccount={setAccount} /> : <Navigate to='/signin' replace /> }/> */}
                    <Route path="/ask" element={ <Ask username={username} account={account} setAccount={setAccount} orderNum={orderNum} /> }/>
                    <Route path="/thankyou" element={ <Thankyou username={username} account={account} setAccount={setAccount} orderNum={orderNum} /> }/>
                    {/* <Route path="/inbox" element={account ? <Inbox  account={account} setAccount={setAccount}/> : <Navigate to='/signin' replace />}/> */}
                    <Route path="/inbox" element={<InboxDefault  account={account} setAccount={setAccount} setunreadCount={setunreadCount} /> }/>
                    <Route path="/inbox/:id" element={<Inbox  account={account} setAccount={setAccount} unreadCount={unreadCount} setunreadCount={setunreadCount} askUnreadRef={askUnreadRef} replyUnreadRef={replyUnreadRef} DOMref={DOMref}/> }/>
                    <Route path="/signin" element={ <Signin  account={account} setAccount={setAccount} username={username} setUsername={setUsername}/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App;