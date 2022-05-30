import React,{useEffect, useRef,useState } from "react";
import { useNavigate ,Link,useParams} from "react-router-dom";
import { getAuth ,onAuthStateChanged} from "firebase/auth";
import Firebase from "../src/Firebase";
import { getDatabase,query,ref,onValue,child, get,push,set} from "firebase/database";


const Inbox =  ( {account,setAccount,setunreadCount}) =>{
   

    let [msgList,setMsgList]=useState([]);


    let navigate=useNavigate();    
    useEffect(()=>{
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
        if (user) {
            setAccount(user.uid);
            console.log("inbox:",account);
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
            if (data[item]["consultantAccount"]===account ){
                msgRef.current.push({content:data[item]["askAccount"]+"向你發出提問!立即確認提問內容",msgId:item});
            }else if(data[item]["askAccount"]===account){
                msgRef.current.push({content:`你已向 ${data[item]["consultantAccount"]} 發出提問!請靜候回覆`,msgId:item});
            }
            // console.log("check all msg:",msgRef.current);
          
        })
        if(msgList.length!==msgRef.current.length){
            setMsgList(msgRef.current);
        }
        
    });

     //取得 URL parameter
    const { id } = useParams();
    let [ msgContent,setMsgContent]=useState([]);
    let [ msgRole,setMsgRole]=useState(null);
    let msgContentRef=useRef([]);
    useEffect(()=>{
            msgContentRef.current=[];
            const dbRef = ref(getDatabase());
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
                
            }
            if(msgRole==="consultant"){
                set(newMsgRef, {
                    from:"reply",
                    content: replyContent,
                    time:Date.now(),
                    read:false
                });
                
            }
            setReplyContent(null)
            e.target.parentElement.children[0].value="";

        }
        
        
    }
   
    useEffect(()=>{
        const singleMsgRef=query(ref(database, `inbox/${id}/message`));
        onValue(singleMsgRef, (snapshot) => {
            const data = snapshot.val();
            let keys=Object.keys(data); 
            msgContentRef.current=[];
            keys.forEach((key)=>{
                msgContentRef.current.push(data[key])
            })
            if(msgContent.length!==msgContentRef.current.length){
                setMsgContent(msgContentRef.current);
            }
            
        });

    },[id,replyContent])
      
    

    // msgContent[0]==="consultant"
   


    return(
        <main className="inxbox-main">
            <div className="inbox-box">
            <div className="inbox-left">
                <div className="inbox-left-title">訊息列表</div>
                <div className="inbox-left-list">
                    {msgList? msgList.map((msg)=>{
                        return <Link to={`/inbox/${msg["msgId"]}`}><p>{msg["content"]}</p></Link>
                    }): "您還沒有任何訊息:)"}
                </div>
            </div>
            <div className="inbox-right">
                <div className="inbox-right-title">訊息內容</div>
                <div className="inbox-right-conetent">
                    { msgContent? msgContent.map((msg)=>{
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
                        }): 點擊左方訊息查看內容
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
                    <textarea placeholder="輸入訊息" rows="1"  onChange={getReplyContent}></textarea>
                    <button type="submit" onClick={submitReply}>傳送</button>
                </form>
            </div>
            </div>
        </main>
    )

}

export default Inbox;