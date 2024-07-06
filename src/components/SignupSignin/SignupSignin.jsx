import React from 'react'
import "./SignupSignin.css"
import Input from "../input/Input"
import Button from "../Button/Button"
import { useState } from 'react'

const SignupSignin = () => {

    const [name , setName] = useState('')
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')
    const [confirmPassword , setConfirmPassword] = useState('')

  return (
    <div className='signup-wrapper'>
        <h2 className='title'>Signup on <span style={{color:"var(--theme)"}}>Finance-Tracker</span></h2>

        <form>
            <Input label={"Full Name"} 
            state={name} 
            setState={setName} 
            placeholder={"John Doe"}               
            />
            
            <Input label={"Email"} 
            state={email} 
            setState={setEmail} 
            placeholder={"JohnDoe@gmail.com"}
            />

            <Input label={"Password"} 
            state={password} 
            setState={setPassword} 
            placeholder={"Example@123"}
            />

            <Input label={"Confirm Password"} 
            state={confirmPassword} 
            setState={setConfirmPassword} 
            placeholder={"Example@123"}
            />

            <Button text={"Signup using Email and Password"}/>

        </form>

    </div>
  )
}

export default SignupSignin