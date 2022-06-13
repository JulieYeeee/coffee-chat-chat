import React from "react";
//影音
import demovdo from "../../static/video/demo.mp4";

//styled-component
import { Section3section } from "../style/Homepage.styled";


const Section3 = () =>{
    return(
        <Section3section>
            <p>開始Coffee Chat<br/>資訊交流更簡單</p>
            <video  autoplay="" muted loop={true} width="80%">
                <source src={demovdo} type="video/mp4"/>
            </video>
        </Section3section>
    )
}

export default Section3;