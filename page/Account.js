import React,{useEffect,useState,useCallback} from "react";
import { useNavigate } from "react-router-dom";
import fb from "../static/picture/fb.png";
import linkedin from "../static/picture/linkedin.png";
import blog from "../static/picture/blog.png";
import Tags from "../component/Personal/PersonalTags";
import PersonalShare from "../component/Personal/PersonalShare";
import PersonalProject from "../component/Personal/PersonalProject";
import { v4 as uuidv4 } from 'uuid';



const Account = ( {account,setAccount} ) =>{ 
    let navigate=useNavigate();
    useEffect(()=>{
        if(account){
            console.log("account page:",account);
        }else{
            navigate("/signin");
        }

    },[]);


    let [ tags ,setTags ]=useState([]);
    const addTags = (e) =>{
        if(e.key === "Enter"){
            e.preventDefault();
            if(e.target.value!=""){
                let tag=e.target.value;
                setTags([...tags,{tag:tag ,id:uuidv4()}]);
                e.target.value="";
            }
        }
    }

    let [shareList,setShareList] = useState([{num:1,title:"",content:""},{num:2,title:"",content:""},{num:3,title:"",content:""}]);
    let [dragIndex,setDragIndex]=useState(null);
    let [exchange,setExchange]=useState({drag:{num:"",title:"",content:""},drop:{num:"",title:"",content:""}});


    let [headshotURL,setImage]=useState(null);
    let [pjCoverURL,setPjCoverURL]=useState([{coverURL:null},{coverURL:null},{coverURL:null}])
    const getFile=(index)=>(e)=>{
        console.log(e.target);
        let inputSource=e.target.className;
        let file=e.target.files[0];
        let imageType = /image.*/;
        if (!file.type.match(imageType)) {
            alert("請上傳圖像");
            return;
          }
          let reader = new FileReader();
          reader.onload = () =>{
                if(inputSource==="headshot"){
                setImage(reader.result);
            }else{
                pjCoverURL[index]["coverURL"]=reader.result;
                let newpjCoverURL =JSON.parse(JSON.stringify(pjCoverURL))
                setPjCoverURL(newpjCoverURL);
            }
          }
            
          reader.readAsDataURL(file);
    }
    

    

    // if(account){
    //     console.log(account);
    // }else{
    //     navigate("/signin");
    // }

   


    return(
        <main className="personal-info-main">
        <form >
            <div className="personal-photo-name">
                <div className="personal-img-upload">
                    <img src={headshotURL}></img>
                    <label>選擇頭像
                    <input type="file" className="headshot" onChange={getFile(null)}></input>
                    </label>
                </div>
                <div className="personal-name-info">
                    <label htmlFor="name">名稱
                    <input type="text" id="name" placeholder="名稱"></input>
                    </label>
                    <label htmlFor ="title">個人抬頭
                    <input type="text" placeholder="為自己起一個響亮的Title"></input>
                    </label>
                    <label htmlFor ="short-intro">短介紹
                    <input type="text" placeholder="用20字招呼語讓人認識你"></input>
                    </label>
                </div>
            </div>
                <div className="personal-outlink">
                    <div className="personal-outlink-fb">
                        <img src={fb}></img>
                        <input className="fb-link"></input>
                    </div>
                    <div className="personal-outlink-linkedin">
                        <img src={linkedin}></img>
                        <input className="linkedin-link"></input>
                    </div>
                    <div className="personal-outlink-blog">
                        <img src={blog}></img>
                        <input className="blog-link"></input>
                    </div>
                </div>
                <div className="personal-intro">
                    <p>輸入自我介紹</p>
                    <textarea></textarea>
                </div>
                <div className="personal-keyword">
                    <p>建立個人關鍵字</p>
                    <div className="tags-box">
                        {tags.map((tag)=>(
                            <Tags tag={tag.tag} id={tag.id} key={tag.id} tags={tags} setTags={setTags}/>
                        ))}
                        <input placeholder="輸入關鍵字並Enter即可生成" onKeyPress={addTags}></input>  
                    </div>
                    
                </div>
                <div className="personal-share-theme">
                    <p>告訴別人你的可分享領域</p>
                    <div className="share-theme-box">
                        {shareList.map((share,index)=>
                            <PersonalShare shareList={shareList} setShareList={setShareList} index={index} share={share} dragIndex={dragIndex} setDragIndex={setDragIndex} exchange={exchange} setExchange={setExchange}/>
                        )}
                    </div>
                    
                </div>
                <div className="personal-project">
                    <p>建立作品/文章連結</p>
                    {pjCoverURL.map((pjCover,index)=>
                        <PersonalProject getFile={getFile} pjCoverURL={pjCoverURL} setPjCoverURL={setPjCoverURL} pjCover={pjCover} index={index} />
                        )
                    }
                    {/* <div className="project project1">
                        <div className="image-type-box">
                            <div className="pj-image-upload">
                            <img></img>
                            <label>上傳封面
                                <input type="file" className="project-image" onClick={getFile}></input>
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
                    <div className="project project2">
                        <div className="image-type-box">
                            <div className="pj-image-upload">
                            <img></img>
                            <label>上傳封面
                                <input type="file" className="project-image" onClick={getFile}></input>
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
                    <div className="project project3">
                        <div className="image-type-box">
                            <div className="pj-image-upload">
                                <img></img>
                                <label>上傳封面
                                    <input type="file" className="project-image" onClick={getFile}></input>
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
                    </div> */}
                </div>
            
            <button type="submit">填寫完成，建立個人頁面</button>
        </form>
        </main>
    )
};

export default Account;