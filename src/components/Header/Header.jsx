import React, { useEffect } from 'react'
import "./Header.css"
import {auth } from "../../firebase"
import {useAuthState} from "react-firebase-hooks/auth"
import { useNavigate } from 'react-router-dom'
import { signOut } from "firebase/auth";
import {toast} from "react-toastify"


const Header = () => {

  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate()

    useEffect(()=>{
      if(user){
        navigate("/dashboard")
      }
    }, [user , loading])


    const logoutFnc = ()=>{
        try{
          signOut(auth).then(() => {
            // Sign-out successful.
            toast.success("User Logout")
            navigate("/")
          }).catch((error) => {
            toast.error(error.message)
            // An error happened.
          });
        }catch(e){
          toast.error(e.message)
        }
    }

  return (
    <div className='header'> 
    <p className='logo'>Finance-Tracker</p>
    {
      user && (
        <p className='logo link' onClick={logoutFnc}>Logout</p>

      )
    }
    
    </div>
  )
}

export default Header