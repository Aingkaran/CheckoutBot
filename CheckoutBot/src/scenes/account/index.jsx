import React, { useState } from 'react';
import './style.css'
import { Container, Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useForm } from "react-hook-form";
import { Input, TextField, Button, Typography } from '@mui/material';
import { BorderColor } from '@mui/icons-material';

const Account = () => {

    return (
        <Box sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",


        }}>
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
                    id="outlined-basic" />
                <TextField
                    type="password"
                    name="password"
                    placeholder="Password"
                    label="Password"
                    variant="outlined"
                    id="outlined-basic" />
                <Button size="large" variant="contained" color="primary">LOGIN</Button>

            </Box>

            <Box sx={{
                borderRight: 2,
                height: '75vh',
                borderColor: 'neutral.main'
            }}></Box>
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
                    id="outlined-basic" />
                <TextField
                    type="email"
                    name="email"
                    placeholder="email"
                    label="Email"
                    variant="outlined"
                    id="outlined-basic" />
                <TextField
                    type="password"
                    name="password"
                    placeholder="Password"
                    label="Password"
                    variant="outlined"
                    id="outlined-basic" />
                <Button size="large" variant="contained" color="primary">SIGN UP</Button>

            </Box>
        </Box>
    )

}

export default Account;