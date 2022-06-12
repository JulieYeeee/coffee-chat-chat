import { createGlobalStyle } from "styled-components";



export const GlobalStyle=createGlobalStyle`
*{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'Noto Sans TC', sans-serif;
    font-family: 'Signika Negative', sans-serif;
    font-size: 2.5vmin;
    
}


main{
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #F2F2F2;
}

a{
    text-decoration: none;
    color: ${({theme})=>theme.fontColor.lightBGfont};
}

::-webkit-scrollbar {

width: 7px;

}

::-webkit-scrollbar-button {

background: transparent;

}

::-webkit-scrollbar-track-piece {

background: transparent;

}

::-webkit-scrollbar-thumb {

border-radius: 4px;

background-color: rgb(238, 195, 125);

border: 1px solid rgb(255, 255, 255);

}


`