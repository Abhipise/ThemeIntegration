import React, { useState } from 'react';
import { Input, Grid} from '@material-ui/core';
import Button from '../../components/CustomButtons/Button';
import SnackbarContent from "components/Snackbar/SnackbarContent.js";

import axios from '../../axios';
        
export default function Auth( props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError,setEmailError] = useState(false);
    const [passwordError,setPasswordError] = useState(false);
    const [signup, setSignup] = useState(true);
    const [success, setSucces] = useState(false);
    const [name, setName] = useState('');

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if(!email){
            setEmailError(true)
        }else if(!password){
            setPasswordError(true)
        }else{
            try {
                if(signup){
                    axios.post("/users/login",{email:email,password:password})
                    .then(res => {
                        setEmailError(false)
                        setPasswordError(false)
                        console.log(props.history.push('/admin/dashboard'))  
                })
                } else {
                axios.post("/users/signup",{email:email,password:password})
                .then(res => {
                    setSucces(true)
                    setEmailError(false)
                    setPasswordError(false)
                })
            }
        } catch (error) {    
            console.log(error.message)    
        }
        // setEmailError(true);
        // setPasswordError(true);
    };
    }

    const switchAuthModeHandler = () => {
        setSignup(!signup);
    }
    
    return(
        <div>
            <form style={{margin :"50px"}}>
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
            >
                <h3>Login Form</h3>
                <Input
                    placeholder= "email"
                    type= "text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                ></Input><br></br>
                <Input
                    placeholder="Name"
                    type="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                ></Input><br></br>
                <Input
                    placeholder="Password"
                    type="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                ></Input><br></br>
                {
                emailError &&
                    <SnackbarContent message={"Email can not be blank"} />
                }
                {
                passwordError &&
                    <SnackbarContent message={"Password can not be blank"} />
                }
                {
                success &&
                    <SnackbarContent message={"User created succesfully"} />
                }
                <Button type="button" color="primary" onClick={onSubmitHandler}>Submit</Button> 
                <Button type="button" color="primary" onClick={switchAuthModeHandler}>Switch to {signup ? "signup": "signin"}</Button>  
               </Grid>               
            </form >     
        </div>
        )
    }

