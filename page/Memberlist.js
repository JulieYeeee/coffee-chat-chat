import React ,{useEffect, useState,useRef,useContext} from "react";
//圖片
import loading from "../static/picture/loading.gif";
//Firebase modules
import firebase from "../src/Firebase"; //initializtion
import { getFirestore,collection, getDocs } from "firebase/firestore";
//styled-component
import {SearchBanner,MemberlistBox,MemberCard,Headshot,MemberCardContent,CardContentName,CardContentOther,CardTagsBox} from "../component/style/Memberlist.styled";
import { Loading } from "../component/style/Loading.styled";

const Memberlist = () =>{ 

    //放置從資料庫取得會員資料的state
    let [memberlist, setMemberlist] = useState(null);
    let memberlistRef = useRef([]); //搭配useRef避免過度渲染
    const db = getFirestore(firebase);
    //一載入頁面就抓取會員資料
    useEffect(() => {
        async function getMemberlist() {
            const querySnapshot = await getDocs(collection(db, "user"));
            querySnapshot.forEach((doc) => {
                memberlistRef.current.push({
                    id: doc.id,
                    info: doc.data()
                });
            });
            setMemberlist(memberlistRef.current);
        }
        getMemberlist();
    }, [])
    

    
    return(
        <main>
            <Loading src={loading} closeCheck={memberlist}></Loading>
            <SearchBanner closeCheck={memberlist}>
                <p >Ask Me Anything!</p>
            </SearchBanner>
            <MemberlistBox closeCheck={memberlist}>
                {memberlist? memberlist.map((data)=>{
                    if(data["info"]["basic"]["username"]&&data["info"]["basic"]["title"]&&data["info"]["basic"]["username"]&&data["info"]["basic"]["welcome"]){
                        let id=data["id"];
                        let tags=data["info"]["detail"]["keyword"];
                        return <MemberCard to={`/membership/${id}`}>
                                    <Headshot><img  src={data["info"]["basic"]["headshot"]}></img></Headshot>
                                    <MemberCardContent>
                                        <CardContentName>{data["info"]["basic"]["username"]}</CardContentName>
                                        <CardContentOther>{data["info"]["basic"]["title"]}</CardContentOther>
                                        <CardContentOther>{data["info"]["basic"]["welcome"]}</CardContentOther>
                                        <CardTagsBox>
                                            {tags.map((tag,index)=>{
                                                if(index<5){
                                                return <div className="memberlist-card-tag"><p>{tag["tag"]}</p></div>
                                                }
                                            })}
                                        </CardTagsBox> 
                                    </MemberCardContent>
                                </MemberCard>
                    }
                    
                }):null}
            </MemberlistBox>
        </main>
    )
}

export default Memberlist;