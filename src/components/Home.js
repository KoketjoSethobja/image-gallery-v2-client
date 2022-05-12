import React, { useEffect} from 'react';
import { Link, useNavigate } from "react-router-dom";

const Home = () => {

    const navigate = useNavigate();

    useEffect(() => {
        window.reload = () => {
            const loggedInUserID = localStorage.getItem('idUsers');
            const loggedInUserName = localStorage.getItem('username');
            if(loggedInUserID && loggedInUserName) {
                navigate('/photos')
            } else {
                navigate('/')
            }
        }        
    })

    return (
        <div className="container">
            <div className="home-container">
                <div className='home-image'>
                    <img className='img' src="../home.svg" alt="" />
                </div>
                <div className='home-info'>
                    <div className='wrap-logo'>
                        <div className='img-logo'>
                            <img src="../logo.svg" alt="logo" />
                        </div>
                        <h3>K Gallery</h3>
                    </div>
                    <div className='welcome-description'>
                        <h1>Welcome</h1><br />
                        <p>
                            Here, you can upload, view, edit, and delete your images.
                            Go ahead and register or login if you are already registered
                        </p>
                    </div>                                
                    <div className='buttons-home'>
                        <Link className='btn login-btn' to="/login">Sign In</Link>
                        <Link className='btn register-btn' to="/register">Register</Link>
                    </div>                    
                </div>                
            </div>
        </div>        
    )
}

export default Home;