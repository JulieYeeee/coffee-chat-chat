import React from "react";
import { Keyword } from "../style/Account.styled";

const Tags = ({tag,id,tags,setTags}) =>{
    const deleteTag = (e) =>{
        for(let index=0;index<tags.length;index++){
            // console.log(index);
            // console.log(tags[index].id);
            // console.log(id);
            if(tags[index].id===id){
                tags.splice(index,1);
                let newTags=JSON.parse(JSON.stringify(tags));
                setTags(newTags);
                // console.log(newTags);
            }
        }

    }
    return(
        <Keyword>
        {/* <span className="tag"> */}
            {tag}
            <div  onClick={deleteTag}><p>X</p></div>
            {/* <div className="tag-delete" onClick={deleteTag}><p>X</p></div> */}
        {/* </span> */}
        </Keyword>
    )
}

export default Tags;