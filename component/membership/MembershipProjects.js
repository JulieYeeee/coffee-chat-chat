import React,{useRef}from "react";
import coverwarn from "../../static/picture/coverwarn.png";
import {SingleProject,ProjectCover,ProjectContentBox,ProjectType,ProejectText,Outlink,Coverimg} from "../style/Membership.styled";

const MembershipProjects = ({project}) =>{
    let cover=project["cover"];
    let coverRef=useRef();
    if(!cover){
        coverRef.current="none";
    }
    return(
        <SingleProject>
        {/* <div className="project"> */}
           <ProjectCover>
            <Coverimg src={cover? cover : coverwarn} coverCheck={cover}/>
           {/* <img src={cover? cover : coverwarn} coverCheck={cover}></img> */}
           </ProjectCover>
            {/* <img { cover? src={cover} :src={png} }></img> */}
            <ProjectContentBox>
            {/* <div> */}
            <ProjectType>{project["type"]}</ProjectType>
            <ProejectText>{project["content"]}</ProejectText>
                {/* <p className="project-type">{project["type"]}</p> */}
                {/* <p className="project-content">{project["content"]}</p> */}
            {/* </div> */}
            </ProjectContentBox>
            <Outlink href={project["link"]? project["link"]:"null"} >READ</Outlink>
                {/* <a href={project["link"]? project["link"]:"null"}>READ</a> */}
            
            
        {/* </div> */}
        </SingleProject>
    )
}

export default MembershipProjects;