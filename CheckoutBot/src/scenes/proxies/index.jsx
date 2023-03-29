import "./style.css"
import { Input, TextField, Button, Typography, Container, Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useState, useContext, useEffect } from 'react';
import UserContext from '../../UserContext';



const Proxies = () => {
    const [proxyString, setProxyString] = useState('');
    const { userInfo, setUserInfo, loggedIn, setLoggedIn } = useContext(UserContext);
    const [selectedProxies, setSelectedProxies] = useState([]);


    const responseTimeRenderer = (params) => {
        const responseTime = params.value;

        let color;
        if (responseTime < 100) {
            color = 'green';
        } else if (responseTime >= 100 && responseTime < 300) {
            color = 'lightgreen';
        } else if (responseTime >= 300 && responseTime < 600) {
            color = 'orange';
        } else if (responseTime >= 600 && responseTime < 3000) {
            color = 'red';
        } else {
            color = 'darkred';
        }

        return <div style={{ color: color, padding: '0.5rem' }}>{responseTime}</div>;
    };

    const columns = [
        { field: 'address', headerName: 'Address', minWidth: 150 },
        { field: 'port', headerName: 'Port', minWidth: 100 },
        { field: 'username', headerName: 'User', minWidth: 150 },
        { field: 'password', headerName: 'Password', minWidth: 150 },
        {
            field: 'responseTime',
            headerName: 'Response Time',
            minWidth: 150,
            renderCell: responseTimeRenderer,
        },
    ];




    const addProxies = async (proxies) => {
        try {
            const response = await fetch('http://localhost:5000/user/proxy', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "x-auth-token": localStorage.getItem("authToken")

                },
                body: JSON.stringify({
                    user_id: userInfo.id,
                    proxies,
                }),
            });

            if (!response.ok) {
                throw new Error('Error adding proxies');
            }

            const result = await response.json();
            console.log(result);
            return result

        } catch (error) {
            console.error('Error:', error);
        }
    };

    const [rows, setRows] = useState([]);
    const handleProxyStringChange = (event) => {
        setProxyString(event.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const proxyList = proxyString.split('\n').map((proxyString) => {
            const [address, port, username, password] = proxyString.split(':');
            return { address, port, username, password };
        });
        await addProxies(proxyList);
        await fetchProxies();

    };

    const fetchProxies = async () => {
        try {
            const response = await fetch(`http://localhost:5000/user/proxy/${userInfo.id}`, {
                method: 'GET',
                headers: {
                    "x-auth-token": localStorage.getItem("authToken")
                },
            });

            if (!response.ok) {
                throw new Error('Error fetching proxies');
            }

            const result = await response.json();
            console.log(result)
            setRows(result.proxies);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchProxies();
    }, []);



    const testProxy = async (proxy) => {
        try {
            const response = await fetch(`http://localhost:5000/user/proxytest/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": localStorage.getItem("authToken"),
                },
                body: JSON.stringify({ proxies: [proxy] }),
            });

            if (response.ok) {
                const result = await response.json();
                return result.results[0];
            } else {

                console.error("Error testing proxy:", response.status);
            }
        } catch (error) {
            if (error.message === "timeout") {
                return { status: "timeout" };
            }
            console.error("Error testing proxy:", error);
        }
        return null;
    };

    const testAllProxies = async () => {
        console.log("testing");

        for (const row of rows) {
            const proxy = { address: row.address, port: row.port, username: row.username, password: row.password };
            const proxyResult = await testProxy(proxy);

            if (proxyResult) {
                setRows((prevRows) =>
                    prevRows.map((r) => {
                        if (r.id === row.id) {
                            if (proxyResult.status === 'error' && proxyResult.error.message === 'Request timeout') {
                                return { ...r, responseTime: "TOO SLOW" };
                            }
                            return { ...r, responseTime: proxyResult.responseTime };
                        }
                        return r;
                    })
                );
            }
        }
    };
    const deleteProxiesFromBackend = async (uuids) => {
        try {
            const response = await fetch('http://localhost:5000/user/proxy', {
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
                throw new Error('Error deleting proxies');
            }

            const result = await response.json();
            console.log(result);
            return result;

        } catch (error) {
            console.error('Error:', error);
        }
    };
    const deleteProxies = async () => {
        const uuidsToDelete = rows.filter(row => selectedProxies.includes(row.id)).map(row => row.uuid);
        await deleteProxiesFromBackend(uuidsToDelete);
        await fetchProxies();
        setSelectedProxies([]); // Clear the selection
    }


    return (
        <>
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


                    <form >
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "0.5rem",
                                mt: "1rem",

                                width: '25vw'

                            }}>
                            <Typography variant='h5' sx={{ color: 'black' }}>Proxy Table</Typography >
                            <TextField
                                label="Enter proxies"
                                multiline
                                rows={10}
                                fullWidth
                                value={proxyString}
                                onChange={handleProxyStringChange}
                            />

                            <Button onClick={handleSubmit} type="submit" size="large" variant="contained" color="primary">ADD PROXIES</Button>

                        </Box>
                    </form>
                </Box>
                <div className="billingRightContainer" style={{ height: '90vh', width: '100%', gap: "1rem" }}>
                    <Box sx={{
                        display: "flex",
                        gap: "0.5rem"
                    }}>
                        <Button onClick={testAllProxies} size="medium" variant="contained" color="negative">Test All</Button>
                        <Button onClick={deleteProxies} size="medium" variant="contained" color="primary">Delete Proxy</Button>


                    </Box>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        checkboxSelection
                        disableSelectionOnClick
                        experimentalFeatures={{ newEditingApi: true }}
                        onSelectionModelChange={(newSelection) => setSelectedProxies(newSelection)}

                        sx={{
                            boxShadow: 2,
                            color: 'black',
                            border: 2,
                            borderColor: 'black',

                        }}
                    />
                </div>
            </Box >

        </>
    )

}

export default Proxies;