import React, { createContext, useState ,useEffect} from 'react';
import {toast} from 'react-toastify';
export const AppContext = createContext();
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AppContextProvider = (props) => {
  const [user, setUser] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token'));

  const [credit,setCredit] = useState(0);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const loadCreditsData = async () => {
    console.log("Attempting to load credits data...");
    try{
      // Added a timestamp query parameter to prevent caching and ensure fresh data
      const timestamp = new Date().getTime();
      // FIX: Changed 'headers: {token}' to 'params: {token: token}' for the GET request
      const {data} = await axios.get(`${backendUrl}/api/user/credits?_t=${timestamp}`, {
        params: {token: token}}); // Token now sent as a query parameter

      console.log("Response from /api/user/credits:", data); // DEBUGGING LINE: Log the entire data object

        if(data.success) {
          setCredit(data.credits); // FIX: Access data.credits directly
          console.log("Credit updated in context to:", data.credits);
          setUser(data.user);
        } else {
            console.log("API call to /api/user/credits was not successful:", data.message);
        }
    }
    catch(error){
      console.log("Error loading credits data:", error);
      toast.error(error.message);
    }
  }
  const navigate = useNavigate();
  const  generateImage = async (prompt) =>{
    try{
      const {data} = await axios.post(backendUrl + '/api/image/generate-image',{prompt},{params: {token: token}})
      if(data.success){
        await loadCreditsData(); // Always await loadCreditsData to fetch the latest balance from /api/user/credits
        return data.resultImage;
      }
      else{
        toast.error(data.message )
        await loadCreditsData(); // Fallback to loadCreditsData on failure
        if(credit === 0) {
          navigate('/buy')
      }
      return null; // Return null on failure
    }
  }

    catch(error){
      toast.error(error.response?.data?.message || error.message);
      await loadCreditsData(); // Ensure credits are updated on network/other errors too
      return null; // Return null on error
    }
  }
  const logout =()=>{
    localStorage.removeItem('token');
    setToken("");
    setUser(null);
    navigate('/'); // FIX: Navigate to the home page after logout
  }
  useEffect(() => {
    if(token) {
      loadCreditsData();
    }
  }, [token]);

  const value = {
    user,
    setUser,
    showLogin,setShowLogin,backendUrl,token,setToken,credit,setCredit,loadCreditsData,logout,generateImage
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
