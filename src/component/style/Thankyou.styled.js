import styled from "styled-components";

export const ThankyouBox=styled.div`
    display: flex;
    width: fit-content;
    align-items: center;
    margin-top: 100px;
    img{
        width: 150px;
        opacity: 0.5;

    }


`

export const ThankyouRight=styled.div`
    font-size: 3.5vmin;
    font-weight: 700;
    color: ${({theme})=>theme.fontColor.lightBGfont};


`

export const ButtonBox=styled.div`
    font-size: 3vmin;
    padding: 10px 0;
    a{
        margin-right: 10px;
        background: #F2F2F0;
        color: rgb(60,59,59);
        padding: 5px 10px;
        border-radius: 20px;
        box-shadow:-5px -5px 10px rgb(255, 255, 255),
        inset 10px 8px 8px -15px rgba(255, 255, 255, 0.764); 
        -webkit-filter: drop-shadow(1px 3px 3px rgba(145, 145, 145, 0.3));
        filter: drop-shadow(1px 3px 3px rgba(135, 135, 135, 0.3));
    }
    a:hover{
        box-shadow:-3px -5px 8px rgb(255, 255, 255),
        inset 10px 10px 10px -15px rgba(135, 135, 135, 0.764); 
    }
    

`