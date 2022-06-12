import React,{useEffect,useState,useRef} from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
//圖片
import fb from "../static/picture/fb.png";
import linkedin from "../static/picture/linkedin.png";
import blog from "../static/picture/blog.png";
import defaultHeadshot from "../static/picture/headshot.png";
import coverdefault from "../static/picture/coverdefault.png";
import loading from "../static/picture/loading.gif";
//components
import Tags from "../component/Personal/PersonalTags";
import PersonalShare from "../component/Personal/PersonalShare";
import PersonalProject from "../component/Personal/PersonalProject";
//Firebase modules
import firebase from "../src/Firebase"; //initializtion
import { getAuth ,onAuthStateChanged} from "firebase/auth"; //check login status
import { getStorage , ref,uploadBytes,getDownloadURL} from "firebase/storage";//upload or dowload images 
import { getFirestore,doc,getDoc,updateDoc  } from "firebase/firestore";
import { GetGlobalContext } from "../component/context/GlobalContext";
//styled-component
import {Loading} from "../component/style/Loading.styled";
import { AccountForm,AccountBasic,Headshot,Headshotimg,HeadshotLabel,BasicInfoBox} from "../component/style/Account.styled";
import { AccountLinkBox,SingleLink,AccountIntroBox,AccountKeywordBox,KeywordInsideBox } from "../component/style/Account.styled";
import { AccountShareThemeBox,ShareThemeInsideBox,AccountProjectBox,AccountButton } from "../component/style/Account.styled";

