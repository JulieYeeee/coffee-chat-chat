import styled from "styled-components";
import {Link} from "react-router-dom";


export const InboxBox=styled.div`
    width: 1200px;
    display: flex;
    margin: 50px 0; 
    background: ${({theme})=>theme.bgColor.mainBGColor};
    border-radius: 20px;
    box-shadow:-3px -5px 8px rgb(255, 255, 255),
    inset 10px 8px 8px -15px rgba(255, 255, 255, 0.764); 
    -webkit-filter: drop-shadow(1px 3px 3px rgba(145, 145, 145, 0.3));
    filter: drop-shadow(1px 3px 3px rgba(135, 135, 135, 0.3));
    border-style: none;

    @media (max-width:1199px){
        width: 90%;
    }

    @media (max-width: 500px){
        width: 90%;
        display: flex;
        margin: 50px 0;
        border-radius: 20px;
        position: relative;
        overflow: hidden;
    }


`

export const InboxLeft=styled.div`

    width: 30%;
    border-radius: 20px 0 0 20px;
    position: relative;
    @media (max-width: 500px){
        position: absolute;
        left: ${({closeCheck})=>closeCheck? "0":"-50%"};
        /* left: -50%; */
        width: 50%;
        height: 100%;
        background: ${({theme})=>theme.bgColor.mainBGColor};
        z-index: 10;
        border-radius: 20px 0 0 20px;
        border-right: 1px solid white;
        transition: 0.5s;
    }

`

export const InboxLeftController=styled.div`
    position: absolute;
    padding: 10px 0;
    right: 0px;
    top: 50%;
    transform: translateX(100%) ${({closeCheck})=>closeCheck? "rotate(180deg)":"rotate(0deg)"};;
    background: ${({theme})=>theme.bgColor.mainBGColor};
    display: none;

    @media (max-width: 500px){       
        display: block;
    }

`

export const InboxLeftTitle=styled.div`
    font-size: 3vmin;
    font-weight: 700;
    text-align: center;
    padding: 5px;


`

export const InboxLeftList=styled.div`

    height: 75vh;
    overflow:auto;
    box-shadow:
    inset 0px 10px 10px -15px rgba(135, 135, 135, 0.764);
    display: flex;
    flex-direction: column;
    

`

export const SingleMsg=styled(Link)`
                    
   
    .msgUnread{
        font-weight: 700;
    }
    .msgSelect{
        background: #f6d393;
        border-left: 4px solid ${({theme})=>theme.bgColor.yellowBGColor};

    }

`

export const SingleMsgP=styled.p`
    padding: 30px 10px;
    background: ${({theme})=>theme.bgColor.mainBGColor};
    -webkit-filter: drop-shadow(1px 3px 3px rgba(145, 145, 145, 0.51));
    filter: drop-shadow(1px 3px 3px rgba(135, 135, 135, 0.508));
    background: ${({className})=>className && "#f6d393"};


`

export const DefaultMsg=styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    img{
        width: 40%;
        aspect-ratio: 1/1;
        opacity:0.5;
    }
    p{
        font-size: 2.5vmin;
        font-weight: 700;
        color: rgba(60, 59, 59, 0.6);
    }

`

export const InboxRight=styled.div`

    width: 70%;
    border-radius: 0 20px 20px 0;
    @media (max-width: 500px){
        width: 100%;
    }

`

export const InboxRightTitle=styled(InboxLeftTitle)``



export const InboxRightContent=styled.div`
    width: 100%;
    height: 70vh;
    background: ${({theme})=>theme.bgColor.mainBGColor};
    overflow: auto;
    box-shadow:
    inset 10px 10px 10px -15px rgba(135, 135, 135, 0.764);


`


export const DefaultContent=styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    justify-content: center;
    img{
        width: 15%;
        aspect-ratio: 1/1;
        opacity:0.5;
    }
    p{
        font-size: 2.5vmin;
        font-weight: 700;
        color: rgba(60, 59, 59, 0.6);
    }



`

export const ReceiveMsgBox=styled.div`
    display: flex;
    padding: 5px;

`

export const ReceiveMsg=styled.div`

        font-size: 2vmin;
        background: rgba(255, 255, 255, 0.9);
        padding: 10px;
        border-radius: 10px 10px 10px 0;
        max-width: 70%;
        word-break: break-all;


`

export const ReceiveMsgBlank=styled.div`
    flex-grow: 1;
`

export const SendMsgBox=styled(ReceiveMsgBox)``

export const SendMsg=styled(ReceiveMsg)`
    background: ${({theme})=>theme.decoColor.decoYellow};
    border-radius: 10px 10px 0 10px;

`

export const SendMsgBlank=styled(ReceiveMsgBlank)``


export const ReplyBox=styled.div`
    width: 100%;
    font-size: 2vmin;
    display: flex;
    align-items: center;
    justify-content: center;
    textarea{
        margin: 10px 0 ;
        width: 80%;
        padding: 10px;
        resize: none;
        border-radius: 20px 0 0 20px;
        border-style: none;
        &:focus{
            outline: none;
        }
        
    }
    
    button{
        width: 15%;
        padding: 10px;
        border-radius: 0 20px 20px 0;
        border-style: none;
        background: ${({theme})=>theme.decoColor.opacityWhite};
        color: ${({theme})=>theme.fontColor.lightBGfont};
        cursor: pointer;
    }

`