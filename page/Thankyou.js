import React from "react";
import { Link } from "react-router-dom";
import coffee from "../static/picture/coffee.png";
import coffee2 from "../static/picture/coffee2.png";

const Thankyou = ()=>{
return(
    <main className="thankyou-main">
        <div className="thankyou-box">
            <img src={coffee2}></img>
            <div className="thankyou-right">
                <p className="thankyou-content">
                    感謝你的咖啡!<br/>請留意訊息匣的回覆通知
                </p>
                <div className="thankyou-right-buttons">
                    <Link to="/inbox" className="thankyou-inbox">前往訊息匣</Link>
                    <Link to="/memberlist" className="thankyou-memberlist">繼續找聊天對象</Link>
                </div>
            </div>
        </div>

    </main>

)
}

export default Thankyou;