const Account = () =>{ 
    const {account,setAccount,username,setUsername}=GetGlobalContext();

    //確認使用者是否登入，若未登入跳轉至登入頁
    let navigate=useNavigate();    
    useEffect(()=>{
        const auth=getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setAccount(user.uid);
                getInitialData();
            } else {
                navigate("/signin");
            }
        });
    },[]);
    

    //取得會員資料
    const userDatatRef = useRef(null);
    useEffect(()=>{getInitialData();},[account]);
    const db = getFirestore(firebase);
    const getInitialData = async()=>{
        const docRef = doc(db, `user`, account);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            userDatatRef.current = docSnap.data();
            setInitialData(userDatatRef.current);
        } else {
        // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }


    //從資料庫抓取資料後，在state設定會員既有資料，使畫面重新渲染
    const setInitialData = (userData)=>{
        setUsername(userData["basic"]["username"]);
        setTitle(userData["basic"]["title"]);
        setWelcome(userData["basic"]["welcome"]);
        setHeadshot(userData["basic"]["headshot"]);
        setFbLink(userData["link"]["fb"]);
        setLinkedinLink(userData["link"]["linkedin"]);
        setBlogLink(userData["link"]["blog"]);
        setIntro(userData["detail"]["intro"]);
        setTags(userData["detail"]["keyword"]);
        setShareList(userData["detail"]["share"]);
        setProjects(userData["detail"]["project"]);
    }

    

    //按下儲存按鈕後，更新資料庫會員資料
    const addUserData = async(e)=>{
        e.preventDefault();
        await updateDoc(doc(db, "user", account), {
            basic:{
                username:username,
                title:title,
                welcome:welcome,
                headshot:headshot
            },
            link:{
                fb:fbLink,
                linkedin:linkedinLink,
                blog:blogLink
            },
            detail:{
                intro:intro,
                keyword:tags,
                share:shareList,
                project:projects
            },
          });
          alert("Your information is already changed.🆗"+
          `Your page: https://coffee-chat-together.web.app/membership/${account}`);

    }

   



    //使用者輸入關鍵字區並enter後資料處理
    let [ tags ,setTags ] = useState([]);
    const addTags=(e) =>{
        if(e.key==="Enter"){
            e.preventDefault();
            if(e.target.value!=""){
                let tag=e.target.value;
                setTags([...tags,{tag:tag ,id:uuidv4()}]);
                e.target.value="";
            }
        }
    }

    //states for drag and drop function
    let [shareList,setShareList]=useState([{num:1,title:"",content:""},{num:2,title:"",content:""},{num:3,title:"",content:""}]);
    let [dragIndex,setDragIndex]=useState(null);
    let [exchange,setExchange]=useState({drag:{num:"",title:"",content:""},drop:{num:"",title:"",content:""}});
    
    //states for image which is uploaded by user
    let [headshot,setHeadshot]=useState(null);
    let [projects,setProjects]=useState([{cover:null,type:null,content:null,link:null},{cover:null,type:null,content:null,link:null},{cover:null,type:null,content:null,link:null}]);
  
    //states for form data
    let [ title,setTitle]=useState(null);
    let [ welcome,setWelcome]=useState(null);
    let [ fbLink,setFbLink]=useState(null);
    let [ linkedinLink,setLinkedinLink]=useState(null);
    let [ blogLink,setBlogLink]=useState(null);
    let [ intro,setIntro]=useState(null);

   
    //使用者上傳大頭照後資料處理,取得圖片網址
    useEffect(()=>{
        const storage=getStorage();
        let imageName=headshot;
        if(imageName){
            getDownloadURL(ref(storage, imageName))
            .then((url)=>{
                setHeadshot(url);                    
            })
            .catch((error)=>{
                alert("oops!something went wrong");
            });
       }
        
    },[headshot]);

    //使用者上傳作品封面照後會觸發的函式，此函式會取得圖片網址
    const getImageURL=(imgElement,index)=>{
        const storage=getStorage();
        let imageName=projects[index]["cover"];
        if(imageName){
            getDownloadURL(ref(storage, imageName))
            .then((url)=>{
                if(url){
                    imgElement.src=url;
                    setProjects(prev=>{
                        prev[index]["cover"]=url;
                        return [...prev];
                    })
                }else{
                    return;
                }
            })
            .catch((error)=>{
                alert("oops!something went wrong");
            });
    
        }else{
            return;
        }

    }
        
         
    //使用者上傳圖像後
    const getFile=(index)=>async(e)=>{
        let imgElement=e.target.parentElement.parentElement.children[0];
        let inputSource=e.target.className;
        let file=e.target.files[0];
        let imageType=/image.*/;
        if (!file.type.match(imageType)) {
            alert("請上傳圖像");
            return;
          }
        //上傳至 firebase storage 並取得圖片名稱
        const storage=getStorage(firebase);
        const fileRef =ref(storage,file.name+uuidv4())
        let result=await uploadBytes(fileRef, file)
        //將圖片名稱存入 state 以便後續取得圖片網址
        if(inputSource==="headshot"){
            let newHeadshot=result["metadata"]["name"]
            setHeadshot(newHeadshot);
        }
        if(inputSource==="project-image"){
            projects[index]["cover"]=result["metadata"]["name"];
            let newProjects=[...projects];
            setProjects(newProjects);
            getImageURL(imgElement,index);
        }
        
    }
   


    return(
        <main >
            <Loading src={loading} closeCheck={userDatatRef.current}></Loading>
            <AccountForm closeCheck={userDatatRef.current}>
                <AccountBasic>
                    <Headshot className="headshot">
                    <Headshotimg src={headshot? headshot : defaultHeadshot}/>
                        <HeadshotLabel>
                        <p>+</p>
                        <input type="file" onChange={getFile(null)}></input>
                        </HeadshotLabel>
                    </Headshot>

                    <BasicInfoBox>
                        <label htmlFor="name">名稱
                        <input type="text" id="name" placeholder="名稱" value={username?username:undefined} onChange={(e)=>{setUsername(e.target.value)}}></input>
                        </label>
                        <label htmlFor="title">個人抬頭
                        <input type="text" placeholder="為自己起一個響亮的Title" value={title?title:undefined} maxLength="15" onChange={(e)=>{setTitle(e.target.value)}}></input>
                        </label>
                        <label htmlFor="short-intro">短介紹
                        <input type="text" placeholder="用20字招呼語讓人認識你" value={welcome?welcome:undefined} maxLength="25" onChange={(e)=>{setWelcome(e.target.value)}}></input>
                        </label>
                    </BasicInfoBox>
                </AccountBasic>
                <AccountLinkBox>
                    <SingleLink>
                        <img src={fb}></img>
                        <input className="fb-link" value={fbLink?fbLink:undefined} onChange={(e)=>{setFbLink(e.target.value)}}></input>
                    </SingleLink>
                    <SingleLink>
                        <img src={linkedin}></img>
                        <input className="linkedin-link" value={linkedinLink?linkedinLink:undefined} onChange={(e)=>{setLinkedinLink(e.target.value)}}></input>
                    </SingleLink>
                    <SingleLink>
                        <img src={blog}></img>
                        <input className="blog-link" value={blogLink?blogLink:undefined} onChange={(e)=>{setBlogLink(e.target.value)}}></input>
                    </SingleLink>
                </AccountLinkBox>
                <AccountIntroBox>
                    <p>輸入自我介紹</p>
                    <textarea value={intro?intro:undefined} onChange={(e)=>{setIntro(e.target.value)}}></textarea>
                </AccountIntroBox>
                <AccountKeywordBox>
                    <p>建立個人關鍵字</p>
                    <KeywordInsideBox>
                        {tags?tags.map((tag)=>(
                            <Tags tag={tag.tag} id={tag.id} key={tag.id} tags={tags} setTags={setTags}/>
                        )):undefined}
                        <input placeholder="輸入關鍵字並Enter即可生成" onKeyPress={addTags}></input>  
                    </KeywordInsideBox>
                </AccountKeywordBox>
                <AccountShareThemeBox>
                    <p>告訴別人你的可分享領域</p>
                    <ShareThemeInsideBox>
                        {shareList?shareList.map((share,index)=>
                            <PersonalShare shareList={shareList} setShareList={setShareList} index={index} share={share} dragIndex={dragIndex} setDragIndex={setDragIndex} exchange={exchange} setExchange={setExchange}/>
                        ):undefined}
                    </ShareThemeInsideBox>
                </AccountShareThemeBox>
                <AccountProjectBox>
                    <p>建立作品/文章連結</p>
                    {projects? projects.map((project,index)=>
                        <PersonalProject getFile={getFile} index={index} project={project} setProjects={setProjects} />
                        ):undefined
                    }
                </AccountProjectBox>   
                <AccountButton type="submit" onClick={addUserData}>填寫完成，建立個人頁面</AccountButton> 
            </AccountForm>
        </main>
    )
};

export default Account;