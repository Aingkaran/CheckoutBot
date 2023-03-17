import React, { useState } from 'react';
import './style.css'
import { Container, Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useForm } from "react-hook-form";
import { Input, TextField, Button, Typography } from '@mui/material';
import { BorderColor } from '@mui/icons-material';
import UserProfile from '../userprofile';
import UserContext from '../../UserContext';
import { useContext } from "react";


const Account = (props) => {
    const [loginValues, setLoginValues] = useState({ email: "", password: "" });
    const [registerValues, setRegisterValues] = useState({ username: "", email: "", phonenumber: "", password: "" });
    const [loginError, setLoginError] = useState({ visible: false, message: "" });
    const { userInfo, setUserInfo, loggedIn, setLoggedIn } = useContext(UserContext);

    const [userID, setUserID] = useState()
    const [registerConfirmation, setRegisterConfirmation] = useState({ visible: false, message: "" });


    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginValues((prevValues) => ({
            ...prevValues,
            [name]: value
        }));
    };

    const handleRegisterChange = (e) => {
        const { name, value } = e.target;
        setRegisterValues((prevValues) => ({
            ...prevValues,
            [name]: value
        }));
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        // handle login form submission
        console.log(loginValues);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "email": loginValues.email,
                "password": loginValues.password
            })
        };

        try {
            const response = await fetch('http://localhost:5000/user/login', requestOptions);
            const data = await response.json();
            if (response.ok) {
                setUserInfo({
                    id: data.user_id,
                    username: data.username,
                    email: data.email
                })
                localStorage.setItem("authToken", data.token);
                console.log(data);
                setLoggedIn(true);
                setLoginError({ visible: false, message: "" });
            } else {
                setLoginError({ visible: true, message: "Invalid email or password." });
            }
        } catch (error) {
            console.error(error);
        }
    };
    const resetRegisterForm = () => {
        setRegisterValues({ username: "", email: "", phonenumber: "", password: "" });
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        console.log(registerValues);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "email": registerValues.email,
                "name": registerValues.username,
                "phonenumber": registerValues.phonenumber,
                "password": registerValues.password
            })
        };

        try {
            const response = await fetch('http://localhost:5000/user/register', requestOptions);
            const data = await response.json();

            if (response.ok) {
                console.log(data);
                setRegisterConfirmation({ visible: true, message: "Registration successful!" });
                resetRegisterForm();
            }
            else {
                setRegisterConfirmation({ visible: true, message: data.error });

            }

        } catch (error) {
            setRegisterConfirmation({ visible: true, message: "Registration failed. Please try again." });
            console.error(error);
        }
    };

    const loginToggle = () => {
        setLoggedIn(!loggedIn)
        localStorage.removeItem("authToken");

    }

    return (
        <>
            {loggedIn ? (<UserProfile userInfo={userInfo} loggedIn={loggedIn} loginToggle={loginToggle} />) : null}
            {!loggedIn ? (
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",


                }}>
                    <form onSubmit={handleLoginSubmit}>
                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.6rem",
                            alignItems: "center",

                        }}>
                            <Typography variant="h5" color="black">SIGN IN</Typography>
                            <TextField
                                type="email"
                                name="email"
                                placeholder="email"
                                label="Email"
                                variant="outlined"
                                id="outlined-basic"
                                value={loginValues.email}
                                onChange={handleLoginChange} />
                            <TextField
                                type="password"
                                name="password"
                                placeholder="Password"
                                label="Password"
                                variant="outlined"
                                id="outlined-basic"
                                value={loginValues.password}
                                onChange={handleLoginChange} />
                            <Button type="submit" size="large" variant="contained" color="primary">LOGIN</Button>
                            <Typography variant="subtitle1" color="error.main" textAlign="center" mt={1}>
                                {loginError.message}
                            </Typography>

                        </Box>
                    </form>
                    <Box sx={{
                        borderRight: 2,
                        height: '75vh',
                        borderColor: 'neutral.main'
                    }}></Box>
                    <form onSubmit={handleRegisterSubmit}>

                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.6rem",
                            alignItems: "center"
                        }}>
                            <Typography variant="h5" color="black">REGISTER</Typography>
                            <TextField
                                type="username"
                                name="username"
                                placeholder="Username"
                                label="Username"
                                variant="outlined"
                                id="outlined-basic"
                                value={registerValues.username}
                                onChange={handleRegisterChange} />
                            <TextField
                                type="email"
                                name="email"
                                placeholder="email"
                                label="Email"
                                variant="outlined"
                                id="outlined-basic"
                                value={registerValues.email}
                                onChange={handleRegisterChange} />

                            <TextField
                                type="phonenumber"
                                name="phonenumber"
                                placeholder="Phone Number..."
                                label="Phone Number"
                                variant="outlined"
                                id="outlined-basic"
                                value={registerValues.phonenumber}
                                onChange={handleRegisterChange} />
                            <TextField
                                type="password"
                                name="password"
                                placeholder="Password"
                                label="Password"
                                variant="outlined"
                                id="outlined-basic"
                                value={registerValues.password}
                                onChange={handleRegisterChange} />
                            <Button type="submit" size="large" variant="contained" color="primary">SIGN UP</Button>
                            {registerConfirmation.visible && (
                                <Typography variant="subtitle1" color="success.main" textAlign="center" mt={1}>
                                    {registerConfirmation.message}
                                </Typography>
                            )}
                        </Box>
                    </form>

                </Box>) : null}
        </>
    )

}

export default Account;