import React from 'react'
import "./Button.css"

const Button = ({text, onclick ,blue}) => {
  return (
    <div className={blue ? "btn btn-blue" : "btn"} onclick={onclick}>{text}</div>
  )
}

export default Button