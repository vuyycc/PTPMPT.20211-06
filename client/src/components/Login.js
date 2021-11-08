import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {login} from  '../axios'

export default function Login({setToken}) {
    //document.body.style.backgroundImage = "url(/images/hinhnen1.png)";
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const history = useHistory();

    const loginBtn = async () => {
        try {
            let body = {
                Email: email,
                Password: pass
            }
            const result = await login(body)
            console.log(result);
            setToken(result.data.data.token);
            history.push("/home")
        }catch (err) {
            console.log('error',err);
        }
    }

    const changeEmail = (e) => {
        setEmail(e.target.value);
    }

    const changePass = (e) => {
        setPass(e.target.value)
    }

    return (
        <div class="content-w3ls" >
            <form class="login-form">
                <h2>LOGIN</h2>

                <div class="form-control w3layouts">
                    <input value={email} onChange={(e) => changeEmail(e)} type="email" id="email" name="email" placeholder="User name or email" title="Please enter a valid email" required=""/>
                </div>

                <div class="form-control agileinfo">
                    <input value={pass} onChange={(e) => changePass(e)} type="password" class="lock" name="password" placeholder="Password" id="password1" required=""/>
                </div>


                <input type="button" class="login" value="login" onClick={loginBtn}/>

                <div class ="form-control agileinfo">
                <p class ="p-bottom-w3ls"><a class href="#">Forgot Password?</a></p>
                <p class ="p-bottom-w3ls1"><a class href="\signup"> Register here </a></p>
                </div>
            <h2>Is Good!!</h2>
            </form>
        </div>
    )
}