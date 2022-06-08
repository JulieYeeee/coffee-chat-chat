import React from "react";
import { Link } from "react-router-dom";
import people1 from "../../static/picture/people1.png";
import people2 from "../../static/picture/people2.png";
import people3 from "../../static/picture/people3.png";
import people4 from "../../static/picture/people4.png";
import people5 from "../../static/picture/people5.png";
import people6 from "../../static/picture/people6.png";

const Section1 = ({fontColor}) =>{
    return(
        <section className="hp-1">
        <div className="hp-1-left">
            <p className={"slogan"+fontColor}>一杯咖啡<br/>聊出新思維</p>
            <div className="hp-1-button-container">
                <Link to="/memberlist" className="hp-1-btn-list">立即尋找咖啡聊對象</Link>
                <Link to="/account" className="hp-1-btn-regist">馬上成為分享者</Link>
            </div>
        </div>
        <div className="hp-1-right">
            <div className="circle-container">
                <div className="circle circle1"><img src={people1}></img></div>
                <div className="circle circle2"><img src={people2}></img></div>
                <div className="circle circle3"><img src={people3}></img></div>
                <div className="circle circle4"><img src={people4}></img></div>
                <div className="circle circle5"><img src={people5}></img></div>
                <div className="circle circle6"><img src={people6}></img></div>
            </div>
        </div>
    </section>
    )
}

export default Section1;