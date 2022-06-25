import React from "react";

import dragicon from "../../static/picture/dragicon.png";

//styled-component
import { SingleTheme,DragOverlayout } from "../style/Account.styled";

const PersonalShare = ({shareList,setShareList,index,share,dragIndex,setDragIndex,exchange,setExchange}) =>{

    //當物件被drag
    const dragStartHandler2 = (e) => {
        let newShareList = shareList.map((item, order) => {
            if (order == index) {
                item.dragging = true
            }
            return item;
        })
        e.target.classList.add("dragging");
        setShareList(newShareList)
    }
    //當物件被放開
    const dropHandler2 = (e) => {
        e.target.classList.remove("dragging");
        let newShareList = shareList.map((item) => {
            if (item.dragging) {
                delete item.dragging;
            }
            return item;
        })
        setShareList(newShareList);
    }
    //物件被 over 時，增加 border
    const addStyle = (e) => {
        e.currentTarget.classList.add("draggingOver");
    }
    //物件被 dropdwon 或離開時，移除 border
    const removeStyle = (e) => {
        e.currentTarget.classList.remove("draggingOver");
    }

    //當使用者輸入分享內容時，更新state值，以便後續儲存至資料庫
    const updateShare = (e) => {
        if (e.target.tagName === "INPUT") {
            shareList[index]["title"] = e.target.value;
        } else {
            shareList[index]["content"] = e.target.value;
        }
        let newShareList = JSON.parse(JSON.stringify(shareList));
        setShareList(newShareList);
    }

    
    // //Drag and Drop-抓取
    // const dragStartHandler = (e) => {
    //     setDragIndex(index);
    //     let dragNum = index + 1;
    //     let dragTitle = e.target.children[1].children[1].value;
    //     let dragContent = e.target.children[2].value;
    //     exchange["drag"]["num"] = dragNum;
    //     exchange["drag"]["title"] = dragTitle;
    //     exchange["drag"]["content"] = dragContent;
    //     let newExchang = JSON.parse(JSON.stringify(exchange));
    //     setExchange(newExchang)
    // }
    // //Drag and Drop-進入
    // const dragEnterHandler = (e) => {
    //     // e.dataTransfer.setData('text/plain', e.target.id)
    //     if (index !== dragIndex) {
    //         let parent;
    //         if (e.target.tagName === "INPUT") {
    //             parent = e.target.parentElement.parentElement;
    //         } else if (e.target.tagName === "TEXTAREA") {
    //             parent = e.target.parentElement;
    //         } else {
    //             parent = e.target;
    //         }
    //         parent.classList.add("borderPlus");
    //         exchange["drop"]["num"] = index + 1;
    //         exchange["drop"]["title"] = parent.children[1].children[1].value;
    //         exchange["drop"]["content"] = parent.children[2].value;
    //     }
    // }
    // //Drag and Drop-經過
    // const dragOverHandler = (e) => {
    //     e.preventDefault();
    //     let parent;
    //     if (e.target.tagName === "INPUT") {
    //         parent = e.target.parentElement.parentElement;
    //     } else if (e.target.tagName === "TEXTAREA") {
    //         parent = e.target.parentElement;
    //     } else {
    //         parent = e.target;
    //     }
    //     parent.classList.add("borderPlus");
    // }


    // //Drag and Drop-放下
    // const dropHandler = (e) => {
    //     let dragNewNum = exchange["drop"]["num"];
    //     let dropNewNum = exchange["drag"]["num"];
    //     shareList[dragNewNum - 1]["title"] = exchange["drag"]["title"];
    //     shareList[dragNewNum - 1]["content"] = exchange["drag"]["content"];
    //     shareList[dropNewNum - 1]["title"] = exchange["drop"]["title"];
    //     shareList[dropNewNum - 1]["content"] = exchange["drop"]["content"];
    //     let newShareList = JSON.parse(JSON.stringify(shareList));
    //     setShareList(newShareList);
    // }
    
    return(
        <DragOverlayout onDragOver={addStyle} onDragExit={removeStyle} onDrop={removeStyle}>
            <SingleTheme draggable="true" onDragStart={dragStartHandler2} onDragEnd={dropHandler2}>
                <img src={dragicon}></img>
                <div className="share-title-box">
                    <p>{index+1}</p><input type="text" placeholder="e.g PM轉職" maxLength="12" onChange={updateShare} value={share["title"]? share["title"]:""}></input>
                </div>
                <textarea onChange={updateShare} value={share["content"]? share["content"]:""}></textarea>
            </SingleTheme>  
        {/* <SingleTheme draggable="true" onDragStart={dragStartHandler} onDragEnter={dragEnterHandler} onDragOver={dragOverHandler}  onDragEnd={dropHandler} >
             <img src={dragicon}></img>
             <div className="share-title-box"  >
                 <p>{index+1}</p><input type="text" placeholder="e.g PM轉職" maxLength="12" onChange={updateShare} value={share["title"]? share["title"]:""}></input>
             </div>
             <textarea onChange={updateShare} value={share["content"]? share["content"]:""}></textarea>
         </SingleTheme> */}
        </DragOverlayout>
    )
}

export default PersonalShare;

