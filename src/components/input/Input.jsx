import React from 'react'
import "./Input.css"

const Input = ({label , state , setState , placeholder , type}) => {
  return (
    <div className='input-wrapper'>
        <p className='label-input'>{label}</p>
        <input className='custom-input' 
        value={state}
        placeholder={placeholder}  
        type={type}
        onChange={(e)=>setState(e.target.value)}/>
    </div>
  )
}

export default Input