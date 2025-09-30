import React, { useContext, useRef, useState } from 'react'
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom'
import { assets } from '../assets/assets'
import { Context } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const ResetPassword = () => {

  const inputRef = useRef([]);
  const [loading,setLoading] = useState(false);
  const {userData, getUserData, isLoggedIn, backendURL} = useContext(Context);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [otp, setOTP] = useState("");
  const [isOTPSubmitted, setIsOTPSubmitted] = useState(false);

  axios.defaults.withCredentials = true;

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


const handleResetOTP = async() => {
  const otp = inputRef.current.map((input) => input.value).join("");
  if(otp.length !== 6){
    toast.error("Please enter all 6 digits of OTP.");
    return;
  }
  setOTP(otp);
  setIsOTPSubmitted(true);
}

const onSubmitNewPassword = async (e) => {
  setLoading(true);
  e.preventDefault();
  try{
    const response = await axios.post(`${backendURL}/reset-password`,{email,otp,newPassword});
    if(response.status === 200){
      toast.success("Password was reset successfully!");
      navigate("/login");
    }else{
      toast.error("Something went wrong. Please try again.")
    }
  }catch(error){
    toast.error(error.message);
  }finally{
    setLoading(false);
  }
}

  // Code for jumping to next box upon otp entering and going back using backspace  
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

  const onSubmitEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    try{
      const response = await axios.post(`${backendURL}/send-reset-otp?email=`+email);
      if(response.status === 200){
        toast.success("OTP to reset password is sent!");
        setIsEmailSent(true);
      }else{
        toast.error("Something went wrong. Please try again.")
      }
    }catch(error){
      toast.error(error.message);
    }finally{
      setLoading(false);
    }
  }


  return (
    <>
    <div className="d-flex align-items-center justify-content-center vh-100 position-relative"
    style={{background : "linear-gradient(90deg, #040b00ff, #2a1bb2ff)"}}>

      <NavLink to="/" className="position-absolute top-0 start-0 p-4 d-flex align-items-center gap-2 text-decoration-none">
        <img src={assets.home} alt="logo" height={26} width={26}/>
        <span className="fs-4 fw-semibold text-light">Lockely</span>
      </NavLink>

      {/* Reset password card */}
      {!isEmailSent && 
        (<div className="rounded-4 p-5 text-center" 
        style={{width: "100%", maxWidth: "400px", background: "#083a8aff"}}>
          <h4 className="mb-2 text-white fw-bold fs-2">Reset Password</h4>
          <p className="mb-4 text-white">Enter your registered email address:</p>

          <form onSubmit={onSubmitEmail}>
            <div className="input-group mb-4 bg-secondary bg-opacity-10 rounded-pill">
              <span className="input-group-text border-0" 
              style={{background: "#C2185B"}}>
                <i className="bi bi-envelope text-white"></i>
              </span>
              <input 
              type="email" 
              className="form-control bg-green border-0 text-black ps-1 pe-4 rounded-end" 
              placeholder="Enter email"
              style={{height: "50px"}}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              />
            </div>
            <button className="btn btn-primary w-100 py-2" type="submit" disabled={loading}>
              {loading ? <span className="spinner-border spinner-border-sm"></span> : "Submit"}
            </button>
          </form>
        </div>)
      }

      {/* Card for OTP */}
      {!isOTPSubmitted && isEmailSent && (
        
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
      <button className="btn btn-primary w-100 fw-semibold" 
      disabled={loading}
      onClick={handleResetOTP}>
        Submit OTP
      </button>
    </div>
      )}

      {/*New Password form*/}
        {isOTPSubmitted && isEmailSent && (
          <div className="rounded-4 p-4 text-center"
          style={{width: "100%", maxWidth: "400px", 
          background: "#083a8aff",
          color:"white"}}>
          <h4>New Password</h4>
          <p className="mb-4">Enter the new password below:</p>
          <form onSubmit={onSubmitNewPassword}>
          <div className="input-group mb-4 bg-secondary bg-opacity-10 rounded-pill">
            <span className="input-group-text border-0" 
              style={{background: "#C2185B"}}>
                <i className="bi bi-person-fill-lock"></i>
            </span>
            <input 
            type="password"
            className="form-control bg-white border-1 ps-1 pe-4 rounded-end"
            placeholder="******"
            style={{height: "50px"}}
            onChange={(e) => setNewPassword(e.target.value)}
            value={newPassword}
            required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100" 
          disabled={loading}
          >
            {loading ? <span className="spinner-border spinner-border-sm"></span> : "Submit"}
          </button>
          </form>  
          </div>
        )}

    </div>
    </>
  )
}

export default ResetPassword