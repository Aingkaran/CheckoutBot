import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, IconButton, Typography, useTheme, Button, TextField } from '@mui/material'
import "./style.css"
import SearchIcon from '@mui/icons-material/Search';
import Search from '@mui/icons-material/Search';

const Tasks = () => {
    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'firstName',
            headerName: 'First name',
            width: 150,
            editable: true,
        },
        {
            field: 'lastName',
            headerName: 'Last name',
            width: 150,
            editable: true,
        },
        {
            field: 'age',
            headerName: 'Age',
            type: 'number',
            width: 110,
            editable: true,
        },
        {
            field: 'fullName',
            headerName: 'Full name',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 160,
            valueGetter: (params) =>
                `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        },
    ];

    const rows = [
        { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
        { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
        { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    ];


    return (
        <div class="task-container">
            <div class="topRow">
                <div class="topRow-leftSide">
                    <Button size="small" variant="contained">Task Creator +</Button>
                    <Button size="small" variant="contained">Clear All Tasks -</Button>
                </div>
                <div class="topRow-rightSide">
                    <Button size="small" variant="contained">Import</Button>
                    <Button size="small" variant="contained">Export</Button>
                </div>
            </div>
            <div class="middleRow">
                <div class="middleRow-leftSide">
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <Search style={{ color: "black" }} />
                        <input style={{ width: "25vw" }} />
                    </div>

                </div>
                <div class="middleRow-rightSide">
                    <Button size="small" variant="contained" >Edit All</Button>
                    <Button size="small" variant="contained">Stop All</Button>
                    <Button size="small" variant="contained">Start All</Button>
                </div>
            </div>

            <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    disableSelectionOnClick
                    experimentalFeatures={{ newEditingApi: true }}
                    sx={{
                        boxShadow: 2,
                        color: 'black',
                        border: 2,
                        borderColor: 'black',
                        '& .MuiDataGrid-cell:hover': {
                            color: 'white',
                        },
                    }}
                />
            </Box>


        </div >

    )

}

export default Tasks;