import React, { useEffect, useState } from "react";
import ask from "../static/picture/ask.png";
import info from "../static/picture/info.png";

import firebase from "../src/Firebase";
import { getFirestore,doc, setDoc,getDoc } from "firebase/firestore";

const Ask = ({orderNum}) =>{

    let [ consultantName,setConsultant ]=useState(null);
    let [ headshot,setHeadshot]=useState(null);

    //取得訂單資訊
    useEffect(()=>{
        setInitialOrder();
    },[])
    
    const setInitialOrder =async()=>{
        const db = getFirestore(firebase);
            const docRef = doc(db, `pre-order`, orderNum);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                let orderData=docSnap.data();
                setConsultant(orderData["consultantName"]);
                setHeadshot(orderData["headshot"]);
            } else {
            // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        
    }
   

    




    return (
        <main className="ask-main">
            <form>
            <div className="ask-consultant-box">
                <img className="ask-headshot" src={headshot}></img>
                <div className="ask-welcome">Hi, 我是 {consultantName} <br/>很高興與你分享我的經驗!</div>
            </div>
            <div className="bar"></div>
            <div className="ask-consultation-box">
                <p className="ask-notification">提問前可以提供您認為有助分享者回覆您問題的相關個人資訊。讓 {consultantName} 能更準確地回覆您的提問。</p>
                <div className="ask-information-box">
                    <div>
                        <img className="ask-icon" src={info}></img>
                        <p>你的資訊：</p>
                    </div>
                    <textarea className="ask-information" rows="10" ></textarea>
                </div>
                <div className="ask-question-box">
                    <div>
                        <img className="ask-icon" src={ask}></img>
                        <p>你的提問：</p>
                    </div>
                    <textarea className="ask-question" rows="10"></textarea>
                </div>
            </div>
            <div className="bar"></div>
            <div className="ask-payment-box">
                <p className="ask-notification">Buy me a coffee!<br/>填寫付款資訊，您將請 {consultantName} 喝一杯 95 元咖啡。</p>
                <div className="ask-payment">
                    <input placeholder="Card number"></input>
                    <input placeholder="CVV"></input>
                    <input placeholder="Expired date"></input>
                </div>
            </div>
            <button type="submit">提交諮詢</button>
            </form>
        </main>

    )
}

export default Ask;