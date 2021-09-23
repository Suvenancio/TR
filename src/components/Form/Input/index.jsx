import React from 'react'
import * as S from './Input.styles'


const Input = (props) => {
    return (
        <>
        <label >
        {props.label}
            <S.Input        
                value={props.value}
                name={props.name}
                onClick={props.onClick}
                onChange={props.onChange}
                type={props.type} 
                width={props.width}
                height={props.height}
                margin={props.margin}
                />
        </label>
        </>
    )
}

export default Input
