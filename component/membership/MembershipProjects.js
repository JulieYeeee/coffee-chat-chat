import React from "react";
import png from "../../static/picture/fb.png";

const MembershipProjects = ({project}) =>{
    let cover =project["cover"];
    return(
        <div className="project">
           
           <img src={cover? cover : png}></img>
            {/* <img { cover? src={cover} :src={png} }></img> */}
            <div>
                <p className="project-type">{project["type"]}</p>
                <p className="project-content">{project["content"]}</p>
                </div>
                <a href={project["link"]? project["link"]:"null"}>READ</a>
            
            
        </div>
    )
}

export default MembershipProjects;