import React from "react";

const MembershipShare = ({share,num})=>{
    return (
        <div className="share">
            <span>{num}</span>
            <p className="share-short-title">{share["title"]}</p>
            <p className="share-content">{share["content"]}</p>
        </div>
    )
}

export default MembershipShare;