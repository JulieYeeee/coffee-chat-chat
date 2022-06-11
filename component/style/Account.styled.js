import styled from "styled-components";
import { Button } from "./Button.styled";



export const AccountForm=styled.form`
    padding: 50px 0;
    width: 1200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 80px;
    margin: 50px 0;
    color: ${({theme})=>theme.fontColor.lightBGfont};



`

export const AccountBasic=styled.div`

    width: 80%;
    display: flex;
    align-items: center;
    padding:30px 0;
    background: ${({theme})=>theme.decoColor.opacityWhite};
    margin: 15px 0 ;
    border-radius: 20px;
    -webkit-filter: drop-shadow(1px 1px 1px rgba(193, 193, 193, 0.53));
    filter: drop-shadow(1px 1px 1px rgba(193, 193, 193, 0.53));
    

`

export const Headshot=styled.div`

    width: 30%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;


`

export const Headshotimg=styled.img`
    width: 90%;
    aspect-ratio: 1/1;
    object-fit: cover;
    border-radius: 50%;
    border: 10px solid ${({theme})=>theme.bgColor.yellowBGColor};
    -webkit-filter: drop-shadow(1px 3px 3px #b0822e5f);
    filter: drop-shadow(1px 3px 3px #cba25575);


`

export const HeadshotLabel=styled.label`

    position: absolute;
    right: 10%;
    top: 10%;
    transform: translateY(-50%) translateX(-50%);
    border: 4px solid ${({theme})=>theme.fontColor.yellowBGfont};
    border-radius: 50%;
    width: 15%;
    aspect-ratio: 1/1;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${({theme})=>theme.bgColor.yellowBGColor};
    cursor: pointer;
    p{
        font-weight: 700;
        color: ${({theme})=>theme.fontColor.yellowBGfont};
        font-size: 3vmin;
    }
    input{
        display: none;
    }
`

export const BasicInfoBox=styled.div`
    padding: 10px;
    display: flex;
    flex-direction: column;
    width:70%;
    label{
        padding:5px;
        font-weight: 700;
        input{
            width: 100%;
            padding: 10px;
            color: ${({theme})=>theme.fontColor.lightBGfont};
            font-size: 2.5vmin;
            font-weight: 700;
            margin:5px 0;
            border-style: none;
            background: ${({theme})=>theme.decoColor.opacityWhite};
            border-radius: 20px;
            -webkit-filter: drop-shadow(1px 1px 1px rgba(193, 193, 193, 0.53));
            filter: drop-shadow(1px 1px 1px rgba(193, 193, 193, 0.53));
        }
        input:focus{
            border: 1px solid ${({theme})=>theme.bgColor.yellowBGColor};
            outline: none;
        }
    }



`

export const AccountLinkBox=styled.div`
    width: 80%;
    padding:30px 0;
    background: ${({theme})=>theme.decoColor.opacityWhite};
    margin: 15px 0 ;
    border-radius: 20px;
    -webkit-filter: drop-shadow(1px 1px 1px rgba(193, 193, 193, 0.53));
    filter: drop-shadow(1px 1px 1px rgba(193, 193, 193, 0.53));



`

export const SingleLink=styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
        img{
            width: 50px;
            height: 50px;
            margin-right: 10px;
            -webkit-filter: drop-shadow(1px 1px 1px rgba(193, 193, 193, 0.53));
            filter: drop-shadow(1px 1px 1px rgba(193, 193, 193, 0.53));
        }
        input{
            width: 100%;
            padding: 10px;
            color: ${({theme})=>theme.fontColor.lightBGfont};
            font-size: 2.5vmin;
            font-weight: 700;
            margin:5px 0;
            border-style: none;
            background: ${({theme})=>theme.decoColor.opacityWhite};
            border-radius: 20px;
            -webkit-filter: drop-shadow(1px 1px 1px rgba(193, 193, 193, 0.53));
            filter: drop-shadow(1px 1px 1px rgba(193, 193, 193, 0.53));
        }
        input:focus{
            border: 1px solid ${({theme})=>theme.bgColor.yellowBGColor};
            outline: none;
        }     

