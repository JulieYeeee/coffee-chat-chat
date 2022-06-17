//React modules
import React, { useEffect,useState,useRef } from "react";
import { Link,useNavigate,useParams } from "react-router-dom";
//png pictures
import fb from "../static/picture/fb.png";
import linkedin from "../static/picture/linkedin.png";
import blog from "../static/picture/blog.png";
import loading from "../static/picture/loading.gif";
//firebase modules
import firebase from "../src/Firebase"; //initializtion
import { getFirestore,doc,getDoc,addDoc,collection,updateDoc,getDocs,query,where,deleteDoc } from "firebase/firestore";
//components
import MembershipProjects from "../component/membership/MembershipProjects";
//useContext
import { GetGlobalContext } from "../component/context/GlobalContext";
//styled-component
import { MembershipBox,Navigation,MemberdataBox,MemberDataLeft,MemberHeadshot,BasicInfoBox,BasicInfoText,LinkBox ,IntroBox,Title,TagBox,Tag,ShareThemeBox,ShareThemeInsideBox,SingleShare,ShareTitle,ShareContent} from "../component/style/Membership.styled";
import { MemberDataRight,Askform,AskButton } from "../component/style/Membership.styled";
import { ProjectBox,ProjectInsideBox, } from "../component/style/Membership.styled";
import {Button} from "../component/style/Button.styled" ;
import { Loading } from "../component/style/Loading.styled";

