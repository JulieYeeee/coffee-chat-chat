import React from "react";
import { BrowserRouter , Routes , Route } from "react-router-dom";
import Nav from "../component/Nav"
import Homepage from "../page/Homepage"

const App = () =>{
    return(
        <div>
            <BrowserRouter>
            <Nav/>
            <Homepage/>
            </BrowserRouter>
        </div>
    )
}

export default App;