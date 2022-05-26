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
import Ask from "../page/Ask";
import Thankyou from "../page/Thankyou";

import Firebase from "./Firebase";
import { getAuth } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref ,onValue,query,orderByChild,equalTo,set,push } from "firebase/database";






const App = () =>{
    let [ account , setAccount ] = useState (false);
    let [ username, setUsername ]=useState("");
    let [ orderNum, setOrderNum ]=useState("");
   
    useEffect(()=>{
        const auth = getAuth(Firebase);
        onAuthStateChanged(auth, (user) => {
        if (user) {
            setAccount(user.uid);
        } else {
            console.log("nobody");
        }
        }); 

    },[]);


   
        const database = getDatabase(Firebase);
        const orderRef=query(ref(database, 'order/'), orderByChild("orderNum"), equalTo(orderNum));
        onValue(orderRef, (snapshot) => {
        const data = snapshot.val();
        console.log("realtimelisten:",data);
        if(data){
            set(ref(database, 'inbox/' + orderNum), {
              askAccount: data[orderNum]["askAccount"],
              consultantAccount:data[orderNum]["consultantAccount"],
              message:null,
              askUnread:2,
              replyUnread:0,
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
    let unReadref=useRef();
    onValue(inboxRef, (snapshot) => {
        const data = snapshot.val();
        let keys=Object.keys(data);
        unReadref.current=0;
        keys.forEach((item)=>{
            if (data[item]["consultantAccount"] && data[item]["consultantAccount"]===account && data[item]["askUnread"]){
                unReadref.current=unReadref.current+data[item]["askUnread"];
                set(ref(database, 'user/' + account), {
                    unread:unReadref.current,
                });
            }
            

        })
        
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
                <Nav account={account} setAccount={setAccount}  />
                <Routes>
                    <Route path="/" element={<Homepage account={account} setAccount={setAccount} />}/>
                    <Route path="/account" element={<Account account={account} setAccount={setAccount} username={username} setUsername={setUsername} /> }/>
                    <Route path="/memberlist" element={ <Memberlist  account={account} setAccount={setAccount}/> }/>
                    <Route path= "/membership/:id" element={ <Membership username={username} account={account} setAccount={setAccount} orderNum={orderNum} setOrderNum={setOrderNum}/>}/>
                    {/* <Route path="/ask" element={account ? <Ask account={account} setAccount={setAccount} /> : <Navigate to='/signin' replace /> }/> */}
                    <Route path="/ask" element={ <Ask username={username} account={account} setAccount={setAccount} orderNum={orderNum} /> }/>
                    <Route path="/thankyou" element={ <Thankyou username={username} account={account} setAccount={setAccount} orderNum={orderNum} /> }/>
                    {/* <Route path="/inbox" element={account ? <Inbox  account={account} setAccount={setAccount}/> : <Navigate to='/signin' replace />}/> */}
                    <Route path="/inbox" element={<Inbox  account={account} setAccount={setAccount} /> }/>
                    <Route path="/signin" element={ <Signin  account={account} setAccount={setAccount} username={username} setUsername={setUsername}/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App;