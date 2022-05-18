import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const createAccount = (email,password,setAccount,account,username) =>{
  console.log("3",account,username,email,password);
    
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setAccount(user.uid);
        console.log("4",account,username,email,password);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });

}

export default createAccount;
