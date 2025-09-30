import React, { createContext, useEffect, useState } from 'react'
import { AppConstants } from '../util/constants';
import { toast } from 'react-toastify';
import axios from 'axios';

export const Context = createContext();

const AppContext = (props) => {
    axios.defaults.withCredentials = true;

    const backendURL = AppConstants.backendURL;
    const [isLoggedIn,setIsLoggedIn] = useState(false);
    const [userData,setUserData] = useState(null);

    const getUserData = async() => {
        try{
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

    //Making sure the user doesn't logout when refreshing the page
    const getAuthState = async () => {
      try{
        const response = await axios.get(`${backendURL}/is-authenticated`);
        if(response.status === 200 && response.data == true){
          setIsLoggedIn(true);
          await getUserData();
        }else{
          setIsLoggedIn(false);
        } 
      }catch(error){
          if(error.response){
            if(error.response.status !=401){
              const msg = error.response.data?.message || "Authentication Check failed!";
              toast.error(msg);
            }

          }else{
            toast.error(error.message);
          }
      }
    }

    useEffect(() => {getAuthState()},[]);
    //End of - Making sure the user doesn't logout when refreshing the page

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

