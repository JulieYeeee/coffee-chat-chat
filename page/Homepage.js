import React from "react";
import Section1 from "../component/homepage/Section1";
import Section2 from "../component/homepage/Section2";
import Section3 from "../component/homepage/Section3";
import downarrow from "../static/picture/downarrow.png";

const Homepage = () =>{
    return(
        <main>
            <Section1/>
            <div className="bar-section1">
                <p>成為諮詢者、分享者你可以...</p>
                <img src={downarrow}></img>
            </div>
            <Section2/>
            <Section3/>

        </main>
    )
}
export default Homepage;