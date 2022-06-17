import React from "react";
import { Link } from "react-router-dom";
//圖片
import people1 from "../../static/picture/people1.png";
import people2 from "../../static/picture/people2.png";
import people3 from "../../static/picture/people3.png";
import people4 from "../../static/picture/people4.png";
import people5 from "../../static/picture/people5.png";
import people6 from "../../static/picture/people6.png";
//styled-component
import { Section,LeftDiv,LeftTitle,LeftDiscript,RightDiv,CircleBox,Circle } from "../style/Homepage.styled";

const Section1 = ({fontColor}) =>{


    return(
        <Section>
            <LeftDiv>
                <LeftTitle scrollColor={fontColor}>一杯咖啡<br/>聊出新思維</LeftTitle>
                <LeftDiscript>
                    <Link to="/memberlist" >立即尋找咖啡聊對象</Link>
                    <Link to="/account" >馬上成為分享者</Link>
                </LeftDiscript>
            </LeftDiv>
            <RightDiv>
                <CircleBox>
                    <Circle><img src={people1}/></Circle>
                    <Circle><img src={people2}/></Circle>
                    <Circle><img src={people3}/></Circle>
                    <Circle><img src={people4}/></Circle>
                    <Circle><img src={people5}/></Circle>
                    <Circle><img src={people6}/></Circle>
                </CircleBox>
            </RightDiv>
        </Section>

    )
}

export default Section1;