import React,{createContext,useState,useContext,useRef} from "react";

const GlobalContext = createContext();

export const GetGlobalContext = () => {
    return useContext(GlobalContext);
}

export const GlobalContextProvider = ({children}) => {

    let [ account, setAccount ] = useState (false);
    let [ username, setUsername ] = useState(null);
    let [ orderNum, setOrderNum ] = useState("");
    let [unreadCount,setunreadCount] = useState();
    let askUnreadRef = useRef();
    let replyUnreadRef = useRef();
    let [notificationCSS,setnotificationCSS] = useState(null);

    return <GlobalContext.Provider value = {{account,setAccount,username,setUsername,orderNum, setOrderNum,unreadCount,setunreadCount,askUnreadRef,replyUnreadRef,notificationCSS,setnotificationCSS}}>
            {children}
            </GlobalContext.Provider>

}



export default GlobalContext;