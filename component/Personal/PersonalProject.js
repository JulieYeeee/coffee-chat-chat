import React from "react";

const PersonalProject = ({pjCoverURL,setPjCoverURL,pjCover,index,getFile}) =>{
    
    return(
        <div className="project project1">
            <div className="image-type-box">
                <div className="pj-image-upload">
                <img src={pjCover["coverURL"]}></img>
                <label>上傳封面
                    <input type="file" className="project-image" onChange={getFile(index)}></input>
                </label>
                </div>
            <div className="type-discript-box">
                <select name="project-type">
                    <option>請選擇</option>
                    <option>文章</option>
                    <option>作品</option>
                </select>
                <textarea placeholder="連結說明"></textarea>
            </div>
            </div>
            <input className="project-link" type="text" placeholder="在此貼上作品/文章連結"></input>
        </div>
    )
}

export default PersonalProject;