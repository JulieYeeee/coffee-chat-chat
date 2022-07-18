import React from "react";
import dragicon from "../../static/picture/dragicon.png";

import { SingleTheme, DragOverlayout } from "../style/Account.styled";

const PersonalShare = ({
  shareList,
  setShareList,
  index,
  share,
  dragIndex,
  setDragIndex,
  exchange,
  setExchange,
}) => {
  //當物件被drag
  const dragStartHandler2 = (e) => {
    e.target.classList.add("dragging");
    let newShareList = shareList.map((item, order) => {
      if (order == index) {
        item.dragging = true;
      }
      return item;
    });
    setShareList(newShareList);
  };
  //當物件被放開
  const dropHandler2 = (e) => {
    e.target.classList.remove("dragging");
    let newShareList = shareList.map((item) => {
      if (item.dragging) {
        delete item.dragging;
      }
      return item;
    });
    setShareList(newShareList);
  };
  //物件被 over 時，增加 border
  const addStyle = (e) => {
    e.currentTarget.classList.add("draggingOver");
  };
  //物件被 dropdwon 或離開時，移除 border
  const removeStyle = (e) => {
    e.currentTarget.classList.remove("draggingOver");
  };

  //當使用者輸入分享內容時，更新state值，以便後續儲存至資料庫
  const updateShare = (e) => {
    if (e.target.tagName === "INPUT") {
      shareList[index]["title"] = e.target.value;
    } else {
      shareList[index]["content"] = e.target.value;
    }
    let newShareList = JSON.parse(JSON.stringify(shareList));
    setShareList(newShareList);
  };

  return (
    <DragOverlayout
      onDragOver={addStyle}
      onDragLeave={removeStyle}
      onDrop={removeStyle}
    >
      <SingleTheme
        draggable="true"
        onDragStart={dragStartHandler2}
        onDragEnd={dropHandler2}
      >
        <img src={dragicon}></img>
        <div className="share-title-box">
          <p>{index + 1}</p>
          <input
            type="text"
            placeholder="e.g PM轉職"
            maxLength="12"
            onChange={updateShare}
            value={share["title"] ? share["title"] : ""}
          ></input>
        </div>
        <textarea
          onChange={updateShare}
          value={share["content"] ? share["content"] : ""}
        ></textarea>
      </SingleTheme>
    </DragOverlayout>
  );
};

export default PersonalShare;
