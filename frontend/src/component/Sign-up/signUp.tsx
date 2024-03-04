import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


async function SignUpHandelling(e:any, name: string, username: string, password:string, confirmPassword: string, navigate: any) {
    e.preventDefault();

    console.log(name, "    ", username, "    ", password, "    ", confirmPassword);
    if(password !== confirmPassword){
        alert("Your Repeat Password is wrong")
        return;
    }

    const res = await axios.post<any>(
        'http://localhost:4001/signUp/', 
      {params: {
        name: name,
        username: username,
        password: password,
      }}, 
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          withCredentials:true
        },
      )
        .then()
        .catch();

    if (res.data && res.data.state ) {
        if(res.data.state === -1){
            alert("This Username have been exist, please try another username");
        }
        else{
            alert("Please login to continue");
            navigate('/Login'); 
        }
    }
    else{
        alert("Something went wrong");
    }
}


function Sign_Up() {



    
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    return (
        <section className="vh-100">
            <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-12 col-xl-11">
                        <div className="card text-black" >
                            <div className="card-body p-md-5">
                                <div className="row justify-content-center">
                                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
                                        <form className="mx-1 mx-md-4" action="#" onSubmit={(e) => SignUpHandelling(e, name, username, password, confirmPassword, navigate)}>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <input type="text" id="form3Example1c" className="form-control" required
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    />
                                                    <label className="form-label" >Your Name</label>
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <input type="text" id="form3Example3c" className="form-control" required
                                                    value={username}
                                                    onChange={(e) => setUsername(e.target.value)}
                                                    />
                                                    <label className="form-label" >Username</label>
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <input type="password" id="form3Example4c" className="form-control" required
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    />
                                                    <label className="form-label" >Password</label>
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <input type="password" id="form3Example4cd" className="form-control" required
                                                    value={confirmPassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                    />
                                                    <label className="form-label">Repeat your password</label>
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                <button type="submit" className="btn btn-primary btn-lg">Register</button>
                                            </div>

                                        </form>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Sign_Up;
