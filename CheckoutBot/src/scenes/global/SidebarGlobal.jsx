import { useState } from "react"
import { ProSidebarProvider } from 'react-pro-sidebar';
import { Box, IconButton, Typography, useTheme } from '@mui/material'
import { Link } from "react-router-dom";
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';


const SidebarGlobal = () => {
    const { collapseSidebar, toggleSidebar, collapsed, toggled, broken, rtl } = useProSidebar();


    return (
        <div style={{ display: 'flex', height: '100%' }} >
            <Sidebar>
                <Menu>
                    <MenuItem component={<Link to="/" />}> Tasks </MenuItem>
                    <MenuItem component={<Link to="/proxies" />}> Proxies </MenuItem>
                    <MenuItem component={<Link to="/billing" />}> Billing </MenuItem>
                </Menu>
                <main>
                    <button onClick={() => collapseSidebar()}>Collapse</button>
                </main>
            </Sidebar>
        </div>
    )

}

export default Sidebar;