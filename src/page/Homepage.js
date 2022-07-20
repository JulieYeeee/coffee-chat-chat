import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Section1 from "../component/homepage/Section1";
import Section2 from "../component/homepage/Section2";
import Section3 from "../component/homepage/Section3";
import downarrow from "../../static/picture/downarrow.png";
import { Bar, Footer } from "../component/style/Homepage.styled";
import { Main } from "../component/style/Homepage.styled";

const Homepage = () => {
  let bgRef = useRef("light");
  let [bgChange, setBgChange] = useState("light");
  let [fontColor, setFontColor] = useState(false);
  //按 scrollbar 滑動改變背景 文字色
  window.onscroll = (e) => {
    if (window.scrollY > window.innerHeight * 0.7) {
      bgRef.current = "yellow";
      setBgChange("yellow");
      setFontColor(true);
    }
    if (window.scrollY > window.innerHeight * 1.5) {
      bgRef.current = "light";
      setBgChange("light");
      setFontColor(false);
    }
    if (window.scrollY < window.innerHeight * 0.7) {
      bgRef.current = "light";
      setBgChange("light");
      setFontColor(false);
    }
  };

  return (
    <Main bgColor={bgChange}>
      <Section1 fontColor={fontColor} />
      <Bar bgColor={bgRef.current}>
        <p>成為諮詢者、分享者你可以...</p>
        <img src={downarrow}></img>
      </Bar>
      <Section2 fontColor={fontColor} setFontColor={setFontColor} />
      <Section3 fontColor={fontColor} setFontColor={setFontColor} />
      <Footer>
        <p>加入咖啡圈圈立即詢問與分享</p>
        <Link to="/account">成為會員</Link>
      </Footer>
    </Main>
  );
};
export default Homepage;
