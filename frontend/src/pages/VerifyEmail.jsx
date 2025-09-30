import React, { useContext,useEffect,useRef, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { Context } from '../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const VerifyEmail = () => {
  const {userData,getUserData, isLoggedIn,backendURL} = useContext(Context);
  
  // Code for jumping to next box upon otp entering and going back using backspace
    const inputRef = useRef([]);

    const handleChange = (e,index) => {
      const value = e.target.value;
      if(!/^\d*$/.test(value)){
        e.target.value = "";
        return;
      } 
      e.target.value = value;
      if(value && index < inputRef.current.length - 1){
        inputRef.current[index+1].focus();
      }
    }

    const handleKeyDown = (e, index) => {
      if(e.key === "Backspace" && !e.target.value && index > 0){
        inputRef.current[index -1].focus();
      }
    }
// End of the code for box jumping

    const handlePaste = (e) => {
      e.preventDefault();
      const paste = e.clipboardData.getData("text").replace(/\D/g,"").slice(0,6).split("");
      paste.forEach((digit,i) => {
        if(inputRef.current[i]){
          inputRef.current[i].value = digit;
        }
      })
    const next = paste.length < 6 ? paste.length : 5;
    inputRef.current[next].focus();
    };

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    isLoggedIn && userData && userData.isAccountVerified && navigate("/");
  },[isLoggedIn, userData]);

  const handleVerify = async () => {
    const otp = inputRef.current.map((input) => input.value).join("");
    if(otp.length != 6){
      toast.error("Please enter all 6 digits of the OTP.");
      return;
    }
    setLoading(true);
    try{
      const response = await axios.post(`${backendURL}/verify-otp`,{otp});
      if(response.status === 200){
        toast.success("OTP Successfully Verified!");
        getUserData();
        navigate("/");
      }else{
        toast.error("Invalid OTP");
      }
    }catch(error){
        toast.error("Failed to verify OTP. Please try again.")
    }finally{
      setLoading(false);
    }
  }

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
            className="form-control text-center fs-4 otp-input"
            ref={(e1) => (inputRef.current[i] = e1)}
            onChange={(e) => handleChange(e,i)}
            onKeyDown={(e2) => handleKeyDown(e2,i)}
            onPaste={handlePaste}/>
        ))}
      </div>
      <button className="btn btn-primary w-100 fw-semibold" disabled={loading} onClick={handleVerify}>
        {loading ? <span className="spinner-border spinner-border-sm"></span> : "Verify Email"}
      </button>
    </div>

    </div>
    
    </>
  )
}

export default VerifyEmail