const Membership = () =>{
    //useContext取得共用state
    const {
        account,
        username,
        setUsername,
        setOrderNum
    } = GetGlobalContext();

    //取得 URL parameter,對應資料庫編號取得會員資料
    const { id } = useParams();
    //取得會員資料
    const db = getFirestore(firebase);
    useEffect(() => {
    	closeRef.current = 0;
    	const getInitialData = async () => {
    		const docRef = doc(db, `user`, id);
    		const docSnap = await getDoc(docRef);
    		if (docSnap.exists()) {
    			let userData = docSnap.data();
    			setMemberData(userData);
    		} else {
    			// doc.data() will be undefined in this case
    			console.log("No such document!");
    		}
    	}
    	//取得會員資料
    	getInitialData()
    }, [id]);
    
    

    //states for form data 會員資料取得後分別儲存state
    let [shareList, setShareList] = useState([{num:1,title:"",content:""},{num:2,title:"",content:""},{num:3,title:"",content:""}]);
    let [headshot, setHeadshot] = useState(null);
    let [projects, setProjects] = useState([{cover:null,type:null,content:null,link:null},{cover:null,type:null,content:null,link:null},{cover:null,type:null,content:null,link:null}]);
    let [memberName, setMemberName] = useState(null);
    let [title, setTitle] = useState(null);
    let [fbLink, setFbLink] = useState(null);
    let [linkedinLink, setLinkedinLink] = useState(null);
    let [blogLink, setBlogLink] = useState(null);
    let [intro, setIntro] = useState(null);
    let [tags, setTags] = useState([]);
    let [memberEmail, setEmail] = useState(null);
    let [consultantAccount, setConsultantAccount] = useState(null);
    let closeRef = useRef(0);
   
    //set initial user data
    const setMemberData = async (userData) => {
    	setMemberName(userData["basic"]["username"]);
    	setTitle(userData["basic"]["title"]);
    	setHeadshot(userData["basic"]["headshot"]);
    	setFbLink(userData["link"]["fb"]);
    	setLinkedinLink(userData["link"]["linkedin"]);
    	setBlogLink(userData["link"]["blog"]);
    	setIntro(userData["detail"]["intro"]);
    	setTags(userData["detail"]["keyword"]);
    	setShareList(userData["detail"]["share"]);
    	setProjects(userData["detail"]["project"]);
    	setEmail(userData["user"]["email"]);
    	closeRef.current = 0;
    	const db = getFirestore(firebase);
    	const getConsultAccountQuery = query(collection(db, "user"), where("user.email", "==", userData["user"]["email"]));
    	let docs = await getDocs(getConsultAccountQuery);
    	if (docs) {
    		docs.forEach(doc => {
    			setConsultantAccount(doc.id);
    		})
    	}
    }
    
    //使用者按下提問後建立事前訂單資料,若未登入將阻止使用者提問
    let navigate = useNavigate();
    const buildAsk = async (e) => {
        e.preventDefault();
        //確認使用者先前是否有存在未完成訂單，若有則刪除，避免多餘無效訂單
        if (account) {
            const checkQuery = query(collection(db, "pre-order"), where("account", "==", account), where("consultantEmail", "==", memberEmail), where("payment", "==", null));
            let docs = await getDocs(checkQuery);
            if (docs) {
                docs.forEach(docitem => {
                    deleteRepeat(docitem);
                })
            }
        } else {
            alert("請先登入");
            return;
        }
        //如果前面沒被return 以下就會執行: 建立新初步訂單
        async function deleteRepeat(docitem) {
            await deleteDoc(doc(db, "pre-order", docitem.id))
        }
        const userDocRef = doc(db, "user", account);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
            let newUsername = JSON.parse(JSON.stringify(userDocSnap.data()["basic"]["username"]));
            setUsername(newUsername);
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
        const docRef = await addDoc(collection(db, "pre-order"), {
            number: null,
            account: account,
            askInfo: null,
            askName: username,
            askQuestion: null,
            consultantAccount: consultantAccount,
            consultantEmail: memberEmail,
            consultantName: memberName,
            payment: null,
            headshot: headshot,
            reply: false
        });
        //回傳文件編號，回存到訂單文件中
        if (docRef.id) {
            console.log(docRef.id);
            console.log("check username:", username);
            await updateDoc(doc(db, "pre-order", docRef.id), {
                number: docRef.id
            })
            setOrderNum(docRef.id);
            navigate("/ask");
        }
    }

    
    let shareNumRef=useRef(0);


    return(
        <main>
            <Loading src={loading} closeCheck={memberEmail}/>
            <MembershipBox closeCheck={memberEmail}>
           
                <Navigation><Link to="/memberlist">重返列表</Link></Navigation>
            
                <MemberdataBox>
                    <MemberDataLeft>
                        <MemberHeadshot>
                            <img className="headshot" src={headshot? headshot : null}></img>
                        </MemberHeadshot>
                        <BasicInfoBox>
                            <BasicInfoText>{memberName? memberName : ""}</BasicInfoText>
                            <BasicInfoText>{title? title : ""}</BasicInfoText>
                            <LinkBox>
                                <a href={fbLink? fbLink:""} className="link fb" target="_blank">
                                    <img className="icon fb" src={fb}></img>
                                </a>
                                <a href={linkedinLink? linkedinLink:""} className="link linkedin" target="_blank">
                                    <img className="icon linkedin" src={linkedin}></img>
                                </a>
                                <a href={blogLink? blogLink : ""} className="link blog" target="_blank">
                                    <img className="icon blog" src={blog}></img>
                                </a>
                            </LinkBox>
                        </BasicInfoBox>
                        <IntroBox>
                            <Title>關於分享者</Title>
                            <div className="intro-content-box">
                                <p className="intro">{intro? intro:""}</p>
                            </div>
                        </IntroBox>

                        <TagBox>
                            {tags.map((tag)=>(
                                <Tag>
                                    <p>{tag["tag"]}</p>
                                </Tag>
                            
                            ))}
                        </TagBox>
                        <ShareThemeBox>
                            <Title>你可以問我</Title>
                            <ShareThemeInsideBox>
                               
                                {
                                    shareList.map((share,index)=>{
                                        if(share["title"] && share["content"]){
                                            return <SingleShare>
                                                        <ShareTitle>
                                                            <span>{index+1}</span>
                                                            <p >{share["title"]}</p>
                                                        </ShareTitle>
                                                        <ShareContent>{share["content"]}</ShareContent>
                                                    </SingleShare> 
                                        }
                                    })

                                }
                            </ShareThemeInsideBox>
                        </ShareThemeBox>
                    </MemberDataLeft>

                    <MemberDataRight>
                        <Askform>
                            <AskButton onClick={buildAsk}>Ask me!立即提問</AskButton>
                            <div className="ask-rule-box">
                                <p className="ask-rule-title">提問前請遵守：</p>
                                <p className="ask-rule">不得詢問個人隱私之問題，若因提問不當分享者有權婉轉回覆。請盡量詢問分享者可分享領域，若因提問超出分享範圍，可能導致您收不到良好回覆。</p>
                            </div>
                        </Askform>
                
                    </MemberDataRight>
                    <ProjectBox closeCheck={closeRef.current}>
                        <Title>了解更多</Title>
                        <ProjectInsideBox >
                                {projects.map((project)=>{
                                        if(project["type"] && project["link"] && project["content"]){
                                            return <MembershipProjects project={project}/>
                                        }else{
                                            closeRef.current=closeRef.current+1;
                                        }
                                    }
                                )}

                        </ProjectInsideBox>
                    </ProjectBox>
                </MemberdataBox>
            </MembershipBox>
        </main>
    )
}

export default Membership;