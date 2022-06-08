import React from "react";
import { Link } from "react-router-dom";
import demovdo from "../../static/video/demo.mp4";

const Section3 = () =>{
    return(
        <section className="hp-3">
            <p className="hp-3-title">開始Coffee Chat<br/>資訊交流更簡單</p>
            <video className="hp-3-video" autoplay="" muted loop={true} width="80%">
                <source src={demovdo} type="video/mp4"/>
            </video>
            <div className="hp-3-CTA">
                <p className="hp-3-CTA-text">加入咖啡圈圈立即詢問與分享</p>
                <Link to="/account"className="hp-3-CTA-btn">成為會員</Link>
            </div>
        </section>
    )
}

export default Section3;