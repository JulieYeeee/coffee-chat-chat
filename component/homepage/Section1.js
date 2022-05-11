import React from "react";
import { Link } from "react-router-dom";

const Section1 = () =>{
    return(
        <section className="hp-1">
        <div className="hp-1-left">
            <p className="slogan">一杯咖啡<br/>聊出新思維</p>
            <div className="hp-1-button-container">
                <Link to="/memberlist" className="hp-1-btn-list">立即尋找咖啡聊對象</Link>
                <Link to="/account" className="hp-1-btn-regist">馬上成為分享者</Link>
            </div>
        </div>
        <div className="hp-1-right">
            <div className="circle-container">
                <div className="circle"><img></img></div>
                <div className="circle"><img></img></div>
                <div className="circle"><img></img></div>
                <div className="circle"><img></img></div>
                <div className="circle"><img></img></div>
                <div className="circle"><img></img></div>
            </div>
        </div>
    </section>
    )
}

export default Section1;