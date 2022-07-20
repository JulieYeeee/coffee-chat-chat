import React from "react";
import demoaccount from "../../../static/video/account.mp4";
import demosearch from "../../../static/video/searchandask.mp4";
import demochatroom from "../../../static/video/chatroom.mp4";
import {
  Section3section,
  DescriptionBox,
  FeatureBox,
  SingleFeatureBox,
  DemoBox,
} from "../style/Homepage.styled";

const features = [
  {
    title: "輕鬆建立個人頁面",
    description:
      "成為會員建立個人頁，分享個人訊息。想分享的作品太多?您可以自由新增作品數量，大方分享。",
    video: demoaccount,
  },
  {
    title: "遇見不同領域的人",
    description: "尋找不同生活經驗的人，與他們交談，開啟不同的思維。",
    video: demosearch,
  },
  {
    title: "一杯咖啡即可暢聊",
    description: "付費請對方一杯咖啡，開啟你們資訊交流的聊天室。",
    video: demochatroom,
  },
];

const Section3 = () => {
  return (
    <Section3section>
      <p>開始 Coffee Chat 資訊交流更簡單</p>
      {features.map((feature, index) => {
        return (
          <SingleFeatureBox layout={index % 2}>
            <DescriptionBox>
              <h2>{feature["title"]}</h2>
              <p>{feature["description"]}</p>
            </DescriptionBox>
            <DemoBox>
              <video autoPlay muted loop={true} playsInline>
                <source src={feature["video"]} type="video/mp4" />
              </video>
            </DemoBox>
          </SingleFeatureBox>
        );
      })}
    </Section3section>
  );
};

export default Section3;