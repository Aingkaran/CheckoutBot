import 'react-credit-cards-2/es/styles-compiled.css';
import React, { useState } from 'react';
import Cards from 'react-credit-cards-2';
import './style.css'
import { Container, Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const Billing = () => {

    const [state, setState] = useState({
        number: '',
        expiry: '',
        cvc: '',
        name: '',
        focus: '',
    });

    const handleInputChange = (evt) => {
        const { name, value } = evt.target;

        setState((prev) => ({ ...prev, [name]: value }));
    }

    const handleInputFocus = (evt) => {
        setState((prev) => ({ ...prev, focus: evt.target.name }));
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'cardName',
            headerName: 'Card Name',
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
        { id: 1, cardName: 'Visa', ownerName: 'Aingkaran Jegatheeswaran', cardLimit: '$2000' },
        { id: 2, cardName: 'Visa', ownerName: 'Aingkaran Jegatheeswaran', cardLimit: '$2000' },
        { id: 3, cardName: 'Visa', ownerName: 'Aingkaran Jegatheeswaran', cardLimit: '$2000' },
        { id: 4, cardName: 'Visa', ownerName: 'Aingkaran Jegatheeswaran', cardLimit: '$2000' },

    ];

    return (
        <Box

            sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: '5rem'
            }}>
            <Box className='billingLeftContainer'>
                <Cards
                    number={state.number}
                    expiry={state.expiry}
                    cvc={state.cvc}
                    name={state.name}
                    focused={state.focus}
                />
                <form>
                    <input
                        type="number"
                        name="number"
                        placeholder="Card Number"
                        value={state.number}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                    />

                </form>

            </Box>
            <div className="billingRightContainer" style={{ height: 350, width: '50%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
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
        </Box>

    )

}

export default Billing;