import styled from "styled-components";


export const Loading=styled.img`
    display: ${({closeCheck})=>closeCheck? "none": "block"};
    width: 50px;
    height: 50px;
    position: absolute;
    top: 50%;

`