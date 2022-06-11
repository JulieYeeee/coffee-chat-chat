import React from "react";
import coverdefault from "../../static/picture/coverdefault.png";
import { SingleProject,LayoutBox,ProjectCover,ReaclCover,DefaultCover,ProjectContent,ProjectLink } from "../style/Account.styled";


const PersonalProject = ({project,index,getFile,setProjects}) =>{
    const getSelectValue =(e)=>{
        setProjects(prev=>{
            prev[index]["type"]=e.target.value;
            return [...prev];
        })
    }

    const getLink =(e)=>{
        setProjects(prev=>{
            prev[index]["link"]=e.target.value;
            return [...prev];
        })
    }

    const getContent =(e)=>{
        setProjects(prev=>{
            prev[index]["content"]=e.target.value;
            return [...prev];
        })

    }

    return(
        <SingleProject>
        {/* <div className="project"> */}
          <LayoutBox>
            {/* <div className="image-type-box"> */}
                <ProjectCover>
                {/* <div className="pj-image-upload"> */}
                <div>
                    { project["cover"] && <ReaclCover src={project["cover"]}/> }
                    { !project["cover"] && <DefaultCover src={coverdefault}/>}
                </div>
                    {/* { project["cover"] && <img className="realcover" src={project["cover"]}></img> }
                    { !project["cover"] && <img className="coverdefault" src={coverdefault}></img>} */}
                {/* <img src={project["cover"]? project["cover"] : coverdefault}></img> */}
                <label><p>+</p>
                <input type="file"  onChange={getFile(index)}></input>
                    {/* <input type="file" className="project-image" onChange={getFile(index)}></input> */}
                </label>
                {/* </div> */}
                </ProjectCover>
                <ProjectContent>
                {/* <div className="type-discript-box"> */}
                    <select value={project["type"]} onChange={getSelectValue}>
                        <option>請選擇</option>
                        <option>文章</option>
                        <option>作品</option>
                    </select>
                    <textarea placeholder="連結說明" value={project["content"]} onChange={getContent}></textarea>
                {/* </div> */}
                </ProjectContent>
            {/* </div> */}
            </LayoutBox>
            <ProjectLink type="text" value={project["link"]} placeholder="在此貼上作品/文章連結" onChange={getLink}></ProjectLink>
            {/* <input className="project-link" type="text" value={project["link"]} placeholder="在此貼上作品/文章連結" onChange={getLink} ></input> */}
        {/* </div> */}
        </SingleProject>
    )
}

export default PersonalProject;