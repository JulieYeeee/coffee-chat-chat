import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const getSignin = (email,password) =>{
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        console.log("登入資訊:",user);
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    });
}

export default getSignin;