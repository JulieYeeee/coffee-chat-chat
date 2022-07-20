import styled from "styled-components";

export const Main=styled.main`
    width:100%;
    min-height: 100vh;
    display:flex;
    justify-content:center;
    
`

export const SingupForm=styled.form`
    width: 35%;
    display: ${({hideControl})=>hideControl=="signup"? "flex":"none"};
    flex-direction: column;
    align-items: center;
    padding: 40px;
    margin-top: 100px;
    margin-bottom: 50px;
    border-radius: 20px;
    background: #F2F2F0;
    box-shadow:-3px -5px 8px rgb(255, 255, 255),
    inset 10px 8px 8px -15px rgba(255, 255, 255, 0.764); 
    -webkit-filter: drop-shadow(1px 3px 3px rgba(145, 145, 145, 0.3));
    filter: drop-shadow(1px 3px 3px rgba(135, 135, 135, 0.3));
    

    @media screen and (max-width:1199px){
        width: 50%;
    }

    @media screen and (max-width:819px){
        width: 70%;
    }
`

export const CTAtitle=styled.p`
    font-size: 4vmin;
    font-weight: 700;
    padding: 10px 0 ;
    color: rgb(60, 59, 59);

`

export const Logo=styled.div`

    width: 100%;
    display: flex;
    justify-content: center;

    img{
        width: 80%;
    }

`

export const InputLabel=styled.label`
    width: 70%;
    padding: 10px 0;

    p{
        font-size: 2.5vmin;
        color: rgb(60, 59, 59);
    }
    input{
        font-size: 2.5vmin;
        padding: 10px;
        width:100%;
        color: rgb(60, 59, 59);
        border-style: none;
        background: #F2F2F0;
        border-bottom: 1px solid #F2B544;
        &:focus{
            outline: none;
        }
    }
`

export const SignupChangeTrigger=styled.div`
    font-size: 2.5vmin;
    color: rgb(60, 59, 59);
    cursor: pointer;        

`


export const SinginForm=styled.form`
    width: 35%;
    display: ${({hideControl})=>hideControl==="signin"? "flex":"none"};
    flex-direction: column;
    align-items: center;
    padding: 40px;
    margin-top: 100px;
    margin-bottom: 50px;
    border-radius: 20px;
    background: #F2F2F0;
    box-shadow:-3px -5px 8px rgb(255, 255, 255),
    inset 10px 8px 8px -15px rgba(255, 255, 255, 0.764); 
    -webkit-filter: drop-shadow(1px 3px 3px rgba(145, 145, 145, 0.3));
    filter: drop-shadow(1px 3px 3px rgba(135, 135, 135, 0.3));
    

    @media screen and (max-width:819px){
        width: 70%;

    }
`