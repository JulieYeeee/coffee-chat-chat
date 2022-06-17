import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import logo from "../static/picture/logo2.png";

//firebase modules
import firebase from "../src/Firebase";
import { getFirestore,doc, setDoc,getDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword ,signInWithEmailAndPassword } from "firebase/auth";

//useContext
import { GetGlobalContext } from "../component/context/GlobalContext";

//styled-component
import { Main,SingupForm,Logo,CTAtitle,InputLabel,SignupChangeTrigger,SinginForm } from "../component/style/Signin.styled";
import { Button } from "../component/style/Button.styled";



const Signin = () =>{

    //useContext取得共用state
    const {
        account,
        setAccount,
        username,
        setUsername
    } = GetGlobalContext();  
   

    //觸發styled-component css的state,用來控制顯示或隱藏表單
    let [signupCSS, setSignupCSS] = useState("signup signup-hide");
    let [signinCSS, setSigninCSS] = useState("signin");
    
    //放置註冊或登入的信箱及密碼的state
    let [email, setEmail] = useState("test@gmail.com");
    let [password, setPassword] = useState("testtest");
    
    
    //偵測註冊表單的輸入資料
    let passwordCheck;
    const register = (e) => {
        if (e.target.id === "signup-username") {
            let value = e.target.value;
            setUsername(value);
        } else if (e.target.id === "signup-email") {
            let value = e.target.value;
            setEmail(value);
        } else if (e.target.id === "signup-password") {
            let value = e.target.value;
            setPassword(value);
        } else {
            if (password.length < 6) {
                alert("密碼少於六字，請確認");
                return;
            }
            if (e.target.value === password) {
                passwordCheck = true;
            } else {
                passwordCheck = false;
            }
        }
    }

    //偵測會員登入表單偵測
    const signin = (e) => {
        if (e.target.id === "signin-email") {
            setEmail(e.target.value);
        } else {
            setPassword(e.target.value);
        }
    }


    //當會員註冊成功，觸發以下 useEffect 建立個人資料
    let [trigger, setTrigger] = useState(false);
    useEffect(() => {
        if (trigger === "true") {
            initialData();
        } else {
            return
        }
    }, [account]);


    let navigate = useNavigate();
    const initialData = async () => {
        const db = getFirestore(firebase);
        await setDoc(doc(db, "user", account), {
            basic: {
                username:username,
                title: null,
                welcome: null,
                headshot: null
            },
            link: {
                fb: null,
                linkedin: null,
                blog: null
            },
            detail: {
                intro: null,
                keyword: [],
                share: [{num: 1, title: "", content: "" },{num: 2, title: "", content: "" },{num: 3, title: "", content: "" }],
                project:[{cover: null, type: null, content: null, link: null },{cover: null, type: null, content: null, link: null },{cover: null, type: null, content: null, link: null }]
            },
            user: {
                email: email,
                password: password
            }
        });
        navigate("/account");
    }

    //依照使用者按下的按鈕，觸發登入或註冊會員功能
    const submit = (e) => {
        e.preventDefault();
        if (e.target.innerText === "註冊會員") {
            if (passwordCheck === false) {
                alert("密碼二次確認錯誤");
                return;
            } else {
                if (!username || !email || !password) {
                    alert("註冊資料缺漏，請確認");
                    return;
                }
                if (email) {
                    let emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
                    if (email.search(emailRule) == -1) {
                        alert("非有效Email");
                        return;
                    }
                }
            }
            createAccount();
        } else {
            getSignin(email, password);
        }
    }
    
    const createAccount = () => {
        const auth = getAuth(firebase);
        createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
            const user = userCredential.user;
            setTrigger("true");
            setAccount(user.uid);
        }).catch((error) => {
            const errorMessage = error.message;
            alert(errorMessage);
        });
    }


    const getSignin = (email,password) =>{
        const auth = getAuth(firebase);
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            if(user){
                let newId=JSON.parse(JSON.stringify(user.uid));
                setAccount(newId);
            }
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    }
    
    useEffect(()=>{getUserdata()},[account]);

    const getUserdata =async()=>{
        const db = getFirestore(firebase);
        const docRef = doc(db, "user", account);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            let userData=docSnap.data();
            setUsername(userData["basic"]["username"]);
            navigate("/account");
        } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        }
    }

    //改變會員表單
    const changeForm = (e) => {
        if (e.target.innerText === "已經是會員? 點我登入") {
            setSignupCSS("signup signup-hide");
            setSigninCSS("signin");
        } else {
            setSignupCSS("signup");
            setSigninCSS("signin signin-hide");
        }
    }
   
   

   
    return(
        <Main>
            <SingupForm hideControl={signupCSS}>
                <Logo>
                    <img src={logo}></img>
                </Logo>
                <CTAtitle> 加入咖啡圈圈 開始資訊交流 </CTAtitle>
                <InputLabel htmlFor="signup-username">
                    <p> 使用者名稱</p>
                    <input id="signup-username" required onChange={register}></input>
                </InputLabel>
                <InputLabel htmlFor="signup-email">
                    <p> 註冊信箱</p>
                    <input id="signup-email" required onChange={register}></input>
                </InputLabel>
                <InputLabel htmlFor="signup-password">
                    <p> 註冊密碼</p>
                    <input id="signup-password" required onChange={register}></input>
                </InputLabel>
                <InputLabel htmlFor="signup-checkpsw">
                    <p> 再次確認</p>
                    <input id="signup-checkpsw" required onChange={register}></input>
                </InputLabel>
                <Button type="submit" onClick={submit}>註冊會員</Button>
                <SignupChangeTrigger onClick={changeForm}>已經是會員? 點我登入</SignupChangeTrigger>
            </SingupForm>
            
            <SinginForm hideControl={signinCSS}>
                <Logo>
                    <img src={logo}></img>
                </Logo>
                <CTAtitle> 加入咖啡圈圈 開始資訊交流 </CTAtitle>
                <InputLabel htmlFor="signin-email">
                    <p> 輸入信箱</p>
                    <input type="email" id="signin-email" required onChange={signin} value={email}></input>
                </InputLabel>
                <InputLabel htmlFor="signin-password">
                    <p> 輸入密碼</p>
                    <input type="password" id="signin-password" required onChange={signin} value={password}></input>
                </InputLabel>
                 <Button type="submit" onClick={submit}>登入會員</Button>
                 <SignupChangeTrigger onClick={changeForm}>還不是會員? 點我註冊</SignupChangeTrigger>
            </SinginForm>
        </Main>
    )
}

export default Signin;