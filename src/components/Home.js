import React from "react"
import {useLocation, useNavigate} from 'react-router-dom';

function Home (){
    const location=useLocation()

    return (
        <div className="homepage">

            <center><h2>Hello {location.state.id} and welcome to the home</h2></center>

        </div>
    )
}

export default Home