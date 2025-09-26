import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'

const Login = () => {
    const [isCreateAccount, setIsCreateAccount] = useState(!false);
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
                <form>
                    {isCreateAccount && <div className="mb-3">
                        <label htmlFor="text" className="form-label">Full Name</label>
                        <input 
                            type="text" id="fullName" 
                            className="form-control"
                            placeholder="Name..."
                            required
                        />
                    </div>}
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email Id</label>
                        <input 
                            type="email" id="email" 
                            className="form-control"
                            placeholder="Email Id..."
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input 
                            type="password" id="password" 
                            className="form-control"
                            placeholder="********"
                            required
                        />
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                        <NavLink to="/reset-password" className="text-decoration-none">
                            Forgot Password
                        </NavLink>
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                        {isCreateAccount ? "Sign Up" : "Login"}
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