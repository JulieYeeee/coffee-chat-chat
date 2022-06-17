import React from "react";
//styled-componet
import { Keyword } from "../style/Account.styled";

const Tags = ({tag,id,tags,setTags}) => {
    //使用者編輯關鍵字區，欲刪除指定關鍵字時觸發
    const deleteTag = () => {
        for (let index = 0; index < tags.length; index++) {
            if (tags[index].id === id) {
                tags.splice(index, 1);
                let newTags = JSON.parse(JSON.stringify(tags));
                setTags(newTags);
            }
        }
    }
    
    return(
        <Keyword>
            {tag?tag:""}
            <div onClick={deleteTag}><p>X</p></div>
        </Keyword>
    )
}

export default Tags;