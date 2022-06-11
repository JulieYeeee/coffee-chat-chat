import styled from "styled-components";
             
               


export const MembershipBox=styled.div`

    display: ${({closeCheck})=>closeCheck? "flex":"none"};
    flex-direction: column;
    align-items: center;
    width: 1200px;
    margin: 50px 0;
    @media (max-width: 1199px){
        width: 90%;
    }


`

export const Navigation=styled.div`
    width: 100%;
    padding: 10px 0;
    a{
        border-radius: 20px;
        box-shadow:-3px -5px 8px rgb(255, 255, 255),
        inset 10px 8px 8px -15px rgba(255, 255, 255, 0.764); 
        -webkit-filter: drop-shadow(1px 3px 3px rgba(145, 145, 145, 0.3));
        filter: drop-shadow(1px 3px 3px rgba(135, 135, 135, 0.3));
        border-style: none;
        padding: 10px;
        color: ${({theme})=>theme.fontColor.lightBGfont};
        border-radius: 10px;
        background: ${({theme})=>theme.bgColor.mainBGColor};
    }


`

export const MemberdataBox=styled.div`
    margin: 10px 0;
    padding: 20px;
    width: 100%;
    display: flex;
    flex-wrap: wrap;    

`

export const MemberDataLeft=styled.div`
    width: 75%;
    margin-right:2.5%;
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    @media (max-width: 700px){
        width: 100%;
        margin-right:0;
    }

`

export const MemberHeadshot=styled.div`
    background: ${({theme})=>theme.bgColor.mainBGColor};
    border-radius: 20px;
    box-shadow:-3px -5px 8px rgb(255, 255, 255),
    inset 10px 8px 8px -15px rgba(255, 255, 255, 0.764); 
    -webkit-filter: drop-shadow(1px 3px 3px rgba(145, 145, 145, 0.3));
    filter: drop-shadow(1px 3px 3px rgba(135, 135, 135, 0.3));
    border-style: none;
    width: 25%;
    aspect-ratio: 1/1;
    border-radius: 50%;
    border: 10px solid ${({theme})=>theme.decoColor.decoYellow};
    overflow: hidden;
    margin-bottom: 10px;

    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    @media (max-width: 500px){
        width: 50%;
    }


`

export const BasicInfoBox=styled.div`
    width: 70%;
    margin-left: 5%;
    padding-bottom: 10px;

`

export const BasicInfoText=styled.p`
    font-size: 4vmin;
    font-weight: 700;
    padding: 5px 0;
    color: ${({theme})=>theme.fontColor.lightBGfont};


`

export const LinkBox=styled.div`
    padding: 5px 0;
    img{
        width: 40px;
        aspect-ratio: 1/1;
        margin-right: 10px;
    }
    @media (max-width: 500px){
        width: 100%;
    }

`

export  const IntroBox=styled.div`
    width: 100%;
    padding: 20px 0;
    div{
        background: ${({theme})=>theme.decoColor.opacityWhite};
        /* border-radius: 20px; */
        box-shadow:-3px -5px 8px rgb(255, 255, 255),
        inset 10px 8px 8px -15px rgba(255, 255, 255, 0.764); 
        -webkit-filter: drop-shadow(1px 3px 3px rgba(145, 145, 145, 0.3));
        filter: drop-shadow(1px 3px 3px rgba(135, 135, 135, 0.3));
        width: 100%;
        /* background: white; */
        border-radius: 10px;
        padding: 10px;
        p{
            font-size: 2.25vmin;
            font-weight: 500;
            padding: 0;
        }
            
    }


`

export const Title=styled.p`

    color: ${({theme})=>theme.fontColor.lightBGfont};
    font-size: 3vmin;
    font-weight: 700;
    padding-bottom: 10px;
  

`

export const TagBox=styled.div`
    display: flex;
    flex-wrap: wrap;
    padding: 10px 0;
    margin-bottom: 20px;


`
export const Tag=styled.div`
    border-radius: 20px;
    box-shadow:-8px -5px 10px rgb(255, 250, 231);
    -webkit-filter: drop-shadow(1px 3px 3px rgba(145, 145, 145, 0.3));
    filter: drop-shadow(1px 3px 3px rgba(135, 135, 135, 0.3));
    background: ${({theme})=>theme.bgColor.yellowBGColor};
    border-style: none;
    padding: 5px;
    margin: 2.5px 10px 2.5px 0;
    box-shadow:inset 10px 15px 15px -15px #f59580; 
    color:${({theme})=>theme.fontColor.yellowBGfont};


`

export const ShareThemeBox=styled.div`
    padding: 10px 0;
    width: 100%;
    /* p{
        color: ${({theme})=>theme.fontColor.lightBGfont};
        font-size: 3vmin;
        font-weight: 700;
        padding-bottom: 10px;
    } */

`

export const ShareThemeInsideBox=styled.div`
    display: flex;
    align-items:baseline;
    width: 100%;
    color: ${({theme})=>theme.fontColor.lightBGfont};
    @media (max-width: 1199px){
        display: flex;
        flex-direction: column;
        align-items:baseline;
        width: 100%; 
    }


`