`


export const AccountIntroBox=styled.div`
    width: 80%;
    padding:30px 10px;
    background: ${({theme})=>theme.decoColor.opacityWhite};
    margin: 15px 0 ;
    border-radius: 20px;
    color: ${({theme})=>theme.fontColor.lightBGfont};
    font-size: 2.5vmin;
    font-weight: 700;
    -webkit-filter: drop-shadow(1px 1px 1px rgba(193, 193, 193, 0.53));
    filter: drop-shadow(1px 1px 1px rgba(193, 193, 193, 0.53));
    textarea{
               width: 100%;
               aspect-ratio: 4/1;
               resize:none;
               padding:10px;
               color: ${({theme})=>theme.fontColor.lightBGfont};
               font-size: 2.5vmin;
               font-weight: 700;
               margin:5px 0;
               border-style: none;
               background: ${({theme})=>theme.decoColor.opacityWhite};
               border-radius: 20px;
               -webkit-filter: drop-shadow(1px 1px 1px rgba(193, 193, 193, 0.53));
                filter: drop-shadow(1px 1px 1px rgba(193, 193, 193, 0.53));
           }
           textarea:focus{
            border: 1px solid ${({theme})=>theme.bgColor.yellowBGColor};
            outline: none;
        }

`

export const AccountKeywordBox=styled.div`
    width: 80%;
    color: ${({theme})=>theme.fontColor.lightBGfont};
    font-size: 2.5vmin;
    font-weight: 700;
    padding:30px 10px;
    background: ${({theme})=>theme.decoColor.opacityWhite};
    margin: 15px 0 ;
    border-radius: 20px;
    -webkit-filter: drop-shadow(1px 1px 1px rgba(193, 193, 193, 0.53));
    filter: drop-shadow(1px 1px 1px rgba(193, 193, 193, 0.53));


`


export const KeywordInsideBox=styled.div`
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    align-items: center;
    color: ${({theme})=>theme.fontColor.lightBGfont};
    font-size: 2.5vmin;
    font-weight: 700;
    margin:5px 0;
    border-style: none;
    background: ${({theme})=>theme.decoColor.opacityWhite};
    border-radius: 20px;
    -webkit-filter: drop-shadow(1px 1px 1px rgba(193, 193, 193, 0.53));
    filter: drop-shadow(1px 1px 1px rgba(193, 193, 193, 0.53));

    input{
        width:30%;
        padding: 10px;
        background:rgba(255, 255, 255, 0);
        border-style: none;
        /* color: var(--standardGrey); */
        font-size: 2.5vmin;
        font-weight: 700;
    }
    input:focus{
        outline: none;
    }

`

export const Keyword=styled.span`
    background: ${({theme})=>theme.bgColor.yellowBGColor};
    box-shadow:inset 10px 15px 15px -15px #f59580; 
    color:${({theme})=>theme.fontColor.yellowBGfont};
    border-radius: 20px;
    margin-right: 5px;
    margin: 3px 5px 3px 0;
    padding: 5px;
    display: flex;
    align-items: center;
    width: fit-content;
    white-space:nowrap;

        div{
            background: #fcd284;
            color:${({theme})=>theme.fontColor.yellowBGfont};
            font-size: small;
            width: 20px;
            aspect-ratio: 1/1;
            padding:2px;
            margin-left:4px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
        }


`


export const AccountShareThemeBox=styled.div`

    width: 80%;
    color:${({theme})=>theme.fontColor.lightBGfont};
    font-size: 2.5vmin;
    font-weight: 700;
    padding:30px 10px;
    background: ${({theme})=>theme.decoColor.opacityWhite};
    margin: 15px 0 ;
    border-radius: 20px;
    -webkit-filter: drop-shadow(1px 1px 1px rgba(193, 193, 193, 0.53));
    filter: drop-shadow(1px 1px 1px rgba(193, 193, 193, 0.53));



`

export const ShareThemeInsideBox=styled.div`

    display: flex;
    justify-content: space-between;
    margin: 5px 0;



