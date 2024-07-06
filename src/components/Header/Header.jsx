import React from 'react'
import "./Header.css"


const Header = () => {

    const logoutFnc = ()=>{
        alert("Logout")
    }

  return (
    <div className='header'> 
    <p className='logo'>Finance-Tracker</p>
    <p className='logo link' onClick={logoutFnc}>Logout</p>
    </div>
  )
}

export default Header