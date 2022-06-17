import styled from "styled-components"; 
import {Link} from "react-router-dom"



export const NavContainer=styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    border-bottom: 1px solid ${({theme})=>theme.decoColor.decoGreen};
    background: ${({theme})=>theme.bgColor.mainBGColor};



`

export const NavSelf=styled.nav`
    width: 1200px;
    display: flex;
    align-items: center;
    @media (max-width: 1199px){
        width:95%;
    }


`

export const LogoLink=styled(Link)`
    text-decoration: none;
    width: 50%;
    

    @media (max-width: 1199px){
        width: 40%;
    }
    @media (max-width: 819px){
        img{

            width: 90%;
        
        }
    }

`

export const RightMenu=styled.ul`
        display: flex;
        list-style: none;
        width:50%;
        justify-content: flex-end;
        align-items: center;
        padding:10px;
        text-decoration: none;

        @media (max-width: 1199px){
            width: 60%;
        }
        @media (max-width: 600px){
            flex-direction: row-reverse;
            justify-content: flex-start;
        }


`

export const Item=styled.li`
    margin:0 10px;
    position: relative;
    color: ${({theme})=>theme.decoColor.decoOrange};
    display: flex;
    justify-content: center;
    align-items: center;
    img{
        box-shadow:-3px -5px 8px rgb(255, 255, 255),
        inset 10px 8px 8px -15px rgba(255, 255, 255, 0.764); 
        -webkit-filter: drop-shadow(1px 3px 3px rgba(145, 145, 145, 0.3));
        filter: drop-shadow(1px 3px 3px rgba(135, 135, 135, 0.3));
        width: 40px;
        border-radius: 10px;
        background: ${({theme})=>theme.bgColor.mainBGColor};
        cursor: pointer;
        &:hover{
            box-shadow:-3px -5px 8px rgb(255, 255, 255),
            inset 10px 10px 10px -15px rgba(135, 135, 135, 0.764);
        }
        
    }
    @media (max-width: 600px){
        img{
            display: none;
        }
        
    }

`

export const FunctionBox=styled(Link)`
    color: ${({theme})=>theme.decoColor.decoOrange};
    display: flex;
    justify-content: center;
    align-items: center;
  
    
    img{
        box-shadow:-3px -5px 8px rgb(255, 255, 255),
        inset 10px 8px 8px -15px rgba(255, 255, 255, 0.764); 
        -webkit-filter: drop-shadow(1px 3px 3px rgba(145, 145, 145, 0.3));
        filter: drop-shadow(1px 3px 3px rgba(135, 135, 135, 0.3));
        width: 40px;
        border-radius: 10px;
        background: ${({theme})=>theme.bgColor.mainBGColor};
        cursor: pointer;
        &:hover{
            box-shadow:-3px -5px 8px rgb(255, 255, 255),
            inset 10px 10px 10px -15px rgba(135, 135, 135, 0.764);
        }
        
    }
    @media (max-width: 600px){
        display: none;
        
    }

`

export const SearchLink=styled(Link)`
    color: ${({theme})=>theme.decoColor.decoOrange};
    border: 1px solid ${({theme})=>theme.decoColor.decoOrange};
    border-radius: 15px;
    padding: 5px;
    font-weight: 700;

    @media (max-width: 600px){
        padding: 10px ;
    }

`

export const Notification=styled.span`
    color: ${({theme})=>theme.decoColor.decoOrange};
    background: ${({theme})=>theme.fontColor.yellowBGfont};
    border-radius: 10px;
    text-align: center;
    width: 20px;
    height: 20px;
    position: absolute;
    top: -5px;
    right: -5px;
    display: ${({closeCheck})=>closeCheck? "block":"none"};
    font-size:16px;
    @media (max-width: 600px){
        display: none;
    }
`

export const DownNavBox=styled.nav`
    width: 100%;
    background: ${({theme})=>theme.bgColor.mainBGColor};
    display: none;
    justify-content: space-around;
    position: fixed;
    bottom: 0;
    box-shadow:-3px 0px 5px rgba(145, 145, 145, 0.3);

    a,div{
        position: relative;
        img{
            width: 40px;
            height: 40px;
            background: ${({theme})=>theme.bgColor.mainBGColor};
            margin: 5px 0 ;
        }
    }

    @media (max-width: 600px){
        display: flex;
    }

`

export const DownNotification=styled(Notification)`
    top: 0px;
    right: 0px;
    @media (max-width: 600px){
        display: ${({closeCheck})=>closeCheck? "block":"none"};
    }


`

