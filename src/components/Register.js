import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
 
const Register = () => {
    const [usernameReg, setUsernameReg] = useState("")
    const [passwordReg, setPasswordReg] = useState("")
    const [status, setStatus] = useState("")
    const [color, setColor] = useState("")

    axios.defaults.withCredentials = true;
    
    const register = (e) => {
        axios.post('https://koketjocomgallery.herokuapp.com/register', {
            username: usernameReg,
            password: passwordReg
        }).then((response) => {
            if(response.data.message){
                setStatus(response.data.message)
                setColor('red')
            } else {
                setStatus(response.data.passed)
                setColor('green')
            }
        })
        e.preventDefault();
    }

    return (
        <div className='container'>
            <div className='register-container'>
                <div className='register'>
                    <div className='register-logo'>
                        <div className='register-image'>
                            <img src="../logo.svg" alt="logo" />
                        </div>
                        <h3>K Gallery</h3>
                    </div>                    
                    <h1>Register to K-Gallery</h1>
                    <form className='form-register' onSubmit={(e) => {register(e)}}>
                        <label htmlFor="username">Username</label>
                        <input 
                            type="text"
                            value={usernameReg}
                            placeholder="enter a username"
                            onChange={(e) => setUsernameReg(e.target.value)}
                        />
                        <label htmlFor="password">password</label>
                        <input 
                            type="password" 
                            value={passwordReg}
                            placeholder="enter a password"
                            onChange={(e) => setPasswordReg(e.target.value)}
                        />
                        <button type="submit">Register</button>
                    </form>
                    <div className='already-registered'>
                        <p>Already Registered? <Link to="/login">Sign In</Link></p>
                    </div>
                    <div className='register-status'>
                        <p className="my-2 text-red-900" style={{color: color}}>{status}</p>
                    </div>                    	
                </div>                
            </div>
        </div>
    )
}
 
export default Register;