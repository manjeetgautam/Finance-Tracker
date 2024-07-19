import React from 'react'
import "./Button.css"

const Button = ({text, onclick ,blue , disabled}) => {
  return (
    <div className={blue ? "btn btn-blue" : "btn"}
     onClick={onclick}
     disabled={disabled}
     >{text}</div>
  )
}

export default Button