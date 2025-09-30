import { useState,useContext, useRef, useEffect } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { Context } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Menubar = () => {
    const navigate = useNavigate();
    const [dropDownOpen,setDropDownOpen] = useState(false);
    const dropDownRef = useRef(null);
    const {userData, backendURL, setIsLoggedIn, setUserData} = useContext(Context);

    useEffect(() => {
      const handleOutsideClick = (e) => {
        if(dropDownRef.current && !dropDownRef.current.contains(e.target)){
          setDropDownOpen(false);
        }
      };
      document.addEventListener("mousedown", handleOutsideClick);
      return () => document.removeEventListener("mousedown", handleOutsideClick);
    },[]);

    const handleLogOut = async () => {
      try{
        axios.defaults.withCredentials = true;
        const response = await axios.post(`${backendURL}/logout`);
        if(response.status === 200){
          setUserData(null);
          setIsLoggedIn(false);
          navigate("/");
        }
      }catch(error){
        toast.error(error.response.data.message);
      }
    }

    const sendVerificationOTP = async () => {
      try{
        axios.defaults.withCredentials = true;
        const response = await axios.post(`${backendURL}/send-otp`);
        if(response.status === 200){
          navigate("/verify-email");
          toast.success("OTP has been sent to your registered email.");
        }else{
          toast.error("Unable to send OTP!");
        }
      }catch(error){
        toast.error(error.response.data.message);
      }
    }

  return (
    <nav className="navbar bg-white px-5 py-4 d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-2">

            <img src={assets.home} alt="logo_home" width={32} height={32} />
            <span className="fw-bold fs-4 text-dark">Lockely</span>
        </div>

        {userData ? (
          <div className="position-relative" ref={dropDownRef}>
            <div className="bg-dark text-white rounded-circle d-flex justify-content-center align-items-center" 
            style={{
              width: "40px",
              height: "40px",
              cursor: "pointer",
              userSelect: "none"
            }} onClick={() => setDropDownOpen((prev) => (!prev))}>

              {userData ? (userData.name[0].toUpperCase()) : ""}

            </div>
            {dropDownOpen && <div className="position-absolute shadow bg-white rounded p-2"
            style={{
              top: "50px",
              right: 0,
              zIndex: 100
            }}>
              {!userData.isAccountVerified && (
                <div className="dropdown-item py-1 px-2" style={{cursor:"pointer"}}
                onClick={sendVerificationOTP}>
                    Verify Email
                </div>
              )}
              <div className="dropdown-item py-1 px-2 text-danger" style={{cursor:"pointer"}}
              onClick={handleLogOut}>
                Logout
              </div>
              </div>}
          </div>
        ) : (<button className="btn btn-outline-dark rounded-pill px-3"
            onClick={() => navigate("/login")} >
            Login <i className="bi bi-arrow-right ms-2" />
        </button>)}

    </nav>
  )
}

export default Menubar