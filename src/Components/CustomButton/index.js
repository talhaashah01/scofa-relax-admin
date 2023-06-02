import React from 'react'
import "./style.css"

const CustomButton = (props) => {
  return (
    <>
      <button type={props?.type} className={`customButton ${props?.variant} ${props?.className}`} onClick={props?.onClick}>{props?.text}</button>
    </>
  )
}
export default CustomButton;
