import React,{useEffect, useRef,useState } from "react";
import { useNavigate ,Link,useParams} from "react-router-dom";
import { getAuth ,onAuthStateChanged} from "firebase/auth";
import Firebase from "../src/Firebase";
import { getDatabase,query,ref,onValue,child, get,push,set,update} from "firebase/database";
import defaultmessage from "../static/picture/defaultmessage.png";
import talk from "../static/picture/talk.png";
import { GetGlobalContext } from "../component/context/GlobalContext";




const Inbox =  ( {DOMref}) =>{
   const {account,setAccount,unreadCount,setunreadCount,askUnreadRef,replyUnreadRef}=GetGlobalContext();

    let [msgList,setMsgList]=useState([]);


    let navigate=useNavigate();    
    useEffect(()=>{
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
        if (user) {
            setAccount(user.uid);
        } else {
            navigate("/signin");
        }
        });
    },[]);


    const database = getDatabase(Firebase);
    const inboxRef=query(ref(database, 'inbox/'));
    let msgRef=useRef();
    onValue(inboxRef, (snapshot) => {
        const data = snapshot.val();
        let keys=Object.keys(data);
        msgRef.current=[];
        keys.forEach((item)=>{
            // if (data[item]["consultantAccount"]===account ){
            //     msgRef.current.push({content:data[item]["askName"]+" 向你發出提問!立即確認提問內容",msgId:item});
            // }else if(data[item]["askAccount"]===account){
            //     msgRef.current.push({content:`你已向 ${data[item]["consultantName"]} 發出提問!請靜候回覆`,msgId:item});
            // }
            // console.log("check all msg:",msgRef.current,msgList);
          
        
            if (data[item]["consultantAccount"]===account ){
                if(data[item]["askUnread"]!==0 ){
                    // ||data[item]["replyUnread"]!==0 
                    msgRef.current.push({content:data[item]["askName"]+" 向你發出提問!立即確認提問內容",msgId:item,read:false});
                }else{
                    msgRef.current.push({content:data[item]["askName"]+" 向你發出提問!立即確認提問內容",msgId:item,read:true});
                }
                // msgRef.current.push({content:data[item]["askName"]+" 向你發出提問!立即確認提問內容",msgId:item,read:true});
            }else if(data[item]["askAccount"]===account ){
                // data[item]["askUnread"]!==0
                if(data[item]["replyUnread"]!==0 ){
                    msgRef.current.push({content:`你已向 ${data[item]["consultantName"]} 發出提問!請靜候回覆`,msgId:item,read:false});
                }else{
                    msgRef.current.push({content:`你已向 ${data[item]["consultantName"]} 發出提問!請靜候回覆`,msgId:item,read:true});
                }
                // msgRef.current.push({content:`你已向 ${data[item]["consultantName"]} 發出提問!請靜候回覆`,msgId:item,read:true});
                // msgRef.current.push({content:`你已向 ${data[item]["consultantName"]} 發出提問!請靜候回覆`,msgId:item});
            }
            // console.log("check all msg:",msgRef.current,msgList);
          
        })
        if(msgRef.current!==[] && msgList.length!==msgRef.current.length){
            setMsgList(msgRef.current);
        }
        
    });

     //取得 URL parameter
    const { id } = useParams();
    let [ msgContent,setMsgContent]=useState([]);
    let [ msgRole,setMsgRole]=useState(null);
    let msgContentRef=useRef([]);
    useEffect(()=>{
        if(id!=="default"){
            msgContentRef.current=[];
            const dbRef = ref(getDatabase(Firebase));
            get(child(dbRef, `inbox/${id}`))
            .then((snapshot) => {
            if (snapshot.exists()) {      
                let data=snapshot.val();
                // let keys=Object.keys(data["message"]);
                if(data["askAccount"]===account){
                    // msgContentRef.current.push("ask");
                    setMsgRole("ask");
                }else{
                    // msgContentRef.current.push("consultant");
                    setMsgRole("consultant");
                }
                // keys.forEach((key)=>{
                //     if(data["askAccount"]===account){
                //         // msgContentRef.current.push("ask");
                //         setMsgRole("ask");
                //     }else{
                //         // msgContentRef.current.push("consultant");
                //         setMsgRole("consultant");
                //     }
                //     msgContentRef.current.push(data["message"][key]);              
                // })
                // setMsgContent((prev)=>{
                //     prev=msgContentRef.current;
                //     return prev;
                // });
                
            } else {
                console.log("No data available");
            }
            }).catch((error) => {
            console.error(error);
            });         


        }
               
    },[id,account])
    
    
    let [ replyContent,setReplyContent]=useState(null);
    const getReplyContent =(e)=>{
        setReplyContent(e.target.value);
    }

   
    const submitReply =(e)=>{
        e.preventDefault();
        if( e.target.parentElement.children[0].value!=""){
            const msgListRef = ref(database, `inbox/${id}/message`);
            const newMsgRef = push(msgListRef);
        
            if(msgRole==="ask"){
                set(newMsgRef, {
                    from:"ask",
                    content: replyContent,
                    time:Date.now(),
                    read:false
                });
               //更新回答方的未讀訊息
                const dbRef = ref(getDatabase(Firebase));
                get(child(dbRef, `inbox/${id}/`))
                .then((snapshot) => {
                if (snapshot.exists()) {
                    let msgInfo=snapshot.val();
                    
                    update(ref(database, `inbox/${id}/`), {
                    askUnread:msgInfo["askUnread"]+1
                    });
                }
                })
            }
            if(msgRole==="consultant"){
                set(newMsgRef, {
                    from:"reply",
                    content: replyContent,
                    time:Date.now(),
                    read:false
                });

                //更新提問方的未讀訊息
                const dbRef = ref(getDatabase(Firebase));
                get(child(dbRef, `inbox/${id}/`))
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        let msgInfo=snapshot.val();
        
                        update(ref(database, `inbox/${id}/`), {
                        replyUnread:msgInfo["replyUnread"]+1
                        });
                    }
                })                
            }
            setReplyContent(null)
            e.target.parentElement.children[0].value="";
        }   
    }

 

    useEffect(()=>{
        DOMref.current.scrollTop= DOMref.current.scrollHeight;
    },[msgContent])

  

   
    useEffect(()=>{
        const singleMsgRef=query(ref(database, `inbox/${id}/message`));
        if(id==="default"){
            return;
        }
        onValue(singleMsgRef, (snapshot) => {
            const data = snapshot.val();
            console.log("f確認為什麼不成功:",data)
            let keys=Object.keys(data); 
            console.log("keys:",keys)
            msgContentRef.current=[];
            keys.forEach((key)=>{
                msgContentRef.current.push(data[key])
            })
            if(msgContent.length!==msgContentRef.current.length){
                setMsgContent(msgContentRef.current);
            }
            
        });

    },[id,replyContent])
    
    //當訊息被選取時，標記色彩
    let [ msgSelectElement,setMsgSelectElement]=useState(null);
    useEffect(()=>{
        if(msgSelectElement){
            msgSelectElement.className="msgSelect";
        }

    },[])


    
    const selectCss =(e)=>{
        if(msgSelectElement!=null){
            msgSelectElement.className="";
        }
        setMsgSelectElement(e.target);
        e.target.className="msgSelect";
    }
    

    const showMsgList =(e)=>{
        if(e.target.parentElement.className==="inbox-left"){
            e.target.parentElement.className="inbox-left inbox-left-showup";
        }else{
            e.target.parentElement.className="inbox-left";
        }
        
    }

    //當使用者點擊回覆區或點左方訊息列表展開始，更新訊息已讀、未讀狀態
    let minusUnreadRef=useRef(0);
    const readMsg=()=>{
        minusUnreadRef.current=0;
        const dbRef = ref(getDatabase(Firebase));
        get(child(dbRef, `inbox/${id}/message`))
        .then((snapshot) => {
        if (snapshot.exists()) {
            let keys=Object.keys(snapshot.val());
            let allMsg=snapshot.val()

            //當帳號角色在此訊息中為提問者，將執行以下程式碼
            if(msgRole==="ask"){
                keys.forEach((key)=>{
                    if(allMsg[key]["from"]==="reply" && allMsg[key]["read"]===false){
                        update(ref(database, `inbox/${id}/message/${key}`), {
                        read:true
                        });
                        minusUnreadRef.current= minusUnreadRef.current+1; 
                    }
                })
                console.log("確認未讀!:",replyUnreadRef.current-minusUnreadRef.current)
                update(ref(database, `inbox/${id}/`),{
                    replyUnread:replyUnreadRef.current-minusUnreadRef.current,
                })
            }

            //當帳號角色在此訊息中為回答者，將執行以下程式碼
            if(msgRole==="consultant"){
                keys.forEach((key)=>{
                    if(allMsg[key]["from"]==="ask" && allMsg[key]["read"]===false){
                        update(ref(database, `inbox/${id}/message/${key}`), {
                        read:true
                        });
                        minusUnreadRef.current= minusUnreadRef.current+1;    
                    }
                })
                console.log("確認未讀!:",askUnreadRef.current-minusUnreadRef.current)
                update(ref(database, `inbox/${id}/`),{
                    askUnread:askUnreadRef.current-minusUnreadRef.current,
                })
            }
        } else {
            console.log("No data available");
        }
        }).catch((error) => {
        console.error(error);
        });

    }
   
    

    return(
        <main className="inxbox-main">
            <div className="inbox-box">
            <div className="inbox-left">
                <div className="inbox-left-list-open-control" onClick={showMsgList}>〉</div>
                <div className="inbox-left-title">訊息列表</div>
                <div className="inbox-left-list">
                    
                    {msgList.length!==0 && msgList.map((msg)=>{
                        // if(msg["read"]===false){

                        //     return <Link to={`/inbox/${msg["msgId"]}` } onClick={readMsg}><p className="msgUnread" onClick={selectCss}>{msg["content"]}</p></Link>

                        // }else{
                        //     return <Link to={`/inbox/${msg["msgId"]}` } onClick={readMsg}><p onClick={selectCss}>{msg["content"]}</p></Link>
                        // }
                        return <Link to={`/inbox/${msg["msgId"]}` } onClick={readMsg}><p onClick={selectCss}>{msg["content"]}</p></Link>
                    })}
                    {msgList.length===0 &&  <div className="msgList-default"><img src={talk}></img>
                    <p>還沒有訊息，開始發問聊天吧!</p></div>}
                </div>
            </div>
            <div className="inbox-right">
                <div className="inbox-right-title">訊息內容</div>
                <div className="inbox-right-conetent" ref={DOMref}>
                    { id==="default" && <div className="defaultMsg-box">
                        <img src={defaultmessage}></img>
                        <p>點擊左方訊息查看內容</p>
                        </div>
                    }
                        
                    {
                    msgContent? msgContent.map((msg)=>{
                            if(msgRole==="consultant" && msg["from"]==="ask"){
                                
                                return <div className="receive-box">
                                        <div className="receive-content">{msg["content"]}</div>
                                        <div className="receive-blank"></div>
                                        </div>
                            }else if(msgRole==="consultant" && msg["from"]==="reply"){
    
                                return <div className="send-box">
                                        <div className="send-blank"></div>
                                        <div className="send-content">{msg["content"]}</div>
                                        </div>
                            }

                            if(msgRole==="ask" && msg["from"]==="ask"){
                                
                                return <div className="send-box">
                                        <div className="send-blank"></div>
                                        <div className="send-content">{msg["content"]}</div>
                                        </div>
                                
                            }else if(msgRole==="ask" && msg["from"]==="reply"){
    
                                return <div className="receive-box">
                                        <div className="receive-content">{msg["content"]}</div>
                                        <div className="receive-blank"></div>
                                        </div>
                            }
                        }): console.log("id check:",id)
                       
                        
                    }
                    {/* <div className="receive-box">
                        <div className="receive-content">來自XXX訊息</div>
                        <div className="receive-blank"></div>
                    </div>
                    <div className="send-box">
                        <div className="send-blank"></div>
                        <div className="send-content">來自XXX訊息</div>
                    </div> */}
                   
                </div>
                <form className="inbox-reply-box">
                    <textarea placeholder="輸入訊息" rows="1"  onChange={getReplyContent} onClick={readMsg}></textarea>
                    <button type="submit" onClick={submitReply}>傳送</button>
                </form>
            </div>
            </div>
        </main>
    )

}

export default Inbox;