import React from 'react'

export default function LetterView(props) {
    return (
      
        <div className="harf shadow-sm mr-4 bg-dark text-white">
        {props.opened && <span>{props.value}</span>}
        <span></span>
      </div>
    )
}
