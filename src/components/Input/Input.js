import React from 'react';
import { Input } from '@material-ui/core';

export  default function Inputs(props){

    let inputElement =null;

    switch (props.elementType){
        case ('input'):
            inputElement = <Input {...props.elementConfig} value={props.value} onChange={props.changed}></Input>
        break;
        case ('select'):
            inputElement = <select value={props.value} onChange={props.changed}>
                {props.elementConfig.options.map(option => {
                    return <option key={option.value} value={option._id}>{option.name}</option>})}
            </select>
        break;
        default:
           inputElement = <Input {...props.elementConfig} value={props.value}> </Input>
        break;
    }

    return (
        <div>
            {inputElement}
        </div>
    )
}
