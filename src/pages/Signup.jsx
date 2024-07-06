import React from 'react'
import "../App.css"
import Header from "../components/Header/Header"
import SignupSignin from "../components/SignupSignin/SignupSignin"

const Signup = () => {
  return (
    <div>
      <Header/>
      <div className="wrapper">
      <SignupSignin/>
      </div>
    </div>
  )
}

export default Signup