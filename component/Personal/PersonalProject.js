import React from "react";

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
        <div className="project">
            <div className="image-type-box">
                <div className="pj-image-upload">
                <img src={project["cover"]}></img>
                <label>上傳封面
                    <input type="file" className="project-image" onChange={getFile(index)}></input>
                </label>
                </div>
            <div className="type-discript-box">
                <select name="project-type" value={project["type"]} onChange={getSelectValue}>
                    <option>請選擇</option>
                    <option>文章</option>
                    <option>作品</option>
                </select>
                <textarea placeholder="連結說明" value={project["content"]} onChange={getContent}></textarea>
            </div>
            </div>
            <input className="project-link" type="text" value={project["link"]} placeholder="在此貼上作品/文章連結" onChange={getLink} ></input>
        </div>
    )
}

export default PersonalProject;