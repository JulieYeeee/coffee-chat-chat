import styled from "styled-components";


export const AskForm=styled.form`
    width: 900px;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: ${({theme})=>theme.fontColor.lightBGfont};
    margin: 50px 0;
    @media (max-width: 1199px){
        width: 85%;
    }

`

export const AskConsultantBox=styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80%;
    padding: 30px 0;
   img{
        width: 150px;
        aspect-ratio: 1/1;
        object-fit: cover;
        background:${({theme})=>theme.decoColor.opacityWhite};
        border-radius: 50%;
    }
    div{
        font-size: 5vmin;
        font-weight: 700;
        padding-left: 30px;
    }

`

export const Bar=styled.div`
    width: 100%;
    height: 5px;
    box-shadow:
    inset 5px 10px 15px -15px rgba(135, 135, 135, 0.764);


`

export const QuestionBox=styled.div`
    padding: 30px 0;
    display: flex;
    flex-direction: column;
    width: 80%;


`

export const Notification=styled.p`
    font-size: 3vmin;
    font-weight: 400;
    text-align: center;
    padding: 10px 0 ;
    @media (max-width: 870px){

        text-align: center;
        padding: 20px 0 ;
    }

`

export const SingleQuestion=styled.div`
    padding: 30px 0;
    div{
        display: flex;
        align-items: center;
        padding-bottom: 5px;
        img{
            width: 30px;
            height: 30px;
        }
        p{
            font-size: 3.5vmin;
            font-weight: 700;
            padding-left: 5px;
        }
    }
    textarea{
        width: 100%;
        resize: none;
        font-size: 20px;
        padding: 15px;
        border-radius: 20px;
        border-style: none;
        box-shadow:-3px -5px 8px rgb(255, 255, 255),
        inset 10px 8px 8px -15px rgba(255, 255, 255, 0.764); 
        -webkit-filter: drop-shadow(1px 3px 3px rgba(145, 145, 145, 0.3));
        filter: drop-shadow(1px 3px 3px rgba(135, 135, 135, 0.3));
    }
    textarea:focus{
        outline: none;
    }

`

export const PaymentBox=styled.div`
    width: 70%;
    display: flex;
    flex-direction: column;
    padding: 30px 0;

    @media (max-width: 870px){
        width: 90%;
    }

`

export const PaymentInputBox=styled.div`
    display: flex;
    flex-direction: column;

    

`

export const InputLabel=styled.label`
        display: flex;
        align-items: center;


`

export const InputTitle=styled.div`

    width: 25%;
    font-size: 3vmin;
    text-align: end;
    padding-right: 20px;
            

`
export const Input=styled.div`
            box-shadow:-3px -5px 8px rgb(255, 255, 255),
            inset 10px 8px 8px -15px rgba(255, 255, 255, 0.764); 
            -webkit-filter: drop-shadow(1px 3px 3px rgba(145, 145, 145, 0.3));
            filter: drop-shadow(1px 3px 3px rgba(135, 135, 135, 0.3));
            height: 40px;
            width: 70%;
            margin: 5px 0;
            padding: 10px;
            border-radius: 10px;
            font-size: 3vmin;
            background: white;

`
     


export const TestNumCopy=styled.div`
    width: auto;
    display: flex;
    align-items: center;
    padding: 5px;
    justify-content: space-between;
    margin:5px 0 20px 0;
    background:${({theme})=>theme.decoColor.opacityWhite};
    font-size:2.25vmin;
    textarea{
        padding: 0 0 0 10px;
        width: 50%;
        resize: none;
        border-style:none ;
        background: ${({theme})=>theme.decoColor.opacityWhite};
        font-size:2.25vmin;
    }

    div{
        width: 10%;
        text-align: center;
        background: ${({theme})=>theme.bgColor.yellowBGColor};
        color:${({theme})=>theme.fontColor.yellowBGfont};
        border-radius: 5px;
        font-size:2.25vmin;
        cursor: pointer;
    }



`