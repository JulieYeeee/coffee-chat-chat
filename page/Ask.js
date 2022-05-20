import React, { useState } from "react";
import ask from "../static/picture/ask.png";
import info from "../static/picture/info.png";

const Ask = () =>{
    let [consultant,setConsultant]=useState(null);
    return (
        <main className="ask-main">
            <form>
            <div className="ask-consultant-box">
                <img className="ask-headshot"></img>
                <div className="ask-welcome">Hi, 我是 {consultant} <br/>很高興與你分享我的經驗!</div>
            </div>
            <div className="bar"></div>
            <div className="ask-consultation-box">
                <p className="ask-notification">提問前可以提供您的與提問有關之相關個人相關資訊。有助 {consultant} 更準確地回覆您的提問。</p>
                <div className="ask-information-box">
                    <div>
                        <img className="ask-icon" src={info}></img>
                        <p>你的資訊：</p>
                    </div>
                    <textarea className="ask-information" ></textarea>
                </div>
                <div className="ask-question-box">
                    <div>
                        <img className="ask-icon" src={ask}></img>
                        <p>你的提問：</p>
                    </div>
                    <textarea className="ask-question" rows="10"></textarea>
                </div>
            </div>
            <div className="ask-payment-box">
                <p className="ask-notification">Buy me a coffee!<br/>填寫付款資訊，您將請 {consultant} 喝一杯 95 元咖啡。</p>
                <div className="ask-payment">
                    <input></input>
                    <input></input>
                    <input></input>
                </div>
            </div>
            <button type="submit">提交諮詢</button>
            </form>
        </main>

    )
}

export default Ask;