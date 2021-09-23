import React from 'react'

const Button = (props) => {
    return (
        <>
            <button 
            onClick={props.onClick}
            nome={props.nome}
            color={props.color}>
           
            {props.children}
            </button>
            
        </>
    )
}

export default Button
