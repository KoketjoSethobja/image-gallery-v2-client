import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [user, setUser] = useState()
    const [status, setStatus] = useState("")
    const navigate = useNavigate();    

    const login = (e) => {
        
        axios.post('http://localhost:5000/login', {
            username: username,
            password: password
        }).then((response) => {
            if(response.data.message){
                setStatus(response.data.message)
            } else {
                setStatus(response.data.message)
                setUser(response.data[0].username)
                localStorage.setItem('idUsers', (response.data[0].idUsers))
                localStorage.setItem('username', (response.data[0].username))
                // console.log(response.data[0].idUsers+' '+response.data[0].username)
                navigate('/photos')
            }
        })
        e.preventDefault();
    }

    // useEffect(() => {
    //     const loggedInUserID = localStorage.getItem('idUsers');
    //     const loggedInUserName = localStorage.getItem('username');
    //     if(loggedInUserID && loggedInUserName) {
    //         navigate('/photos')
    //     } else {
    //         navigate('/')
    //     }
    // })

    axios.defaults.withCredentials = true;

    return (
        <div className='container'>
            <div className='login-container'>
                <div className='login'>
                    <div className='login-logo'>
                        <div className='login-image'>
                            <img src="../logo.svg" alt="logo" />
                        </div>
                        <h3>K Gallery</h3> 
                    </div>                                       
                    <h1>Sign in to K-Gallery</h1>
                    <form className='form-login' onSubmit={(e) => {login(e)}}>
                        <label htmlFor="username">Username</label>
                        <input 
                            required
                            type="text"
                            value={username}
                            placeholder="enter a username"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <label htmlFor="password">Password</label>
                        <input 
                            required
                            type="password" 
                            value={password}
                            placeholder="enter a password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="submit">Sign In</button>
                    </form>
                    <div className='not-registered'>
                        <p>Not Registered? <Link className='reg-log' to="/register">Register</Link></p>
                    </div>
                    <div className='login-status'>
                        <p>{status}</p>
                    </div>                    
                </div>                               
            </div>
        </div>
    )
}

export default Login;