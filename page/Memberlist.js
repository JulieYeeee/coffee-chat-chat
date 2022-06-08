import React ,{useEffect, useState,useRef,useContext} from "react";
import { Link } from "react-router-dom";
import fb from "../static/picture/fb.png";
import firebase from "../src/Firebase"; //initializtion
import { getFirestore,collection, getDocs } from "firebase/firestore";




const Memberlist = () =>{ 


    let [memberlist,setMemberlist]=useState([]);
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
            <div className="memberlist-search">
                <p >Ask Me Anything!</p>
            </div>
            <div className="memberlist-box">
                {memberlist.map((data)=>{
                    let id =data["id"];
                    let tags=data["info"]["detail"]["keyword"];
                    return <Link to={`/membership/${id}`} className="memberlist-card">
                    <div className="memberlist-card-headshot"><img  src={data["info"]["basic"]["headshot"]}></img></div>
                    <div className="memberlist-card-content">
                        <p className="memberlist-card-name">{data["info"]["basic"]["username"]}</p>
                        <p className="memberlist-card-title">{data["info"]["basic"]["title"]}</p>
                        <p className="memberlist-card-welcome">{data["info"]["basic"]["welcome"]}</p>
                        <div className="memberlist-card-tag-box">
                             {tags.map((tag,index)=>{
                                 if(index<5){
                                    return <div className="memberlist-card-tag"><p>{tag["tag"]}</p></div>
                                 }
                                 
                             })}
                        </div>
                    </div>
                 </Link>   

                })}
            </div>
        </main>
    )
}

export default Memberlist;