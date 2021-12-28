import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import {login} from "../features/userSlice"
import {loginUser} from  '../axios'
import { Redirect } from 'react-router-dom';

export default function Login({ setToken, authorized}) {
    //document.body.style.backgroundImage = "url(/images/hinhnen1.png)";
    const dispatch = useDispatch();
    const userReducer = useSelector(state => state.userReducer)
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [checkLogin, setCheck] = useState(false);
    const history = useHistory();


    if (authorized) {
        return <Redirect to="/" />
    }


    const loginBtn = async (e) => {
        try {
            let body = {
                Email: email,
                Password: pass
            }
            const result = await loginUser(body)

            if (result.data.data.token) {
                const userInfo = result.data.data.playerInfo;
                userInfo.accessToken = result.data.data.token;
                setToken(userInfo);
                e.preventDefault();

            dispatch(login(userInfo))
                alert("Đăng nhập thành công !!")
                history.push("/")
            }
           
        }catch (err) {
            console.log('error',err);
            alert("Sai tài khoản hoặc mật khẩu");
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