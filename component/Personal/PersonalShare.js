import React, { useState } from "react";

const PersonalShare = ({shareList,setShareList,index,share,dragIndex,setDragIndex,exchange,setExchange}) =>{

    const updateShare = (e) =>{
        if(e.target.tagName==="INPUT"){
            shareList[index]["title"]=e.target.value;
        }else{
            shareList[index]["content"]=e.target.value;
        }
        let newShareList=JSON.parse(JSON.stringify(shareList));
        setShareList(newShareList);        
    }

    
    const dragStartHandler = (e) =>{
        setDragIndex(index);
        let dragNum = index+1;
        let dragTitle = e.target.children[0].children[1].value;
        let dragContent = e.target.children[1].value;
        console.log("exchange:",exchange);
        exchange["drag"]["num"]=dragNum;
        exchange["drag"]["title"]=dragTitle;
        exchange["drag"]["content"]=dragContent;
        let newExchang=JSON.parse(JSON.stringify(exchange));
        setExchange(newExchang)

    }

    const dragEnterHandler = (e) =>{
        if(index!==dragIndex){
            let parent;
            if(e.target.tagName==="INPUT"){
                parent=e.target.parentElement.parentElement;           
            }else if(e.target.tagName==="TEXTAREA"){
                parent=e.target.parentElement;
            }else{
                parent=e.target;
            }
            exchange["drop"]["num"]=index+1;
            exchange["drop"]["title"]=parent.children[0].children[1].value;
            exchange["drop"]["content"]=parent.children[1].value;
            console.log("dd5:",exchange);
        }
        
    }

    const dragOverHandler =(e) =>{
        e.preventDefault();
        // console.log("over:",e.target);
    }

    const dropHandler = (e) =>{
        console.log("drop:",e.target);
        let dragNewNum=exchange["drop"]["num"];
        let dropNewNum=exchange["drag"]["num"];
        shareList[dragNewNum-1]["title"]=exchange["drag"]["title"];
        shareList[dragNewNum-1]["content"]=exchange["drag"]["content"];
        shareList[dropNewNum-1]["title"]=exchange["drop"]["title"];
        shareList[dropNewNum-1]["content"]=exchange["drop"]["content"];
        let newShareList=JSON.parse(JSON.stringify(shareList));
        setShareList(newShareList);
        console.log("sharelist:",newShareList);
    }
    return(
        <div className="share-theme" draggable="true" onDragStart={dragStartHandler} onDragEnter={dragEnterHandler} onDragOver={dragOverHandler}  onDragEnd={dropHandler}>
            <div className="share-title-box"  >
                <p>{index+1}</p><input type="text" placeholder="e.g PM轉職" maxLength="10" onChange={updateShare} value={share["title"]}></input>
            </div>
            <textarea onChange={updateShare} value={share["content"]}></textarea>
        </div>

    )
}

export default PersonalShare;
