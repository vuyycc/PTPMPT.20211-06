import React, { useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { loginUser, signupUser } from '../axios';
import { Redirect } from 'react-router-dom';



export default function SignUp({ authorized}) {
    //document.body.style.backgroundImage = "url(/images/hinhnen1.png)";
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const history = useHistory();


    if (authorized) {
        return <Redirect to="/" />
    }

    const handleSubmit = () => {
        if(email == null || password == null || rePassword == null) {
            alert("Không được để trống !!");
        }
        if(password != rePassword){
            alert("Mật khẩu không trùng khớp !!");
        }
        let Name = email.slice(0, email.indexOf("@"));
        let body = {
            Email: email,
            Password: password,
            Name
        }
        console.log(body);

        signupUser(body).then(res => {
            console.log(res);
            if( res.status == 200){
                alert("Đăng ký thành công !!");
                history.push('/')
            }else if (res.status == 410) {
                alert("Tài khoản đã tồn tại !!");
                setEmail('');
                setPassword('');
            } else {
                alert("Đăng ký không thành công !!");
                setEmail('');
                setPassword('');
            }
        })

    }

    const changeEmail = (e) => {
        setEmail(e.target.value)
    }

    const changePassword = (e) => {
        setPassword(e.target.value)
    }

    const changeRePassword = (e) => {
        setRePassword(e.target.value)
    }

    return (
            <div class="content-w3ls">
                <form class="login-form">
                    <h2>Sign Up</h2>

                    <div class="form-control w3layouts">
                        <input type="email" id="email" name="email" placeholder="User name or email" title="Please enter a valid email" required="" value={email} onChange={(e)=> {changeEmail(e)}} />
                    </div>

                    <div class="form-control agileinfo">
                        <input type="password" class="lock" name="password" placeholder="Password" id="password1" required="" value={password} onChange={(e)=> {changePassword(e)}} />
                    </div>


                    <div class="form-control agileinfo">
                        <input onChange={(e) => {changeRePassword(e)}} type="password" class="lock" name="password" placeholder="Re-enter Password" id="password1" required="" value={rePassword} />
                    </div>

                    <input type="button" class="login" value="Sign Up" onClick={handleSubmit} />

                    <div class="form-control agileinfo" style={{ marginLeft: "-40px" }}>
                        <p class="p-bottom-w3ls">Already have an account? <a class href="\login" style={{ color: "blue" }}>Login ?</a></p>
                    </div>
                </form>
            </div>
        
    )
}