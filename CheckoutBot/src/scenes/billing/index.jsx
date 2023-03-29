import 'react-credit-cards-2/es/styles-compiled.css';
import React, { useState } from 'react';
import Cards from 'react-credit-cards-2';
import './style.css'
import { Container, Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useForm } from "react-hook-form";
import { Input, TextField, Button, Snackbar, Alert } from '@mui/material';
import UserContext from '../../UserContext';
import { useContext, useEffect } from "react";

const Billing = (props) => {

    const { userInfo, setUserInfo, loggedIn, setLoggedIn } = useContext(UserContext);

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [creditCards, setCreditCards] = useState([]);
    const [selectedCards, setSelectedCards] = useState([])
    const [cardInfo, setCardInfo] = useState({
        customCardName: '',
        number: '',
        expiry: '',
        cvc: '',
        name: '',
        focus: '',
    });

    const resetForm = () => {
        setCardInfo({
            customCardName: '',
            number: '',
            expiry: '',
            cvc: '',
            name: '',
            focus: '',
        });
    };
    const maskCreditCard = (number, showDigits = 4) => {
        const length = number.length;
        const masked = number.slice(0, showDigits).padEnd(length, '*');
        return masked;
    };
    const fetchCreditCards = async () => {
        try {
            const response = await fetch(`http://localhost:5000/user/creditcard/${userInfo.id}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": localStorage.getItem("authToken")
                },
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error);
            }

            setCreditCards(data.creditCards);
            console.log(data.creditCards)
        } catch (error) {
            console.error("Error fetching credit cards:", error.message);
            setSnackbarMessage("Error fetching credit cards: " + error.message);
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
        }
    };

    const addCreditCard = async () => {
        resetForm()
        const requestNewCredit = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": localStorage.getItem("authToken")
            },
            body: JSON.stringify({
                "user_id": userInfo.id,
                "cardUsername": cardInfo.customCardName,
                "cardFullName": cardInfo.name,
                "cardNumber": cardInfo.number,
                "expiry": cardInfo.expiry,
                "cvs": cardInfo.cvc
            })

        };

        try {
            const response = await fetch("http://localhost:5000/user/creditcard", requestNewCredit);

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error);
            }
            fetchCreditCards()
            setSnackbarMessage("Card added successfully!");
            setSnackbarSeverity("success");
        } catch (error) {
            console.error("Error adding card:", error.message);
            setSnackbarMessage("Error adding card: " + error.message);
            setSnackbarSeverity("error");
        } finally {
            setSnackbarOpen(true);
        }
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbarOpen(false);
    };

    const handleInputChange = (evt) => {
        const { name, value } = evt.target;
        console.log(evt.target.value)

        setCardInfo((prev) => ({ ...prev, [name]: value }));
    }

    const handleInputFocus = (evt) => {
        setCardInfo((prev) => ({ ...prev, focus: evt.target.name }));
    }



    const deleteCardsFromBackend = async (uuids) => {
        console.log(uuids)
        try {
            const response = await fetch('http://localhost:5000/user/creditcard', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    "x-auth-token": localStorage.getItem("authToken"),
                },
                body: JSON.stringify({
                    user_id: userInfo.id,
                    uuids,
                }),
            });

            if (!response.ok) {
                throw new Error('Error deleting cards');
            }

            const result = await response.json();
            console.log(result);
            return result;

        } catch (error) {
            console.error('Error:', error);
        }
    };
    const deleteCards = async () => {
        console.log({ selectedCards })
        const uuidsToDelete = creditCards.filter(row => selectedCards.includes(row.id)).map(row => row.uuid);
        console.log({ uuidsToDelete })
        await deleteCardsFromBackend(uuidsToDelete);
        await fetchCreditCards();
        setSelectedCards([]);
    };
    const deleteAllCards = async () => {
        const uuidsToDelete = creditCards.map(card => card.uuid);
        await deleteCardsFromBackend(uuidsToDelete);
        await fetchCreditCards();
        setSelectedCards([]);
    }



    const columns = [
        { field: 'id', headerName: 'ID', width: 50 },
        {
            field: 'cardName',
            headerName: 'Card Name',
            width: 150,
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
        }

    ];
    const rows = creditCards.map((card, index) => ({
        id: card.id,
        cardName: card.card_username,
        cardNumber: maskCreditCard(card.card_number),
        ownerName: card.card_fullname,
        uuid: card.uuid
    }));

    useEffect(() => {
        fetchCreditCards();
    }, []);

    console.log(rows)

    return (
        <Box

            sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: '4rem'

            }} >
            <Box
                className='billingLeftContainer'
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    borderRight: 2,
                    height: '90vh',
                    borderColor: 'neutral.main',
                    paddingRight: "3rem"
                }}>

                <Cards
                    number={cardInfo.number}
                    expiry={cardInfo.expiry}
                    cvc={cardInfo.cvc}
                    name={cardInfo.name}
                    focused={cardInfo.focus}
                />
                <form onSubmit={handleSubmit(() => addCreditCard(cardInfo))}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.5rem",
                            mt: "1rem"

                        }}>
                        <TextField
                            type="text"
                            name="customCardName"
                            placeholder="Custom Name"
                            value={cardInfo.customCardName}
                            onChange={handleInputChange}
                            onFocus={handleInputFocus}
                            label="Custom Name"
                            variant="outlined"
                            id="outlined-basic"
                            required />
                        <TextField
                            type="number"
                            name="number"
                            placeholder="Card Number"
                            value={cardInfo.number}
                            onChange={handleInputChange}
                            onFocus={handleInputFocus}
                            label="Card Number"
                            variant="outlined"
                            id="outlined-basic"
                            required />
                        <TextField
                            type="name"
                            name="name"
                            placeholder="Full Name..."
                            value={cardInfo.name}
                            onChange={handleInputChange}
                            onFocus={handleInputFocus}
                            label="Full Name"
                            variant="outlined"
                            id="outlined-basic"
                            required
                        />
                        <TextField
                            type="expiry"
                            name="expiry"
                            placeholder="MM/YY"
                            value={cardInfo.expiry}
                            onChange={handleInputChange}
                            onFocus={handleInputFocus}
                            label="Expiry"
                            variant="outlined"
                            id="outlined-basic"
                            required
                        />
                        <TextField
                            type="cvc"
                            name="cvc"
                            placeholder="CVC"
                            value={cardInfo.cvc}
                            onChange={handleInputChange}
                            onFocus={handleInputFocus}
                            label="CVS"
                            variant="outlined"
                            id="outlined-basic"
                            required
                        />
                        <Button type="submit" size="large" variant="contained" color="primary">ADD CARD</Button>
                        <Snackbar
                            open={snackbarOpen}
                            autoHideDuration={5000}
                            onClose={handleSnackbarClose}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                        >
                            <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} variant="filled">
                                {snackbarMessage}
                            </Alert>
                        </Snackbar>

                    </Box>
                </form>


            </Box>
            <div className="billingRightContainer" style={{ height: '90vh', width: '100%', gap: "1rem" }}>
                <Box sx={{
                    display: "flex",
                    gap: "0.5rem"
                }}>
                    <Button onClick={deleteAllCards} size="medium" variant="contained" color="negative">Delete All</Button>
                    <Button onClick={deleteCards} size="medium" variant="contained" color="primary">Delete Card</Button>

                </Box>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    checkboxSelection
                    disableSelectionOnClick
                    experimentalFeatures={{ newEditingApi: true }}
                    onSelectionModelChange={(newSelection) => {
                        setSelectedCards(newSelection);
                    }}

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