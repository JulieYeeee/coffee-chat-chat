import React from "react";
import asker from "../../static/picture/asker.png";
import answer from "../../static/picture/answer.png"

const Section2 = () =>{
    return (
        <section className="hp-2">
            <div className="hp-2-title">
                <p>Share or Ask Anything!</p>
                <p>有興趣就來問、不用是大神也能大方分享經驗</p>
            </div>
            <div className="hp-2-users">
                <div className="user asker">
                    <p>提問者</p>
                    <img src={asker}></img>
                    <p>只要一杯咖啡價格<br/>就能向任何人提問</p>
                </div>
                <div className="user answer">
                    <p>分享者</p>
                    <img src={answer}></img>
                    <p>建立專屬個人頁面<br/>大方分享你的所有經驗</p>    
                </div>
            </div>
            <p className="hp-2-last-title">任何經驗都可能幫助他人!</p>
        </section>
    )
}

export default Section2;