`

export const SingleTheme=styled.div`
    width: 32%;
    background: ${({theme})=>theme.decoColor.opacityWhite};
    -webkit-filter: drop-shadow(1px 1px 1px rgba(193, 193, 193, 0.53));
    filter: drop-shadow(1px 1px 1px rgba(193, 193, 193, 0.53));
    padding: 20px 10px;
    border-radius: 20px;

    .share-title-box{
            width: 100%;
            display: flex;
            p{
                background: ${({theme})=>theme.bgColor.yellowBGColor};
                color: ${({theme})=>theme.fontColor.yellowBGfont};
                padding:10px;
                border-radius: 20px 0 0 20px;
                font-size: 2.5vmin;
                font-weight: 700;
            }
            input{
                width: 100%;
                padding:10px;
                border-style: none;
                border-radius: 0px 20px 20px 0px;
                color: ${({theme})=>theme.fontColor.lightBGfont};
                font-size: 2.5vmin;
                font-weight: 700;
            }
            input:focus{
                border: 1px solid ${({theme})=>theme.bgColor.yellowBGColor};
                outline: none;
            }

        }
        textarea{
            width: 100%;
            aspect-ratio: 2/1;
            padding:10px;
            resize: none;
            margin: 10px 0 0 0;
            border-style: none;
            color: ${({theme})=>theme.fontColor.lightBGfont};
            font-size: 2.5vmin;
            font-weight: 700;
        }
        textarea:focus{
            border: 1px solid ${({theme})=>theme.bgColor.yellowBGColor};
            outline: none;
        }
    



`

export const AccountProjectBox=styled.div`
    width: 80%;
    color:${({theme})=>theme.fontColor.lightBGfont};
    font-size: 2.5vmin;
    font-weight: 700;
    padding:30px 10px;
    background: ${({theme})=>theme.decoColor.opacityWhite};
    margin: 15px 0 ;
    border-radius: 20px;
    -webkit-filter: drop-shadow(1px 1px 1px rgba(193, 193, 193, 0.53));
    filter: drop-shadow(1px 1px 1px rgba(193, 193, 193, 0.53));


`

export const SingleProject=styled.div`
    width: 100%;
    align-items: center;
    margin: 20px 0;
    background: ${({theme})=>theme.decoColor.opacityWhite};
    -webkit-filter: drop-shadow(1px 1px 1px rgba(193, 193, 193, 0.53));
    filter: drop-shadow(1px 1px 1px rgba(193, 193, 193, 0.53)); 
    padding: 20px 10px;
    border-radius: 20px;


`


export const ProjectCover=styled.div`
    width: 40%;
    background: ${({theme})=>theme.fontColor.yellowBGfont};
    aspect-ratio: 3/2;
    position: relative;
    div{
        width: 100%;
        background: ${({theme})=>theme.fontColor.yellowBGfont};
        aspect-ratio: 3/2;
        position: relative;
        overflow: hidden;

    }
    label{
        position: absolute;
        top: -5px;
        left: -5px;
        cursor: pointer;
        border-radius: 50%;
        width: 15%;
        aspect-ratio: 1/1;
        display: flex;
        justify-content: center;
        align-items: center;
        background: ${({theme})=>theme.bgColor.yellowBGColor};
        p{
            color: var(--standardWhite);
        }
        input{
            display: none;

        }
    }
    


`

export const LayoutBox=styled.div`
    display: flex;
    width: 100%;

`


export const ReaclCover=styled.img`
        width: 100%;
        height: 100%;
        background: ${({theme})=>theme.fontColor.yellowBGfont};
        object-fit: cover;


`



export const DefaultCover=styled.img`
        width: 30%;
        aspect-ratio: 3/2;
        background: ${({theme})=>theme.fontColor.yellowBGfont};
        object-fit: cover;
        position: absolute;
        left: 50%;
        top:50%;
        transform: translateX(-50%) translateY(-50%);
        opacity: 0.5;


`

export const ProjectContent=styled.div`
    display: flex;
    flex-direction: column;
    width: 60%;
    padding:0 0 0 10px;

    select{
        padding: 10px;
        width: 100%;
        border-style: none;
        color: ${({theme})=>theme.fontColor.lightBGfont};
        font-size: 2.5vmin;
        font-weight: 700;
    }
    select:focus{
        border: 1px solid ${({theme})=>theme.bgColor.yellowBGColor};
        outline: none;
    }
    textarea{
        padding:10px;
        margin: 10px 0;
        resize: none;
        height: 100%;
        border-style: none;
        color: ${({theme})=>theme.fontColor.lightBGfont};
        font-size: 2.5vmin;
        font-weight: 700;
    }
    textarea:focus{
        border: 1px solid ${({theme})=>theme.bgColor.yellowBGColor};
        outline: none;
    }

`

export const ProjectLink=styled.input`
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border-style: none;
    color: ${({theme})=>theme.fontColor.lightBGfont};
    font-size: 2.5vmin;
    font-weight: 700;
    &:focus{
        border: 1px solid  ${({theme})=>theme.bgColor.yellowBGColor};
        outline: none;
    }



`

export const AccountButton=styled(Button)`
    width: fit-content;
    padding: 10px;


`