import styled from "styled-components";


export const Button=styled.button`

        width: 100%;
        color: rgb(60, 59, 59);
        padding: 10px;
        font-size: 2.5vmin;
        margin: 10px;
        border-style: none;
        border-radius: 10px;
        background: #F2F2F0;
        box-shadow:-3px -5px 8px rgb(255, 255, 255),
        inset 10px 8px 8px -15px rgba(255, 255, 255, 0.764); 
        -webkit-filter: drop-shadow(1px 3px 3px rgba(145, 145, 145, 0.3));
        filter: drop-shadow(1px 3px 3px rgba(135, 135, 135, 0.3));
        cursor: pointer;
     
        &:hover{
            box-shadow:-3px -5px 8px rgb(255, 255, 255),
            inset 10px 10px 10px -15px rgba(135, 135, 135, 0.764); 
        }


`