export const SingleShare=styled.div`
    border-radius: 20px;
    box-shadow:-3px -5px 8px rgb(255, 255, 255),
    inset 10px 8px 8px -15px rgba(255, 255, 255, 0.764); 
    -webkit-filter: drop-shadow(1px 3px 3px rgba(145, 145, 145, 0.3));
    filter: drop-shadow(1px 3px 3px rgba(135, 135, 135, 0.3));
    border-style: none;
    width: 30%;
    margin-right: 3%;
    display: flex;
    flex-wrap:wrap;
    /* align-items: center; */
    background: ${({theme})=>theme.decoColor.opacityWhite};

    @media (max-width: 1199px){
        width: 100%;
        margin: 10px 0;

    }

`

export const ShareTitle=styled.div`
    width: 100%;
    display: flex;

    span{
        width: 15%;
        padding: 10px;
        text-align: center;
        border-bottom: 2px solid ${({theme})=>theme.bgColor.mainBGColor};
    }

    p{
        border-bottom: 2px solid ${({theme})=>theme.bgColor.mainBGColor};
        width: 85%;
        padding: 10px;
        font-size: 2.25vmin;
        font-weight: 500;
    }

    @media (max-width: 1199px){
        span{
            width: 10%;

        }
        
    }


`

export const ShareContent=styled.p`
    width: 100%;
    padding: 10px;
    font-size: 2.25vmin;
    font-weight: 500;

`

export const MemberDataRight=styled.div `
    width: 22.5%;
    height: fit-content;  

    @media (max-width: 700px){
        width: 100%;                 
        display: flex;
        justify-content: center;
    }

`

export const Askform=styled.form`
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    div{
        padding: 10px 0;
        p{
            color: ${({theme})=>theme.fontColor.lightBGfont};
            font-size: 2.5vmin;
            font-weight: 700;
        }
    }

    @media (max-width: 700px){

        width:90%;
        padding: 20px;
        background: ${({theme})=>theme.decoColor.decoYellow};
        border-radius: 20px;

    }

`


export const ProjectBox=styled.div`
    width: 100%;
    padding: 20px;

`

export const ProjectInsideBox=styled.div`
    width: 100%;
    display: flex;
    width: 100%;
    @media (max-width: 819px){
        width: 100%;
        display: flex;
        flex-direction: column;
    }

`

export const SingleProject=styled.div`

    border-radius: 20px;
    box-shadow:-3px -5px 8px rgb(255, 255, 255),
    inset 10px 8px 8px -15px rgba(255, 255, 255, 0.764); 
    -webkit-filter: drop-shadow(1px 3px 3px rgba(145, 145, 145, 0.3));
    filter: drop-shadow(1px 3px 3px rgba(135, 135, 135, 0.3));
    border-style: none;
    width: 30%;
    margin-right: 3%;
    padding: 15px 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: ${({theme})=>theme.decoColor.opacityWhite};

    @media (max-width: 819px){
        width: 100%;
        margin: 10px 0;
        padding: 15px 10px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
    }
    

`

export const ProjectCover=styled.div`
    width: 95%;
    aspect-ratio: 3/2;
    overflow: hidden;

    /* img{
        width: 100%;
        height: 100%;
        object-fit: cover;
        
    } */

    @media (max-width: 819px){
        width: 45%;
        margin-right: 2%;
    }

    @media (max-width: 500px){
        width: 100%;
        aspect-ratio: 3/2;
        background: white;
        margin-bottom: 10px;
        margin-right: 0;
    }


`
export const Coverimg=styled.img`

        width: 100%;
        height: 100%;
        object-fit: cover;
        object-fit: ${({coverCheck})=>coverCheck? "cover":"none"};
        opacity: ${({coverCheck})=>coverCheck? "1":"0.5"};




`

export const ProjectContentBox=styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (max-width: 819px){

        width: 50%;

                         
    }
    @media (max-width: 500px){
        width: 100%;
    }
    


`

export const ProjectType=styled.p`
    font-weight: 700;
    width: 95%;
    color: ${({theme})=>theme.fontColor.lightBGfont};
    

`

export const ProejectText=styled.p `
    width: 95%;
    height: 90px;
    margin: 10px 0;
    color: var(--standardGrey);
    overflow:hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: -webkit-inline-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    white-space: normal;

    @media (max-width: 1199px){
        height: 90px;
        margin: 10px 0;
        overflow:hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        display: -webkit-inline-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
        white-space: normal;
    }

    @media (max-width: 819px){
  
        width: 95%;
        height: 90px;
             
    }

    @media (max-width: 500px){
        width: 95%;
        height: 90px;
        padding: 0;
        margin: 10px 0;
        overflow:hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        display: -webkit-inline-box;
        // display: block;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
        white-space: normal;
    }


`

export const Outlink=styled.a`
    border-radius: 20px;
    box-shadow:-3px -5px 8px rgb(255, 255, 255),
    inset 10px 8px 8px -15px rgba(255, 255, 255, 0.764); 
    -webkit-filter: drop-shadow(1px 3px 3px rgba(145, 145, 145, 0.3));
    filter: drop-shadow(1px 3px 3px rgba(135, 135, 135, 0.3));
    border-style: none;
    width: 95%;
    color: var(--standardWhite);
    padding: 10px;
    background: ${({theme})=>theme.bgColor.yellowBGColor};
    &:hover{
        box-shadow:-3px -5px 8px rgb(255, 255, 255),
        inset 10px 10px 10px -15px rgba(135, 135, 135, 0.764); 
    }
    @media (max-width: 819px){
        margin-top: 10px;
    }

`

