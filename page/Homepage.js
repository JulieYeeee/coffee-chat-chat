import React,{useState} from "react";
import { Link } from "react-router-dom";
import Section1 from "../component/homepage/Section1";
import Section2 from "../component/homepage/Section2";
import Section3 from "../component/homepage/Section3";
import downarrow from "../static/picture/downarrow.png";
import { Bar,Footer } from "../component/style/Homepage.styled";

const Homepage = () =>{
    let [bgChange,setBgChange]=useState("homepage-main");
    let [fontColor,setFontColor]=useState(false);
    window.onscroll=(e)=>{

        if(window.scrollY>window.innerHeight*0.7){
            setBgChange("homepage-main homepage-main2");
            setFontColor(true);
        }
        if(window.scrollY>window.innerHeight*2){
            console.log("hey");
            setBgChange("homepage-main");
        }
        if(window.scrollY<window.innerHeight*0.7){
            setBgChange("homepage-main");
            setFontColor(false);
        }

    }
    
    return(
        <main className={bgChange} >
            <Section1 fontColor={fontColor}/>
            <Bar>
                <p >成為諮詢者、分享者你可以...</p>
                <img src={downarrow}></img>  
            </Bar>
            {/* <div className="bar-section1">
                <p className={"cross-title"+fontColor}>成為諮詢者、分享者你可以...</p>
                <img src={downarrow}></img>
            </div> */}
            <Section2 fontColor={fontColor} setFontColor={setFontColor}/>
            <Section3 fontColor={fontColor} setFontColor={setFontColor}/>
            <Footer>
            {/* <div > */}
                <p >加入咖啡圈圈立即詢問與分享</p>
                <Link to="/account">成為會員</Link>
            {/* </div> */}
            </Footer>

        </main>
    )
}
export default Homepage;