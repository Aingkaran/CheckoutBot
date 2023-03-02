import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, IconButton, Typography, useTheme, Button, TextField } from '@mui/material'
import "./style.css"
import SearchIcon from '@mui/icons-material/Search';
import Search from '@mui/icons-material/Search';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
const Tasks = () => {
    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'site',
            headerName: 'Site',
            width: 150,
            editable: false,
        },
        {
            field: 'sizes',
            headerName: 'Size',
            width: 150,
            editable: false,
        },
        {
            field: 'proxy',
            headerName: 'Proxy List',
            width: 110,
            editable: true,
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 110,

        },
        {
            field: 'action',
            headerName: 'Action',
            width: 80,
            renderCell: (cellValues) => {
                return (
                    <div>
                        <PlayCircleFilledIcon className="actionButton" style={{ color: '#009788' }} onClick={() => console.log("works")} />
                        <EditIcon className="actionButton" style={{ color: 'black' }} />
                        <DeleteIcon className="actionButton" style={{ color: 'red' }} />
                    </div>

                )
            }
        },
        // {
        //     field: 'fullName',
        //     headerName: 'Full name',
        //     description: 'This column has a value getter and is not sortable.',
        //     sortable: false,
        //     width: 160,
        //     valueGetter: (params) =>
        //         `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        // },
    ];

    const rows = [
        { id: 1, site: 'Footlocker', sizes: '9.0', proxy: 'smartProxy', status: 'In Progress' },
        { id: 2, site: 'Footlocker', sizes: '9.0', proxy: 'smartProxy', status: 'In Progress' },
        { id: 3, site: 'Footlocker', sizes: '9.0', proxy: 'smartProxy', status: 'In Progress' },
        { id: 4, site: 'Footlocker', sizes: '9.0', proxy: 'smartProxy', status: 'In Progress' },
        { id: 5, site: 'Footlocker', sizes: '9.0', proxy: 'smartProxy', status: 'In Progress' },
        { id: 6, site: 'Footlocker', sizes: '9.0', proxy: 'smartProxy', status: 'In Progress' },
        { id: 7, site: 'Footlocker', sizes: '9.0', proxy: 'smartProxy', status: 'In Progress' },
        { id: 8, site: 'Footlocker', sizes: '9.0', proxy: 'smartProxy', status: 'In Progress' },
        { id: 9, site: 'Footlocker', sizes: '9.0', proxy: 'smartProxy', status: 'In Progress' },
    ];


    return (
        <div className="task-container">
            <div className="topRow">
                <div className="topRow-leftSide">
                    <Button size="small" variant="contained" style={{ backgroundColor: '#009788' }}>New Task</Button>
                    <Button size="small" variant="contained" style={{ backgroundColor: 'red' }}>Clear Selected</Button>
                </div>
                <div className="topRow-rightSide">
                    <Button size="small" variant="contained" style={{ backgroundColor: 'grey' }}>Import</Button>
                    <Button size="small" variant="contained" style={{ backgroundColor: 'grey' }}>Export</Button>
                </div>
            </div>
            <div className="middleRow">
                <div className="middleRow-leftSide">
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <Search style={{ color: "black" }} />
                        <input style={{ width: "25vw" }} />
                    </div>

                </div>
                <div className="middleRow-rightSide">
                    <Button size="small" variant="contained" style={{ backgroundColor: 'grey' }}>Edit All</Button>
                    <Button size="small" variant="contained" style={{ backgroundColor: 'red' }}>Stop All</Button>
                    <Button size="small" variant="contained" style={{ backgroundColor: '#009788' }}>Start All</Button>
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

                    }}
                />
            </Box>


        </div >

    )

}

export default Tasks;