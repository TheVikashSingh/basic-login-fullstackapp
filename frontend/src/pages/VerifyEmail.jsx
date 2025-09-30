import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { Context } from '../context/AppContext'

const VerifyEmail = () => {
  const {userData} = useContext(Context);
  return (
    <>
    
    <div className="email-verify-container d-flex align-items-center 
    justify-content-center vh-100 position-relative"
    style={{background: "linear-gradient(90deg, #0b5ed7, #0b5ed7)",
      borderRadius: "none"
    }}>

    <NavLink to="/" className="position-absolute top-0 start-0 p-4 d-flex
    align-items-center gap-2 text-decoration-none">
      <img src={assets.logo} alt="logo" height={22} width={22} />
      <span className="fs-4 fw-semibold text-light">Lockely</span>
    </NavLink>

    <div className="p-5 rounded-4 shadow bg-white" style={{width: "400px"}}>
      <h4 className="text-center fw-bold mb-2">
        Verify Email OTP
      </h4>
      <p className="text-center text-dark-50 mb-4 fw-bold">
        Enter the 6-digit OTP sent to your email.
      </p>

    <div className="d-flex justify-content-between gap-2 mb-4 text-center 
      text-white-50 mb-2">
        {[...Array(6)].map((_,i) => (
          <input
            key={i} 
            type="text"
            maxLength={1}
            className="form-control text-center fs-4 otp-input"/>
        ))}
      </div>
      <button className="btn btn-primary w-100 fw-semibold">
        Verify Email
      </button>
    </div>

    </div>
    
    </>
  )
}

export default VerifyEmail