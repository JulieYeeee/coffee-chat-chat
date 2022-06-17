import React from "react";
//圖片
import asker from "../../static/picture/asker.png";
import answer from "../../static/picture/answer.png";
//styled-component
import { Section2section,S2Title,Userbox,Downtitle } from "../style/Homepage.styled";


const Section2 = ({fontColor}) =>{
    return (
        <Section2section>
            <S2Title scrollColor={fontColor}>
                <p>Share or Ask Anything!</p>
                <p>有興趣就來問、不用是大神也能大方分享經驗</p>
            </S2Title>
            <Userbox>
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
            </Userbox>
            <Downtitle scrollColor={fontColor}>任何經驗都可能幫助他人!</Downtitle>
        </Section2section>
    )
}

export default Section2;