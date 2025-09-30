import React, { useContext, useEffect } from 'react'
import { assets } from '../assets/assets'
import { Context } from '../context/AppContext';

const Header = () => {

    const {userData} = useContext(Context);
    
  return (

    <div>
        <div className="text-center d-flex flex-column align-items-center justify-content-center py-5 px-3"
        style={{minHeight:"80vh"}}>
            <img src={assets.logo} alt="header" width={120} className="mb-4" />
            <h5 className="f5-semibold">
                Your data is secure with us! 
                <span role="img" aria-label="police">👮</span>
            </h5>
            <h1 className="fw-bold display-5 mb-3">Welcome to Lockely</h1>
            <p className="text-muted fs-5 mb-4" style={{maxWidth:"500px"}}>
                Hello, {userData ? userData.name : "Developer"}! You can securely login to Lockely and have your data safe and secure here.
                Rest Assured!
            </p>
            <button className="btn btn-outline-dark rounded-pill px-4 py-2">
                Get Started
            </button>
        </div>
    </div>
  )
}

export default Header