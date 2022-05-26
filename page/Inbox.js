import React,{useEffect,forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth ,onAuthStateChanged} from "firebase/auth";
import Firebase from "../src/Firebase";
import { getDatabase } from "firebase/database";


const Inbox =  ( {account,setAccount,unReadref}) =>{
    console.log("ref value:",unReadref.current);
    const database = getDatabase(Firebase);



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



    return(
        <main className="inxbox-main">
            <div className="inbox-box">
            <div className="inbox-left">
                <div className="inbox-left-title">訊息列表</div>
                <div className="inbox-left-list">
                    <div>來自XXX訊息</div>
                    <div>來自XXX訊息</div>
                    <div>來自XXX訊息</div>
                    <div>來自XXX訊息</div>
                </div>
            </div>
            <div className="inbox-right">
                <div className="inbox-right-title">訊息內容</div>
                <div className="inbox-right-conetent">
                    <div className="receive-box">
                        <div className="receive-content">來自XXX訊息</div>
                        <div className="receive-blank"></div>
                    </div>
                    <div className="send-box">
                        <div className="send-blank"></div>
                        <div className="send-content">來自XXX訊息</div>
                    </div>
                   
                </div>
                <form className="inbox-reply-box">
                    <textarea placeholder="輸入訊息" rows="1"></textarea>
                    <button type="submit">傳送</button>
                </form>
            </div>
            </div>
            Sorry...not finished yet.
        </main>
    )

}

export default Inbox;