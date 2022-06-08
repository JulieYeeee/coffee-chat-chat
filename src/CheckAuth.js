import {  getAuth, onAuthStateChanged } from "firebase/auth";


const checkAuth = () =>{
    let auth = getAuth();
    onAuthStateChanged( auth, (user) => {
        if (user) {
            console.log("IN:" ,user.uid);
            // authSatus = user.uid;
            authResult=user.uid;
        } else {
            authSatus=null;
            console.log("IN:" ,user.uid);
            return "LELE";
        }
    });
}
    


export default checkAuth;