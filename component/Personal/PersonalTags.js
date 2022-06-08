import React from "react";

const Tags = ({tag,id,tags,setTags}) =>{
    const deleteTag = (e) =>{
        for(let index=0;index<tags.length;index++){
            console.log(index);
            console.log(tags[index].id);
            console.log(id);
            if(tags[index].id===id){
                tags.splice(index,1);
                let newTags=JSON.parse(JSON.stringify(tags));
                setTags(newTags);
                console.log(newTags);
            }
        }

    }
    return(
        <span className="tag">
            {tag}
            <div className="tag-delete" onClick={deleteTag}><p>X</p></div>
        </span>
    )
}

export default Tags;