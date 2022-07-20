import React from "react";

const MembershipShare = ({ share, index }) => {
  return (
    <div className="share">
      <span>{index + 1}</span>
      <p className="share-short-title">{share["title"]}</p>
      <p className="share-content">{share["content"]}</p>
    </div>
  );
};

export default MembershipShare;
