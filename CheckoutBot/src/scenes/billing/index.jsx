import 'react-credit-cards-2/es/styles-compiled.css';
import React, { useState } from 'react';
import Cards from 'react-credit-cards-2';
import './style.css'
import { Container, Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useForm } from "react-hook-form";
import { Input, TextField, Button } from '@mui/material';

const Billing = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);

    const [state, setState] = useState({
        number: '',
        expiry: '',
        cvc: '',
        name: '',
        focus: '',
    });

    const handleInputChange = (evt) => {
        const { name, value } = evt.target;
        console.log(evt.target)

        setState((prev) => ({ ...prev, [name]: value }));
    }

    const handleInputFocus = (evt) => {
        setState((prev) => ({ ...prev, focus: evt.target.name }));
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 50 },
        {
            field: 'cardName',
            headerName: 'Card Name',
            width: 100,
            editable: false,
        },
        {
            field: 'cardNumber',
            headerName: 'Card #',
            width: 150,
            editable: false,
        },

        {
            field: 'ownerName',
            headerName: 'Owner Name',
            width: 150,
            editable: false,
        },
        {
            field: 'cardLimit',
            headerName: 'Card Limit',
            width: 110,
            editable: true,
        }

    ];

    const rows = [
        { id: 1, cardName: 'Visa', cardNumber: "4326-8100-3242-3215", ownerName: 'Aingkaran Jegatheeswaran', cardLimit: '$2000' },
        { id: 2, cardName: 'Visa', cardNumber: "4326-8100-3242-3215", ownerName: 'Aingkaran Jegatheeswaran', cardLimit: '$2000' },
        { id: 3, cardName: 'Visa', cardNumber: "4326-8100-3242-3215", ownerName: 'Aingkaran Jegatheeswaran', cardLimit: '$2000' },
        { id: 4, cardName: 'Visa', cardNumber: "4326-8100-3242-3215", ownerName: 'Aingkaran Jegatheeswaran', cardLimit: '$2000' },
        { id: 5, cardName: 'Visa', cardNumber: "4326-8100-3242-3215", ownerName: 'Aingkaran Jegatheeswaran', cardLimit: '$2000' },
        { id: 6, cardName: 'Visa', cardNumber: "4326-8100-3242-3215", ownerName: 'Aingkaran Jegatheeswaran', cardLimit: '$2000' },
        { id: 7, cardName: 'Visa', cardNumber: "4326-8100-3242-3215", ownerName: 'Aingkaran Jegatheeswaran', cardLimit: '$2000' },
        { id: 8, cardName: 'Visa', cardNumber: "4326-8100-3242-3215", ownerName: 'Aingkaran Jegatheeswaran', cardLimit: '$2000' }
    ];

    return (
        <Box

            sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: '4rem'
            }}>
            <Box
                className='billingLeftContainer'
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}>

                <Cards
                    number={state.number}
                    expiry={state.expiry}
                    cvc={state.cvc}
                    name={state.name}
                    focused={state.focus}
                />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.5rem",
                            mt: "1rem"
                        }}>
                        <TextField
                            type="number"
                            name="number"
                            placeholder="Card Number"
                            value={state.number}
                            onChange={handleInputChange}
                            onFocus={handleInputFocus}
                            label="Card Number"
                            variant="outlined"
                            id="outlined-basic" />
                        <TextField
                            type="name"
                            name="name"
                            placeholder="Full Name..."
                            value={state.name}
                            onChange={handleInputChange}
                            onFocus={handleInputFocus}
                            label="Full Name"
                            variant="outlined"
                            id="outlined-basic"

                        />
                        <TextField
                            type="expiry"
                            name="expiry"
                            placeholder="MM/YY"
                            value={state.expiry}
                            onChange={handleInputChange}
                            onFocus={handleInputFocus}
                            label="Expiry"
                            variant="outlined"
                            id="outlined-basic"
                        />
                        <TextField
                            type="cvc"
                            name="cvc"
                            placeholder="CVC"
                            value={state.cvc}
                            onChange={handleInputChange}
                            onFocus={handleInputFocus}
                            label="CVS"
                            variant="outlined"
                            id="outlined-basic"
                        />
                        <Button size="large" variant="contained" color="primary">ADD CARD</Button>

                    </Box>
                </form>


            </Box>
            <div className="billingRightContainer" style={{ height: 350, width: '100%', gap: "1rem" }}>
                <Box sx={{
                    display: "flex",
                    gap: "0.5rem"
                }}>
                    <Button size="medium" variant="contained" color="negative">Delete All</Button>
                    <Button size="medium" variant="contained" color="primary">Delete Card</Button>

                </Box>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    checkboxSelection
                    autoHeight
                    disableSelectionOnClick
                    experimentalFeatures={{ newEditingApi: true }}
                    sx={{
                        boxShadow: 2,
                        color: 'black',
                        border: 2,
                        borderColor: 'black',

                    }}
                />
            </div>
        </Box >

    )

}

export default Billing;