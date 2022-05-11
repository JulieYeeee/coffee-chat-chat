import React ,{useEffect} from "react";
import getStatus from "../src/CheckAuth"

const Memberlist = () =>{
    useEffect(getStatus);
    return(
        <main>
            Hi
        </main>
    )
}

export default Memberlist;