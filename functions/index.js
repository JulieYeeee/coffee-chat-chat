const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors')({origin: true});
var fetch = require('node-fetch');
const app = express();
// app.use(cors({ origin: true }));
const admin = require('firebase-admin');
admin.initializeApp();
// const axios = require('axios');




// exports.axiosone = functions.https.onRequest((req, res) => {
//     cors(req, res, () => {
//     //   if (req.method !== "GET") {
//     //     return res.status(401).json({
//     //       message: "Not allowed"
//     //     });
//     //   }
  
//       return axios.get('https://opendata.cwb.gov.tw/api//v1/rest/datastore/F-C0032-001?Authorization=CWB-42E74828-0F3E-4A91-8B07-3F956E27BC37')
//         .then(response => {
//           console.log(response.data);
//           return res.status(200).json({
//             message: response.data
//           })
//         })
//         .catch(err => {
//           return res.status(500).json({
//             error: err
//           })
//         })
  
//     })
//   });
// axios
//   .post('https://opendata.cwb.gov.tw/api//v1/rest/datastore/F-C0032-001?Authorization=CWB-42E74828-0F3E-4A91-8B07-3F956E27BC37')
//   .then(res => {
//     console.log(`statusCode: ${res.status}`);
//     console.log(res);
//   })
//   .catch(error => {
//     console.error(error);
//   });

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
                return res.data
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

exports.getPay = functions.https.onRequest((req, res) => {
    let prime = req.body.primenum;
    cors(req, res, () => {
        fetch("https://sandbox.tappaysdk.com/tpc/payment/pay-by-prime", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "x-api-key": "partner_RxqtAj9N3juu6kDlJU87Nzpqlizth6moQIsozJgrUwe9bVLHf43tPvTR",
            },
            body: JSON.stringify({
                "prime": prime,
                "partner_key": "partner_RxqtAj9N3juu6kDlJU87Nzpqlizth6moQIsozJgrUwe9bVLHf43tPvTR",
                "merchant_id": "oopsyeh056_CTBC",
                "details": "TapPay Test",
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
        }).then(response => {
            let result = response.json();
            if (response.ok) {
                result.then(data => {
                    res.send(data);
                    return res.data
                })
            } else {
                result.then(msg => {
                    res.send(msg);
                })
            }
        }).catch(error => {
            res.send(error);
        })
    })
})
