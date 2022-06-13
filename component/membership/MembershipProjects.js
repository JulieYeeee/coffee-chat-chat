import React from "react";
//圖片
import coverwarn from "../../static/picture/coverwarn.png";
//styled-component
import {SingleProject,ProjectCover,ProjectContentBox,ProjectType,ProejectText,Outlink,Coverimg} from "../style/Membership.styled";

const MembershipProjects = ({project}) =>{

    let cover = project["cover"];
    return(
        <SingleProject>
           <ProjectCover>
                <Coverimg src={cover? cover : coverwarn} coverCheck={cover}/>
           </ProjectCover>
            <ProjectContentBox>
                <ProjectType>{project["type"]}</ProjectType>
                <ProejectText>{project["content"]}</ProejectText>
            </ProjectContentBox>
            <Outlink href={project["link"]? project["link"]:"null"} >READ</Outlink>
        </SingleProject>
    )
}

export default MembershipProjects;