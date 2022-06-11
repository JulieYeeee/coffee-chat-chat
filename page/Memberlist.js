import React ,{useEffect, useState,useRef,useContext} from "react";
import { Link } from "react-router-dom";
import fb from "../static/picture/fb.png";
import loading from "../static/picture/loading.gif";
import firebase from "../src/Firebase"; //initializtion
import { getFirestore,collection, getDocs } from "firebase/firestore";

import {SearchBanner,MemberlistBox,MemberCard,Headshot,MemberCardContent,CardContentName,CardContentOther,CardTagsBox} from "../component/style/Memberlist.styled";
import { Loading } from "../component/style/Loading.styled";

const Memberlist = () =>{ 


    let [memberlist,setMemberlist]=useState(null);
    let memberlistRef=useRef([]);
    const db = getFirestore(firebase);
    useEffect(()=>{
            async function getMemberlist(){
                const querySnapshot = await getDocs(collection(db, "user"));
                querySnapshot.forEach((doc) => {
                    memberlistRef.current.push({id:doc.id,info:doc.data()}); 
                });
                setMemberlist(memberlistRef.current);
            }
            getMemberlist();
        }
    ,[])

    
    // const getMemberlist=async()=>{
    //     console.log("memberlist effect2");
    //     const querySnapshot = await getDocs(collection(db, "user"));
    //     querySnapshot.forEach((doc) => {
    //     // doc.data() is never undefined for query doc snapshots
    //     console.log(doc.id, " => ", doc.data());
    //     });

    // }

    

    
    return(
        <main className="memberlist-main">
            <Loading src={loading} closeCheck={memberlist}></Loading>
            <SearchBanner closeCheck={memberlist}>
            <p >Ask Me Anything!</p>
            </SearchBanner>
            {/* <div className="memberlist-search">
                <p >Ask Me Anything!</p>
            </div> */}
            <MemberlistBox closeCheck={memberlist}>
            {/* <div className="memberlist-box"> */}
                {memberlist? memberlist.map((data)=>{
                    let id =data["id"];
                    let tags=data["info"]["detail"]["keyword"];
                    return <MemberCard to={`/membership/${id}`}>
                        <Headshot><img  src={data["info"]["basic"]["headshot"]}></img></Headshot>
                         {/* <div className="memberlist-card-headshot"><img  src={data["info"]["basic"]["headshot"]}></img></div> */}
                    <MemberCardContent>
                    {/* <div className="memberlist-card-content"> */}
                    <CardContentName>{data["info"]["basic"]["username"]}</CardContentName>
                    <CardContentOther>{data["info"]["basic"]["title"]}</CardContentOther>
                    <CardContentOther>{data["info"]["basic"]["welcome"]}</CardContentOther>
                        {/* <p className="memberlist-card-name">{data["info"]["basic"]["username"]}</p> */}
                        {/* <p className="memberlist-card-title">{data["info"]["basic"]["title"]}</p>
                        <p className="memberlist-card-welcome">{data["info"]["basic"]["welcome"]}</p> */}
                        <CardTagsBox>
                        {/* <div className="memberlist-card-tag-box"> */}
                             {tags.map((tag,index)=>{
                                 if(index<5){
                                    return <div className="memberlist-card-tag"><p>{tag["tag"]}</p></div>
                                 }
                                 
                             })}
                        {/* </div> */}
                        </CardTagsBox> 
                    {/* </div> */}
                    </MemberCardContent>
                        
                    </MemberCard>
                //     <Link to={`/membership/${id}`} className="memberlist-card">
                //     <div className="memberlist-card-headshot"><img  src={data["info"]["basic"]["headshot"]}></img></div>
                //     <div className="memberlist-card-content">
                //         <p className="memberlist-card-name">{data["info"]["basic"]["username"]}</p>
                //         <p className="memberlist-card-title">{data["info"]["basic"]["title"]}</p>
                //         <p className="memberlist-card-welcome">{data["info"]["basic"]["welcome"]}</p>
                //         <div className="memberlist-card-tag-box">
                //              {tags.map((tag,index)=>{
                //                  if(index<5){
                //                     return <div className="memberlist-card-tag"><p>{tag["tag"]}</p></div>
                //                  }
                                 
                //              })}
                //         </div>
                //     </div>
                //  </Link>   

                }):null}
            {/* </div> */}
            </MemberlistBox>
        </main>
    )
}

export default Memberlist;