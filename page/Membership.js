//React modules
import React, { useEffect,useState } from "react";
import { Link,useParams } from "react-router-dom";
//png pictures
import fb from "../static/picture/fb.png";
import linkedin from "../static/picture/linkedin.png";
import blog from "../static/picture/blog.png";
//firebase modules
import firebase from "../src/Firebase"; //initializtion
import { getFirestore,doc,getDoc } from "firebase/firestore";
//components
import MembershipTags from "../component/membership/Membershiptags";
import MembershipProjects from "../component/membership/MembershipProjects";
import MembershipShare from "../component/membership/MembershipShare";

const Membership = () =>{
    const { id } = useParams();
    //取得會員資料
    useEffect(()=>{getInitialData()},[id]);
    const db = getFirestore(firebase);
    const getInitialData = async() =>{
        const docRef = doc(db, `user`, id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            let userData=docSnap.data();
            setMemberData(userData);
            
        } else {
        // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }
    // useEffect(()=>setMemberData(userData),[memberName]);

    //states for drag and drop function
    let [shareList,setShareList] = useState([{num:1,title:"",content:""},{num:2,title:"",content:""},{num:3,title:"",content:""}]);
    let [headshot,setHeadshot]=useState(null);
    let [projects,setProjects]=useState([{cover:null,type:null,content:null,link:null},{cover:null,type:null,content:null,link:null},{cover:null,type:null,content:null,link:null}]);
    //states for form data
    let [ memberName,setMemberName]=useState(null);
    let [ title,setTitle]=useState(null);
    let [ fbLink,setFbLink]=useState(null);
    let [ linkedinLink,setLinkedinLink]=useState(null);
    let [ blogLink,setBlogLink]=useState(null);
    let [ intro,setIntro]=useState(null);
    let [ tags ,setTags ]=useState([]);
   

    //set initial user data
    const setMemberData =(userData)=>{
        setMemberName(userData["basic"]["username"]);
        setTitle(userData["basic"]["title"]);
        setHeadshot(userData["basic"]["headshot"]);
        setFbLink(userData["link"]["fb"]);
        setLinkedinLink(userData["link"]["linkedin"]);
        setBlogLink(userData["link"]["blog"]);
        setIntro(userData["detail"]["intro"]);
        setTags(userData["detail"]["keyword"]);
        setShareList(userData["detail"]["share"]);
        setProjects(userData["detail"]["project"])
        console.log("set:",userData);
    }
    



    return(
        <main className="membership-main">
            <div className="membership-box">
            
            <div className="navigation"><Link to="/memberlist">重返列表</Link></div>
            
            <div className="personal-data">
                <div className="personal-left">

                    <div className="headshot-box">
                        <img className="headshot" src={headshot? headshot : null}></img>
                    </div>

                    <div className="personal-basic-link">
                        <p className="personal-username">{memberName? memberName : ""}</p>
                        <p className="personal-title">{title? title : ""}</p>
                        <div className="link-box">
                            <a href={fbLink? fbLink:""} className="link fb">
                                <img className="icon fb" src={fb}></img>
                            </a>
                            <a href={linkedinLink? linkedinLink:""} className="link linkedin">
                                <img className="icon linkedin" src={linkedin}></img>
                            </a>
                            <a href={blogLink? blogLink : ""} className="link blog">
                                <img className="icon blog" src={blog}></img>
                            </a>
                        </div>
                    </div>

                    <div className="intro-box">
                        <p className="intro-title">關於分享者</p>
                        <div className="intro-content-box">
                            <p className="intro">{intro? intro:""}</p>
                        </div>
                    </div>

                    <div className="tag-box">
                        {tags.map((tag)=>(
                            <MembershipTags tag={tag}/>
                        ))}
                    </div>

                    <div className="share-theme-box">
                        <p className="share-title">你可以問我：</p>
                        <div className="share-box">
                            {shareList.map((share)=>{
                                let num=0;
                                if(share["title"] && share["content"]){
                                    num++;
                                    return  <MembershipShare share={share} num={num}/>
                                }
                        })}
                            {/* <div className="share">
                                <span>1</span>
                                <p className="share-short-title">轉職PM建議</p>
                                <p className="share-content">擁有豐富的轉職經歷，在業務背景下轉殖PM，並且深耕科技產業，可與你分享該產業或PM的領域知識。</p>
                            </div>
                            <div className="share">
                                <span>1</span>
                                <p className="share-short-title">轉職PM建議</p>
                                <p className="share-content">擁有豐富的轉職經歷，在業務背景下轉殖PM，並且深耕科技產業，可與你分享該產業或PM的領域知識。</p>
                            </div>
                            <div className="share">
                                <span>1</span>
                                <p className="share-short-title">轉職PM建議</p>
                                <p className="share-content">擁有豐富的轉職經歷，在業務背景下轉殖PM，並且深耕科技產業，可與你分享該產業或PM的領域知識。</p>
                            </div> */}
                        </div>
                    </div>
                </div>


                <div className="personal-right">
                    <form action="/ask">
                        <button type="submit">Ask me!立即提問</button>
                        <div className="ask-rule-box">
                        <p className="ask-rule-title">提問前請遵守：</p>
                        <p className="ask-rule">不得詢問個人隱私之問題，若因提問不當分享者有權婉轉回復。請盡量詢問分享者可分享領域，若因提問超出分享範圍，可能導致您收不到良好回復。</p>
                        </div>
                    </form>
                </div>
                <div className="personal-bottom">
                    <p className="know-more-title">了解更多</p>
                    <div className="project-box">
                            {/* {projects.map((project)=>{
                                console.log("project reading");
                                if(project["type"] && project["link"] && project["content"]){
                                    console.log("project not null!");
                                    return <MembershipProjects project={project}/>
                                }
                            })} */}
                            {projects.map((project)=>
                                project["type"] && project["link"] && project["content"] ? <MembershipProjects project={project}/> : null
    
                            )}
                            {/* {projects.map((project)=>
                                <MembershipProjects project={project}/> 
    
                            )} */}
                        {/* <div className="project">
                            <img></img>
                            <p className="project-type">文章</p>
                            <p className="project-content">五分鐘帶你了解PM職務做什麼。這是我進入科技PM一年時寫的文章。可以先閱讀了解大致樣貌。</p>
                            <Link to="">READ</Link>
                        </div>
                        <div className="project">
                            <img></img>
                            <p className="project-type">文章</p>
                            <p className="project-content">五分鐘帶你了解PM職務做什麼。這是我進入科技PM一年時寫的文章。可以先閱讀了解大致樣貌。</p>
                            <Link to="">READ</Link>
                        </div>
                        <div className="project">
                            <img></img>
                            <p className="project-type">文章</p>
                            <p className="project-content">五分鐘帶你了解PM職務做什麼。這是我進入科技PM一年時寫的文章。可以先閱讀了解大致樣貌。</p>
                            <Link to="">READ</Link>
                        </div> */}
                        
                    </div>
                </div>
            </div>
            </div>



        </main>
    )
}

export default Membership;