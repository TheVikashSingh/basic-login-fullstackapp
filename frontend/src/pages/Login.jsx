import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {Context} from '../context/AppContext'
import { toast } from 'react-toastify'

const Login = () => {
    const [isCreateAccount, setIsCreateAccount] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const {backendURL, setIsLoggedIn, getUserData} = useContext(Context);
    const navigate = useNavigate();

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        axios.defaults.withCredentials = true;
        setLoading(true);
        try{
            if (isCreateAccount){
                //register API
                const response = await axios.post(`${backendURL}/register`, {name,email,password});
                if(response.status === 201){
                    navigate("/");
                    toast.success("Account has been created successfully.");
                }else{
                    toast.error("This email already exists.")
                }
            }else{
                const response = await axios.post(`${backendURL}/login`,{email,password});
                if(response.status === 200){
                    setIsLoggedIn(true);
                    getUserData();
                    navigate("/");
                }else{
                    toast.error("Email or Password incorrect.")
                }
            } 
        }
        catch(error){
                toast.error(error.response.data.message);
        }
        finally{
            setLoading(false);
        }
    }

  return (
    <>
    <div className="position-relative min-vh-100 d-flex justify-content-center
    align-items-center" 
    style={{background:"linear-gradient(90deg, #0b5ed7, #649ff8ff)",border:"none"}}>
        <div style={{position:"absolute", top:"20px", left:"30px",
            display:"flex", alignItems:"center"}}>
                <NavLink to="/" style={{
                    display: "flex",
                    alignItems: "center",
                    fontWeight: "bold",
                    fontSize: "24px",
                    textDecoration: "none"
                }}>
                    <img src={assets.whitelock} alt="white-lock" height={22} width={22} />
                    <span className="fw-bold fs-4 text-light ms-2"> Lockely</span>
                </NavLink>
        </div>
            <div className="card p-4" style={{maxWidth: "400px", width: "100%"}}>
                <h2 className="text-center mb-4">
                {isCreateAccount ? "Create Account" : "Login"}
                </h2>
                <form onSubmit ={onSubmitHandler}>
                    {isCreateAccount && <div className="mb-3">
                        <label htmlFor="fullName" className="form-label">Full Name</label>
                        <input 
                            type="text" id="fullName" 
                            className="form-control"
                            placeholder="Name..."
                            required
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />
                    </div>}
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email Id</label>
                        <input 
                            type="email" id="email" 
                            className="form-control"
                            placeholder="Email Id..."
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input 
                            type="password" id="password" 
                            className="form-control"
                            placeholder="********"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                        <NavLink to="/reset-password" className="text-decoration-none">
                            Forgot Password
                        </NavLink>
                    </div>
                    <button type="submit" className="btn btn-primary w-100"
                    disabled={loading}>
                       {loading ? <span className="spinner-border spinner-border-sm"></span> : isCreateAccount ? "Sign Up" : "Login"}
                    </button>
                </form>

                <div className="text-center mt-3">
                    <p className="">
                        {isCreateAccount ? 
                        (<>
                        Already have an account?
                            <span onClick={() => setIsCreateAccount(false)}
                            className="text-decoration-underline ms-3"
                            style={{cursor: "pointer"}}>Login here</span>
                        </>): (
                            <>
                            Don't have an account?
                            <span onClick={() => setIsCreateAccount(true)}
                            className="text-decoration-underline ms-3" 
                            style={{cursor: "pointer"}}>Sign Up</span>
                            </>
                        )}
                    </p>
                </div>
                
            </div>
    </div>
    </>
  )
}

export default Login