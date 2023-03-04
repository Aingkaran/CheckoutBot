import React, { useState } from 'react';
import './style.css'
import { Container, Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useForm } from "react-hook-form";
import { Input, TextField, Button, Typography } from '@mui/material';

const Account = () => {

    return (
        <Box sx={{
            display: "flex",

        }}>
            <Box sx={{
                display: "flex",
                flexDirection: "column"
            }}>
                <Typography variant="h5" color="black">SIGN IN</Typography>

            </Box>
            <Box>

            </Box>
        </Box>
    )

}

export default Account;