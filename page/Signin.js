import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import logo from "../static/picture/logo.png";
// import getSignin from "../src/GetSignin";
import firebase from "../src/Firebase";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword ,signInWithEmailAndPassword } from "firebase/auth";



const Signin = ({account,setAccount,username,setUsername}) =>{
    let [ signupCSS ,setSignupCSS ]= useState("signup");
    let [ signinCSS ,setSigninCSS ]= useState("signin signin-hide");
    let [ email ,setEmail ]= useState("");
    let [ password , setPassword ]= useState("");
    let [registrationStatus,setStatus]=useState(false);
    

    let passwordCheck;
    const register = (e) =>{
        if (e.target.id === "signup-username"){
            let value=e.target.value;
            setUsername(value);
        }else if(e.target.id === "signup-email"){
            let value=e.target.value;
            setEmail(value);
        }else if(e.target.id === "signup-password"){
            let value=e.target.value;
            setPassword(value);            
        }else{
            if(password.length<6){
                alert("密碼少於六字，請確認");
                return;
            }
            if(e.target.value === password){
                passwordCheck=true;
                console.log("註冊成功");
            }else{
                passwordCheck=false;
                console.log("註冊失敗");
            }
        }

    }


    const signin = (e) =>{
        if(e.target.id ==="signin-email"){
            setEmail(e.target.value);
        }else{
            setPassword(e.target.value);
        }
    }


    //原本是useEffect直接放async function 但觸發不成功，後來查詢youtube說async其實不建議放在useEffect內因此提取出來成為函式，即可正常觸發
    let [trigger,setTrigger]=useState(false);
    useEffect(()=>{
        if(trigger==="true"){
            initialData()
        }else{
            return
        }},[account]);

    let navigate=useNavigate();
    const initialData = async() =>{
        const db = getFirestore(firebase);
        await setDoc(doc(db, "user", account), {
            basic:{
                username:username,
                title:null,
                welcome:null,
                headshot:null
            },
            link:{
                fb:null,
                linkedin:null,
                blog:null
            },
            detail:{
                intro:null,
                keyword:[],
                share:[{num:1,title:"",content:""},{num:2,title:"",content:""},{num:3,title:"",content:""}],
                project:[{cover:null,type:null,content:null,link:null},{cover:null,type:null,content:null,link:null},{cover:null,type:null,content:null,link:null}]
            },
            user:{
                email:email,
                password:password
            }
          });
          navigate("/account");
        console.log("open",account,username,email,password);
    }


    const submit = (e) =>{
        e.preventDefault();
        if(e.target.innerText === "註冊會員"){
            if(passwordCheck===false){
                alert("密碼二次確認錯誤");
                return;
            }else{
                if(!username || !email || !password){
                    alert("註冊資料缺漏，請確認");
                    return;
                }
                if(email){
                    let emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
                    if(email.search(emailRule)==-1){
                        alert("非有效Email");
                        return;
                    }
                }
            }

            createAccount();

        }else{
            getSignin(email,password);
            console.log("登入會員");
        }

    }
    const createAccount = () =>{
          const auth = getAuth(firebase);
          createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
              const user = userCredential.user;
              setTrigger("true");
              setAccount(user.uid);
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              console.log("4",errorMessage);
            });
      
      }

    const getSignin = (email,password) =>{
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            user? navigate("/account"): null;
            // if(user){
            //     navigate("/account");
            // }
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    }


    const changeForm = (e) =>{
        if (e.target.innerText === "已經是會員? 點我登入"){
            setSignupCSS("signup signup-hide");
            setSigninCSS("signin");
        }else{
            setSignupCSS("signup");
            setSigninCSS("signin signin-hide");
        }
        
    }
    


    // let navigate=useNavigate();
    // useEffect(()=>{
    //     if(registrationStatus===false){
    //         return;
    //     }else{
    //         navigate("/account");
    //     }
    // },[registrationStatus]);
    //錯誤用法因為useState不及時 導致infinity loop
       

    

   
    return(
        <main className="signin-main" >
            <form className={signupCSS}>
                <div className="signin-logo-container">
                    <img src={logo}></img>
                </div>
                <p className="signup-title">加入咖啡圈圈 開始資訊交流</p>
                <label htmlFor="signup-username">
                    <p>使用者名稱</p>
                    <input type="text" id="signup-username" required onChange={register}></input>
                </label>
                <label htmlFor="signup-email">
                    <p>註冊信箱</p>
                    <input type="email" id="signup-email" required onChange={register}></input>
                </label>
                <label htmlFor="signup-password">
                    <p>註冊密碼</p>
                    <input type="password" id="signup-password" className="psw1" required onChange={register}></input>
                </label>
                <label htmlFor="signup-checkpsw">
                    <p>再次確認</p>
                    <input type="password" id="signup-checkpsw" className="psw2" required onChange={register}></input>
                </label>
                <button type="submit" className="signup-btn" onClick={submit}>註冊會員</button>
                <div className="signup-change" onClick={changeForm}>已經是會員? 點我登入</div>
            </form>
            
            <form className={signinCSS}>
                <div className="signin-logo-container">
                    <img src={logo}></img>
                </div>
                <p className="signin-title">加入咖啡圈圈 開始資訊交流</p>
                <label htmlFor="signin-email">
                    <p>輸入信箱</p>
                    <input type="email" id="signin-email" required onChange={signin}></input>
                </label>
                <label htmlFor="signin-password">
                    <p>輸入密碼</p>
                    <input type="password" id="signin-password" className="psw" required onChange={signin}></input>
                </label>
                <button type="submit" className="signin-btn" onClick={submit}>登入會員</button>
                <div className="signin-change" onClick={changeForm}>還不是會員? 點我註冊</div>
            </form>


        </main>
    )
}

export default Signin;