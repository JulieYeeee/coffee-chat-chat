import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ask from "../static/picture/ask.png";
import info from "../static/picture/info.png";

import firebase from "../src/Firebase";
import { getFirestore,doc,setDoc,getDoc,collection,updateDoc, query, where, getDocs } from "firebase/firestore";
import { getDatabase,get,ref,orderByChild,equalTo,set    } from "firebase/database";

import { GetGlobalContext } from "../component/context/GlobalContext";

const Ask = () =>{
    const {account,setAccount,username,setUsername,orderNum}=GetGlobalContext();

    let [ consultantName,setConsultant ]=useState(null);
    let [ headshot,setHeadshot]=useState(null);
    let [ userInfo,setUserInfo]=useState(null);
    let [ question,setQuestion]=useState(null);
    let [ consultantAccount,setConsultantAccount]=useState(null);

    //取得訂單資訊
    useEffect(()=>{
        setInitialOrder();
    },[])

    const setInitialOrder =async()=>{
        const db = getFirestore(firebase);
        const docRef = doc(db, `pre-order`, orderNum);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            let orderData=docSnap.data();
            setConsultant(orderData["consultantName"]);
            setHeadshot(orderData["headshot"]);
            setConsultantAccount(orderData["consultantAccount"]);
        } else {
        // doc.data() will be undefined in this case
            console.log("No such document!");
        }
        
    }
  

    let tapStatusss=true;
    useEffect(()=>{
        if(tapStatusss===true){
            tapStatusss=false;
            const appKey ="app_xyfjgLvgneQFUa5boIt6pIBxdg6OgsenEvmxIK7Q3gKVFVBRjd8nyQ4Qtxqi";
            const appId = 123999;
            TPDirect.setupSDK(appId, appKey, 'sandbox');
        
            const fields = {
                number: {
                    element: '#card-number',
                    placeholder: '**** **** **** ****',
                },
                expirationDate: {
                    element: '#card-expiration-date',
                    placeholder: 'MM / YY'

                },
                ccv: {
                    element: '#card-ccv',
                    placeholder: 'ccv'
                }
            }
        
            TPDirect.card.setup({
                fields: fields,
                styles: {
                    // Style all elements
                    'input': {
                        'color': 'gray'
                    },
                    // Styling ccv field
                    'input.ccv': {
                        // 'font-size': '16px'
                    },
                    // Styling expiration-date field
                    'input.expiration-date': {
                        // 'font-size': '16px'
                    },
                    // Styling card-number field
                    'input.card-number': {
                        // 'font-size': '16px'
                    },
                    // style focus state
                    ':focus': {
                        // 'color': 'black'
                    },
                    // style valid state
                    '.valid': {
                        'color': 'green'
                    },
                    // style invalid state
                    '.invalid': {
                        'color': 'red'
                    },
                    // Media queries
                    // Note that these apply to the iframe, not the root window.
                    '@media screen and (max-width: 400px)': {
                        'input': {
                            'color': 'orange'
                        }
                    }
                }
            })
            }
        
    },[])
    
   TPDirect.card.onUpdate(function (update) {
    if (update.canGetPrime) {
        checkPrime();
    } else {
        // console.log("2",update.canGetPrime);
        // Disable submit Button to get prime.
        // submitButton.setAttribute('disabled', true)
    }

    // number 欄位是錯誤的
    if (update.status.number === 2) {
        // setNumberFormGroupToError()
    } else if (update.status.number === 0) {
        // setNumberFormGroupToSuccess()
    } else {
        // setNumberFormGroupToNormal()
    }

    if (update.status.expiry === 2) {
        // setNumberFormGroupToError()
    } else if (update.status.expiry === 0) {
        // setNumberFormGroupToSuccess()
    } else {
        // setNumberFormGroupToNormal()
    }

    if (update.status.ccv === 2) {
        // setNumberFormGroupToError()
    } else if (update.status.ccv === 0) {
        // setNumberFormGroupToSuccess()
    } else {
        // setNumberFormGroupToNormal()
    }
    
})

    const checkPrime = () =>{
        const tappayStatus = TPDirect.card.getTappayFieldsStatus();
        // Check TapPay Fields Status is can get prime
        if (tappayStatus.canGetPrime === false) {
            alert('can not get prime');
            return
        }
    }
    

    function submitPay(e) {
        e.preventDefault();
        TPDirect.card.getPrime(function(result) {
            if (result.status !== 0) {
            // console.err('getPrime error')
            return 
            }
            let prime = result.card.prime;
            console.log('getPrime success: ' + prime);

            fetch("https://cors-anywhere.herokuapp.com/https://sandbox.tappaysdk.com/tpc/payment/pay-by-prime",{
                method: 'POST',
                headers:{
                    "Content-Type": "application/json",
                    "x-api-key": "partner_RxqtAj9N3juu6kDlJU87Nzpqlizth6moQIsozJgrUwe9bVLHf43tPvTR",
                },
                body:JSON.stringify({
                    "prime": prime,
                    "partner_key": "partner_RxqtAj9N3juu6kDlJU87Nzpqlizth6moQIsozJgrUwe9bVLHf43tPvTR",
                    "merchant_id": "oopsyeh056_CTBC",
                    "details":"TapPay Test",
                    "amount": 95,
                    "cardholder": {
                        "phone_number": "+886923456789",
                        "name": "coffeechat",
                        "email": "coffeechat@gmail.com",
                        "zip_code": "",
                        "address": "",
                        "national_id": ""
                    }
                })
            })
            .then(response=>{
                let res=response.json();
                if(response.ok){
                    res.then(data=>{
                        updateOrder();
                    })
                }
            })
            .catch(error=>{
                console.log("Pay bill failed",error);
            })
        })
    }



    const navigate=useNavigate();
    const updateOrder = async() =>{
        const db = getFirestore(firebase);
        
        await updateDoc(doc(db, "pre-order", orderNum), {
            askInfo: userInfo,
            askName:username,
            askQuestion: question,
            payment:true
        })
        const database = getDatabase(firebase);
        set(ref(database, 'order/' + orderNum), {
            orderNum:orderNum,
            payment: true,
            askAccount: account,
            askName:username,
            askInfo: userInfo,
            askQuestion: question,
            consultantAccount:consultantAccount,
            consultantName:consultantName
        });
        navigate("/thankyou");
    }




    return (
        <main className="ask-main">
            <form>
            <div className="ask-consultant-box">
                <img className="ask-headshot" src={headshot}></img>
                <div className="ask-welcome">Hi, 我是 {consultantName} <br/>很高興與你分享我的經驗!</div>
            </div>
            <div className="bar"></div>
            <div className="ask-consultation-box">
                <p className="ask-notification">提問前可以提供您認為有助分享者回覆您問題的相關個人資訊。讓 {consultantName} 能更準確地回覆您的提問。</p>
                <div className="ask-information-box">
                    <div>
                        <img className="ask-icon" src={info}></img>
                        <p>你的資訊：</p>
                    </div>
                    <textarea className="ask-information" rows="10" onChange={(e)=>{setUserInfo(e.target.value)}}></textarea>
                </div>
                <div className="ask-question-box">
                    <div>
                        <img className="ask-icon" src={ask}></img>
                        <p>你的提問：</p>
                    </div>
                    <textarea className="ask-question" rows="10" onChange={(e)=>{setQuestion(e.target.value)}}></textarea>
                </div>
            </div>
            <div className="bar"></div>
            <div className="ask-payment-box">
                <p className="ask-notification">Buy me a coffee!<br/>填寫付款資訊，您將請 {consultantName} 喝一杯 95 元咖啡。</p>
                <div className="ask-payment">
                <label>
                    <div className="item">信用卡號</div>
                    <div className="tpfield" id="card-number" ></div>
                </label>

                <label>
                    <div className="item">有效日期</div>
                    <div className="tpfield" id="card-expiration-date" ></div>
                </label>

                <label>
                    <div className="item">安全碼</div>
                    <div className="tpfield" id="card-ccv" ></div>
                </label>
                </div>
            </div>
            <button type="submit" onClick={submitPay}>提交諮詢</button>
            </form>
        </main>

    )
}

export default Ask;