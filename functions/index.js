const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
var fetch = require('node-fetch');
const app = express();
// app.use(cors({ origin: true }));
const admin = require('firebase-admin');
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
// const functions = require('firebase-functions');

// The Firebase Admin SDK to access Firestore.

// app.get('/try', (req, res) => {
//     res.end("Received GET request!");  
//   });

//   app.post('/try', (req, res) => {
//     res.end("Received POST request!");  
//   });

// exports.widgets = functions.https.onRequest(app);



exports.sight=functions.https.onRequest((req, res) =>{
    fetch("https://opendata.cwb.gov.tw/api//v1/rest/datastore/F-C0032-001?Authorization=CWB-42E74828-0F3E-4A91-8B07-3F956E27BC37")
    .then(response=>{
        let result=response.json();
        if(response.ok){
            result.then(data=>{
                res.send(data);
            })
        }else{
            result.then(msg=>{
                res.send(msg);
            })
        }
    })
    .catch(error=>{
        res.send(error);
    })

})

exports.test = functions.https.onRequest(async (req, res) => {
    // Grab the text parameter.
    const original = req.query.text;
    // res.json({result: `Message with ID: ${writeResult.id} added.`});
    res.send("hello");
  });

//   exports.pay2=functions.https.onRequest((req,res)=>{
   
//     fetch("https://sandbox.tappaysdk.com/tpc/payment/pay-by-prime",{
//             // fetch("https://cors-anywhere.herokuapp.com/https://sandbox.tappaysdk.com/tpc/payment/pay-by-prime",{
//                 method: 'POST',
//                 headers:{
//                     "Content-Type": "application/json",
//                     "x-api-key": "partner_RxqtAj9N3juu6kDlJU87Nzpqlizth6moQIsozJgrUwe9bVLHf43tPvTR",
                
//                 },
//                 body:JSON.stringify({
//                     "prime": "da9eb1adb81deae00b6f7b1fc5efc3673adc967c09692db05509efc2d39ee8ff",
//                     "partner_key": "partner_RxqtAj9N3juu6kDlJU87Nzpqlizth6moQIsozJgrUwe9bVLHf43tPvTR",
//                     "merchant_id": "oopsyeh056_CTBC",
//                     "details":"TapPay Test",
//                     "amount": 95,
//                     "cardholder": {
//                         "phone_number": "+886923456789",
//                         "name": "coffeechat",
//                         "email": "coffeechat@gmail.com",
//                         "zip_code": "",
//                         "address": "",
//                         "national_id": ""
//                     }
//                 })
//             })
//             .then(response=>{
//                 let result=response.json();
//                 //付款成功，更新訂單狀態
//                 if(response.ok){
//                     result.then(data=>{
//                         console.log("ask",data.json());
//                         res.send("ask"+data.json())
//                     })
//                 }
//             })
//             .catch(error=>{
//                 console.log("Pay bill failed",error);
//             })

//   })

