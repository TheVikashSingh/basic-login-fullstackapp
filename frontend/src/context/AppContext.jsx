import React, { createContext } from 'react'
import { AppConstants } from '../util/constants';

export const Context = createContext();

const AppContext = (props) => {

    const backendURL = AppConstants.BACKEND_URL;
    

    const contextValue = {
        backendURL,
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

