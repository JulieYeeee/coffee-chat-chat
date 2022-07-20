import styled from "styled-components";



export const Main=styled.main`

    width: 100%;
    display: flex;
    height: auto;
    min-height: 100vh;
    color:#F7AA42;
    background: ${({bgColor})=>bgColor=="light"? "#F2F2F0":"#F2B544"};
    transition: 0.5s;

    
`


export const Bar =styled.div`
    display: ${({bgColor})=>bgColor==="light"? "flex":"none"};
    flex-direction: column;
    align-items: center;
    padding: 10px 0 30px 0;
    position: relative;

    p{
        font-size: 3vmin;
        color: #6FBFB1;
    }

    img{
        position: absolute;
        width: 40px;
        animation: crossFloatAnimation 1s;
        animation-iteration-count:infinite;
    }

    @keyframes crossFloatAnimation {
    0%{
        top:50%;
    }
    100%{
        top:100%
    }
    }


`



export const Section =styled.section`
    width: 1200px;
    display: flex;
    height: auto;
    min-height: 100vh;
    color: #F7AA42;
    

    @media screen and (max-width: 1199px) {
        width: 100%;
        height: auto;
        min-height: 80vh;
    
    }
    @media screen and (max-width: 819px){
        height: auto;
        min-height: 75vh;
        flex-direction: column;
        align-items: center;
    }

`

export const LeftDiv=styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    @media screen and (max-width: 819px){
        width: 100%;
        padding: 30px 0;
        margin: 30px 0 15px 0;
        
    }

`

export const LeftTitle=styled.p`

    font-size: 10vmin;
    font-weight: 700;
    margin-left: 50px;
    color: ${({scrollColor})=>scrollColor? "#F2F2F2":"#F7AA42"};
    
    @media screen and (max-width: 1199px){
        font-size: 8vmin;
        margin:0 30px 0 30px;
        
    }
    @media screen and (max-width: 819px){
        font-size: 12vmin;
        text-align: center;
        margin:0 30px 0 30px;
        
    }

`


export const LeftDiscript=styled.div`

    display: flex;
    margin-left: 50px;
    a{
            font-size: 3vmin;
            padding:5px 10px;
            color:white;
            background: #6FBFB1;
            border: 2px solid #6FBFB1;
            border-radius: 30px;
            font-weight: 700;
            margin: 10px;
            &:hover{
                background:#97ddd300;
                color:#33c1a9;
            }

    }

    @media screen and (max-width: 1199px){
        flex-direction: column;
        margin:0 30px 0 30px;   
        
    }
    @media screen and (max-width: 819px){
        flex-direction: row;
        margin:0 30px 0 30px;
        justify-content: center;
        
    }
    


`

export const RightDiv=styled.div`
    width:50%;
    position: relative;
    display: flex;
    align-items: center;
    @media screen and (max-width: 819px){
        width:90%;
        
    }


`

export const CircleBox=styled.div`
    position: relative;
    right: 10px;
    width: 100%;
    aspect-ratio: 1/1;
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    @media screen and (max-width: 819px){
        right: 0px;
        aspect-ratio:unset;
        justify-content: center;
        
    }


`

export const Circle=styled.div`
    margin: 5px;
    width: 30%;
    height: 30%;
    background: #F7AA42;
    border-radius: 50%;
    overflow: hidden;
    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

`


export const Section2section=styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 1200px;
    color: #737373;
    min-height: 90vh;
    @media screen and (max-width: 1199px){
        width: 100%;
        
    }

`

export const S2Title=styled.div`
    text-align: center;
    padding:50px 0 ;
    p{
        font-size: 4.5vmin;
        font-weight: 700;
        color: ${({scrollColor})=>scrollColor&& "rgb(255, 243, 220)"};
    }
    @media screen and (max-width: 1199px){
        padding: 50px;
        
    }

`


export const Userbox=styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    div{
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 50%;
        background: #F2B544;
        margin:0 10px;
        padding: 30px 0px;
        border-radius: 50px  0 50px 0 ;
        p{

            color: rgb(255, 243, 220);
            font-size: 3vmin;
            text-align: center;
            padding: 20px;
            font-weight: 700;
        }
        img{
            color: white;
            height: 50vh;
        }
    }
    @media screen and (max-width: 1199px){
        div{
            width: 40%;
            border-radius: 100px  0 100px 0 ;
            img{
                height: 35vh;

            }
            
        }
        
    }
    @media screen and (max-width: 819px){
        img{
            height: 25vh;
        }
        
    }
    @media screen and (max-width:600px){

        div{
            width: 45%;
            border-radius: 20px 0 20px 0;
            img{
                height: 20vh;
            }
        }
    }

    @media screen and (max-width:430px){

        div{
            width: 45%;
            border-radius: 15px 0 15px 0;
            img{
                height: 20vh;

            }
            
        }
    }


`

export const Downtitle =styled.p`
    font-size: 4.5vmin;
    padding:50px 0 ;
    /* color: ${({scrollColor})=>scrollColor? "rgb(255, 243, 220)":"rgb(70, 70, 70)"}; */
    color: ${({scrollColor})=>scrollColor&& "rgb(255, 243, 220)"};
    

`

export const Section3section=styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 1200px;
    color: #737373;
    p{
        font-size: 4.5vmin;
        font-weight: 700;
        margin: 40px 0 0 0 ;
    }


    
    @media (max-width: 1199px) {
        width: 100%;

    }
    @media (max-width: 819px) {
        width: 100%;

    }


`

export const Footer=styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background: #F29544;
    width: 100%;
    padding:20px;
    margin-top: 50px;
    flex-grow: 1;
    p{
        font-size: 3vmin;
        color: white;
        padding: 0 10px;
    }
    a{
        font-size: 3vmin;
        border-radius: 20px;
        border: 1px solid white;
        color: white;
        padding: 5px 10px;
    }
    @media (max-width: 600px){
        margin-bottom: 50px;
    }

`

export const FeatureBox=styled.div`
    display: flex;
    max-width: 1200px;
    flex-direction: column;
    align-items: center;
    @media (max-width: 1199px){
        width: 90%;
    }

`

export const SingleFeatureBox=styled.div`
    display: flex;
    width: 100%;
    flex-direction: ${({layout})=>layout==0? "row":"row-reverse"};
    justify-content: space-between;
    margin: 50px 0;
    align-items: center;
    @media (max-width: 1199px){
        width: 90%;
    }
    @media (max-width: 700px){
        flex-direction: column;
    }
`

export const DescriptionBox=styled.div`
    width: 35%;
    display: flex;
    flex-direction: column;
    h2{
        font-size: 3.5vmin;
        border-bottom: 2px solid ${({theme})=>theme.bgColor.yellowBGColor};
        width: 100%;

    }
    p{
        font-size: 2.5vmin;
        width: 100%;
        margin: 20px 0 ;
    }
    @media (max-width: 900px){
        width: 35%;
    }
    @media (max-width: 700px){
        width: 100%;
        h2{
            text-align: center;
        }
        p{
            text-align: center;
        }
    }

`

export const DemoBox=styled.div`
    width: 65%;
    aspect-ratio: 2/1;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    video{
        height: 100%;
        width: 110%;
        object-fit: contain;
    }
    @media (max-width: 700px){
        width: 100%;
    }
`
