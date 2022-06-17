import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//圖片
import ask from "../static/picture/ask.png";
import info from "../static/picture/info.png";
//Firebase modules
import firebase from "../src/Firebase";
import { getFirestore,doc,getDoc,updateDoc } from "firebase/firestore";
import { getDatabase,ref,set    } from "firebase/database";
//useContext
import { GetGlobalContext } from "../component/context/GlobalContext";
//styled-component
import { AskForm,AskConsultantBox,Bar,QuestionBox,Notification, SingleQuestion,PaymentBox,PaymentInputBox, InputLabel,InputTitle,Input,TestNumCopy} from "../component/style/Ask.styled";
import { Button } from "../component/style/Button.styled";

const Ask = () => {
    //useContext取得共用state
    const {
        account,
        username,
        orderNum
    } = GetGlobalContext();
    //儲存使用者輸入的提問資訊
    let [consultantName, setConsultant] = useState(null);
    let [headshot, setHeadshot] = useState(null);
    let [userInfo, setUserInfo] = useState(null);
    let [question, setQuestion] = useState(null);
    let [consultantAccount, setConsultantAccount] = useState(null);

    //取得上一階段的預先訂單資訊
    useEffect(() => {
        const setInitialOrder = async () => {
            const db = getFirestore(firebase);
            const docRef = doc(db, `pre-order`, orderNum);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                let orderData = docSnap.data();
                setConsultant(orderData["consultantName"]);
                setHeadshot(orderData["headshot"]);
                setConsultantAccount(orderData["consultantAccount"]);
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }
        setInitialOrder();
    }, [])

    
  
    //串接Tappay資料
    let tapStatusss = true;
    useEffect(() => {
        if (tapStatusss === true) {
            tapStatusss = false;
            const appKey = "app_xyfjgLvgneQFUa5boIt6pIBxdg6OgsenEvmxIK7Q3gKVFVBRjd8nyQ4Qtxqi";
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
                        'color': 'gray',
                        'font-size': '24px',
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
    }, [])
    
    //動態確認使用者輸入付款資料是否正確
    TPDirect.card.onUpdate(function(update) {
        if (update.canGetPrime) {
            checkPrime();
        } else {
            return
        }
    })
    const checkPrime = () => {
        const tappayStatus = TPDirect.card.getTappayFieldsStatus();
        // Check TapPay Fields Status is can get prime
        if (tappayStatus.canGetPrime === false) {
            alert("付款出現錯誤");
            return
        }
    }
    
    //提問及付款資料送出
    function submitPay(e) {
        e.preventDefault();
        TPDirect.card.getPrime(function(result) {
            if (result.status !== 0) {
                return 
            }
            let prime = result.card.prime;
            // fetch("https://us-central1-coffee-chat-together.cloudfunctions.net/testRandom",{
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
                //付款成功，更新訂單狀態
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


    //更新訂單資料，並且導至感謝頁面
    const navigate = useNavigate();
    const updateOrder = async () => {
    	const db = getFirestore(firebase);
    	await updateDoc(doc(db, "pre-order", orderNum), {
    		askInfo: userInfo,
    		askName: username,
    		askQuestion: question,
    		payment: true
    	})
    	const database = getDatabase(firebase);
    	set(ref(database, 'order/' + orderNum), {
    		orderNum: orderNum,
    		payment: true,
    		askAccount: account,
    		askName: username,
    		askInfo: userInfo,
    		askQuestion: question,
    		consultantAccount: consultantAccount,
    		consultantName: consultantName
    	});
    	navigate("/thankyou");
    }


    //複製測試號碼
    const copyNum = (e) => {
    	let content = e.target.parentElement.children[0];
    	content.select();
    	document.execCommand('copy', false, content.select());
    }


    return (
        <main>
            <AskForm>
                <AskConsultantBox>
                    <img  src={headshot}></img>
                    <div >Hi, 我是 {consultantName} <br/>很高興與你分享我的經驗!</div>
                </AskConsultantBox>
                <Bar></Bar>
                <QuestionBox>
                    <Notification>提問前可以提供您認為有助分享者回覆您問題的相關個人資訊。讓 {consultantName} 能更準確地回覆您的提問。</Notification>
                    <SingleQuestion>
                        <div>
                            <img className="ask-icon" src={info}></img>
                            <p>你的資訊：</p>
                        </div>
                        <textarea className="ask-information" rows="10" onChange={(e)=>{setUserInfo(e.target.value)}}></textarea>
                    </SingleQuestion>
                    <SingleQuestion>
                        <div>
                            <img className="ask-icon" src={ask}></img>
                            <p>你的提問：</p>
                        </div>
                        <textarea className="ask-question" rows="10" onChange={(e)=>{setQuestion(e.target.value)}}></textarea>
                    </SingleQuestion>
                </QuestionBox>
                <Bar></Bar>
                <PaymentBox>
                    <Notification>Buy me a coffee!<br/>填寫付款資訊，您將請 {consultantName} 喝一杯 95 元咖啡。</Notification>
                    <PaymentInputBox>
                        <InputLabel>
                            <InputTitle>信用卡號</InputTitle>
                            <Input className="tpfield" id="card-number"></Input>
                        </InputLabel>
                        <TestNumCopy>
                            測試卡號<textarea rows="1" readOnly value={"4242424242424242"}></textarea><div onClick={copyNum}>Copy</div>
                        </TestNumCopy>

                        <InputLabel>
                            <InputTitle>有效日期</InputTitle>
                            <Input className="tpfield" id="card-expiration-date" ></Input>
                        </InputLabel>
                        <TestNumCopy>
                            測試日期<textarea rows="1" readOnly value={"0123"}></textarea><div onClick={copyNum}>Copy</div>
                        </TestNumCopy>

                        <InputLabel>
                            <InputTitle>安全碼</InputTitle>
                            <Input className="tpfield" id="card-ccv"></Input>
                        </InputLabel>
                        <TestNumCopy>
                            測試安全碼<textarea rows="1" readOnly value={"123"}></textarea><div onClick={copyNum}>Copy</div>
                        </TestNumCopy>
                    </PaymentInputBox>
            
                </PaymentBox>
                <Button type="submit" onClick={submitPay}>提交諮詢</Button>
            </AskForm>
        </main>

    )
}

export default Ask;