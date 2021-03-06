import React from "react";
import { Link } from "react-router-dom";
import coffee2 from "../../static/picture/coffee2.png";
import {
  ThankyouBox,
  ThankyouRight,
  ButtonBox,
} from "../component/style/Thankyou.styled";

const Thankyou = () => {
  return (
    <main className="thankyou-main">
      <ThankyouBox>
        <img src={coffee2}></img>
        <ThankyouRight>
          <p className="thankyou-content">
            感謝你的咖啡!
            <br />
            請留意訊息匣的回覆通知
          </p>
          <ButtonBox>
            <Link to="/inbox/default" className="thankyou-inbox">
              前往訊息匣
            </Link>
            <Link to="/memberlist" className="thankyou-memberlist">
              繼續找聊天對象
            </Link>
          </ButtonBox>
        </ThankyouRight>
      </ThankyouBox>
    </main>
  );
};

export default Thankyou;
