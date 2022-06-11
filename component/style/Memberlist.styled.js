import styled from "styled-components";
import searchbanner from "../../static/picture/searchbanner.png";
import { Link } from "react-router-dom";


export const SearchBanner=styled.div`
        display: ${({closeCheck})=>closeCheck? "block":"none"};
        width: 100%;
        padding: 150px 0;
        background: url(${searchbanner}) ${({theme})=>theme.bgColor.mainBGColor};
        background-size: 20%;
        background-repeat: no-repeat;
        background-position: 80% ;
        -webkit-filter: drop-shadow(1px 3px 3px rgba(187, 187, 187, 0.51));
        filter: drop-shadow(1px 3px 3px rgba(174, 174, 174, 0.508));
        p{
            font-size: 5vmin;
            font-weight: 700;
            text-align: center;
        }
        @media screen and (max-width:1199px){
            background-size: 30%;
            background-position: right;
        }
        @media screen and (max-width:850px){
 
            padding: 130px 0;
            background-size: 40%;
    
        }
        @media screen and (max-width:550px){

            background-size: 40%;
        }

`






export const MemberlistBox=styled.div`
    display: ${({closeCheck})=>closeCheck? "flex":"none"};
    width: 1200px;
    flex-wrap: wrap;
    margin: 50px 0 ;
    @media screen and (max-width:1199px){
            width: 100%;
        
    }
    @media screen and (max-width: 550px){
    
        flex-direction: column;
        align-items: center;
        flex-wrap: nowrap;
        
    }

`


export const MemberCard=styled(Link)`
   
        width: 47%;
        margin:20px 1.5%;
        padding: 20px 10px;
        display: flex;
        justify-content: center;
        background: ${({theme})=>theme.bgColor.mainBGColor};
        border-radius: 20px;
        box-shadow:-3px -5px 8px rgb(255, 255, 255),
        inset 10px 8px 8px -15px rgba(255, 255, 255, 0.764); 
        -webkit-filter: drop-shadow(1px 3px 3px rgba(145, 145, 145, 0.3));
        filter: drop-shadow(1px 3px 3px rgba(135, 135, 135, 0.3));
        border-style: none;
        @media screen and (max-width:1199px){
            margin:20px 1.5%;
                
        }

        @media screen and (max-width:850px){
            width: 45%;
            margin:20px 2.5% 25px 2.5%;
            flex-direction: column;
            justify-content:flex-start;
            align-items: center;
        }
        @media screen and (max-width: 550px){
            width: 90%;
            display: flex;
            flex-direction: row;
            justify-content: center;
            
        }

`
export const Headshot=styled.div`

    width:35%;
    aspect-ratio: 1/1;
    border-radius: 50%;
    margin: auto;
    overflow: hidden;

    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    @media screen and (max-width:850px){
        width:40%;
    
    }

    @media screen and (max-width: 550px){
        width:37%;
        
    }
`


export const MemberCardContent=styled.div`
    width: 60%;
    @media screen and (max-width: 850px){
        width: 85%;
        margin: 10px 0;
        border-left: 2px solid ${({theme})=>theme.bgColor.yellowBGColor};
        padding-left: 30px;
        
    }
    @media screen and (max-width: 550px){
        width: 60%;
        margin: 10px 0;
        border-style: none;
        padding-left: 10px;
        
    }

`

const CardContentTextParent=styled.p`

    padding:  5px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    width: 100%;
    text-overflow:ellipsis;
    word-wrap:break-word;
    font-weight: 700;
    color:${({theme})=>theme.fontColor.lightBGfont};

`

    
export const CardContentName=styled(CardContentTextParent)`
    font-size: 2.5vmin;
    @media screen and (max-width: 550px){
        font-size: 3vmin;
    }

`

export const CardContentOther=styled(CardContentTextParent)`

    font-size: 2vmin;
    @media screen and (max-width: 550px){
        font-size:2.5vmin;
        
    }

`

export const CardTagsBox=styled.div`

    display: flex;
    flex-wrap: wrap;
    align-items: center;
    div{
        background: ${({theme})=>theme.bgColor.yellowBGColor};
        border-radius: 15px;
        margin: 0 5px 5px 0;
        p{
            color: ${({theme})=>theme.fontColor.yellowBGfont};
            font-size: 2vmin;
            padding: 0 5px;
        }
    }

`
