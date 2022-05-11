import React, { useEffect,useState} from "react";
import logo from "../static/picture/logo.png";
import getSignin from "../src/GetSignin";
import createAccount from "../src/CreateAccount";



const Signin = ({account,setAccount}) =>{
    let [ signupCSS ,setSignupCSS]= useState("signup");
    let [ signinCSS ,setSigninCSS]= useState("signin signin-hide");
    let [ username ,setUsername]=useState("");
    let [ email ,setEmail]= useState("");
    let [ password , setPassword]= useState("");

    const fillupForm = (e) =>{
        if (e.target.id==="signup-username"){
            setUsername(e.target.value);
            console.log(e.target.value);
        }else if(e.target.id==="signup-email"){
            setEmail(e.target.value);
        }else if(e.target.id==="signin-password"){
            setPassword(e.target.value);
        }else{
            if(e.target.value===password){
                console.log("註冊成功");
            }else{
                console.log("註冊失敗");
            }
        }

    }
    const signin = (e) =>{
        if(e.target.id==="signin-email"){
            setEmail(e.target.value);
        }else{
            setPassword(e.target.value);
        }

    }

    const submit = (e) =>{
        e.preventDefault();
        if(e.target.innerText==="註冊會員"){
            console.log(e.target.innerText);
            console.log(email,password)
            createAccount(email,password);
        }else{
            getSignin(email,password)
            console.log("登入會員");
            console.log(e.target.innerText);
        }

    }


    const changeForm = (e) =>{
        if (e.target.innerText==="已經是會員? 點我登入"){
            setSignupCSS("signup signup-hide");
            setSigninCSS("signin");
        }else{
            setSignupCSS("signup");
            setSigninCSS("signin signin-hide");
        }
        
    }

   
    return(
        <main className="signin-main">
            <form className={signupCSS}>
                <div className="signin-logo-container">
                    <img src={logo}></img>
                </div>
                <p className="signup-title">加入咖啡圈圈 開始資訊交流</p>
                <label for="signup-username">
                    <p>使用者名稱</p>
                    <input type="text" id="signup-username" required onChange={fillupForm}></input>
                </label>
                <label for="signup-email">
                    <p>註冊信箱</p>
                    <input type="email" id="signup-email" required onChange={fillupForm}></input>
                </label>
                <label for="signup-password">
                    <p>註冊密碼</p>
                    <input type="password" id="signup-password" className="psw1" required onChange={fillupForm}></input>
                </label>
                <label for="signup-checkpsw">
                    <p>再次確認</p>
                    <input type="password" id="signup-checkpsw" className="psw2" required onChange={fillupForm}></input>
                </label>
                <button type="submit" className="signup-btn" onClick={submit}>註冊會員</button>
                <div className="signup-change" onClick={changeForm}>已經是會員? 點我登入</div>
            </form>
            
            <form className={signinCSS}>
                <div className="signin-logo-container">
                    <img src={logo}></img>
                </div>
                <p className="signin-title">加入咖啡圈圈 開始資訊交流</p>
                <label for="signin-email">
                    <p>輸入信箱</p>
                    <input type="email" id="signin-email" required onChange={signin}></input>
                </label>
                <label for="signin-password">
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