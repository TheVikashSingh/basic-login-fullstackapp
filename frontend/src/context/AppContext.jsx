import React, { createContext, useState } from 'react'
import { AppConstants } from '../util/constants';
import { toast } from 'react-toastify';
import axios from 'axios';

export const Context = createContext();

const AppContext = (props) => {

    const backendURL = AppConstants.backendURL;
    const [isLoggedIn,setIsLoggedIn] = useState(false);
    const [userData,setUserData] = useState(null);

    const getUserData = async() => {
        try{
          axios.defaults.withCredentials = true;
          const response = await axios.get(`${backendURL}/profile`);
          if(response.status === 200){
            setUserData(response.data);
          }else{
            toast.error("Unable to get user's profile.");
          }
        }catch(error){
            toast.error(error.message);
        }
    }
    

    const contextValue = {
        backendURL,
        isLoggedIn, setIsLoggedIn,
        userData, setUserData,
        getUserData,
    }


  return (
    <>
    <Context.Provider value={contextValue}>
        {props.children}
    </Context.Provider>
    </>
    
  )
}

export default AppContext

