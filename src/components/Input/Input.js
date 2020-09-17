import React from 'react';
import { Button, Input, Select } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

export  default function Inputs(props){

    let inputElement = null;

    const getProps = (() => {
        console.log(props)
    })

    switch (props.elementType){
        case ('input'):
            inputElement = <Input {...props.elementConfig}  key={props.id} value={props.value} onChange={props.changed}></Input>
        break;
        case ('id'):
            inputElement = null
        break;
        case ('select'):
            inputElement = <InputLabel>{props.label}
            <Select value={props.value} onChange={props.changed}>
                {props.elementConfig.options.map(option => {
                    // return <option key={option.value} value={option._id}>{option.name}</option>
                return <MenuItem key={option.value} value={option.value}>{option.name}</MenuItem>
                    })}
            </Select>
            </InputLabel>
        break;
        default:
           inputElement = <Input {...props.elementConfig} key={props.id} value={props.value}> </Input>
        break;
    }

    return (
        <div>
            {inputElement}
            <Button onClick={getProps}>dggh</Button>
        </div>
    )
}
