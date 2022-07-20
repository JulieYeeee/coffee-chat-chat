import React from "react";

const MembershipTags = ({ tag }) => {
  return (
    <div className="tag">
      <p>{tag["tag"]}</p>
    </div>
  );
};

export default MembershipTags;
