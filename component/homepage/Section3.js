import React from "react";
import { Link } from "react-router-dom";
import demovdo from "../../static/video/demo.mp4";

//styled-component
import { Section3section } from "../style/Homepage.styled";


const Section3 = () =>{
    return(
        <Section3section>
        {/* <section className="hp-3"> */}

            <p>開始Coffee Chat<br/>資訊交流更簡單</p>
            <video  autoplay="" muted loop={true} width="80%">
                <source src={demovdo} type="video/mp4"/>
            </video>
            {/* <Footer> */}
            {/* <div > */}
                {/* <p >加入咖啡圈圈立即詢問與分享</p> */}
                {/* <Link to="/account">成為會員</Link> */}
            {/* </div> */}
            {/* </Footer> */}
        {/* </section> */}
        </Section3section>
    )
}

export default Section3;