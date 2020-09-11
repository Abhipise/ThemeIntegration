import React from 'react';
import { Input, Select } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

export  default function Inputs(props){

    let inputElement = null;

    switch (props.elementType){
        case ('input'):
            inputElement = <Input {...props.elementConfig} value={props.value} onChange={props.changed}></Input>
        break;
        case ('select'):
            inputElement = <InputLabel>{props.label}
            <Select value={props.value} onChange={props.changed}>
                {props.elementConfig.options.map(option => {
                    // return <option key={option.value} value={option._id}>{option.name}</option>
                return <MenuItem value={option.value}>{option.name}</MenuItem>
                    })}
            </Select>
            </InputLabel>
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
