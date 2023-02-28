import { useState } from "react"
import { ProSidebarProvider } from 'react-pro-sidebar';
import { Box, IconButton, Typography, useTheme } from '@mui/material'
import { Link } from "react-router-dom";
import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar } from 'react-pro-sidebar';
import "./style.css";
import MenuIcon from '@mui/icons-material/Menu';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import HttpIcon from '@mui/icons-material/Http';
import AssignmentIcon from '@mui/icons-material/Assignment';

const SidebarGlobal = () => {
    const { collapseSidebar, toggleSidebar, collapsed, toggled, broken, rtl } = useProSidebar();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("Dashboard")
    return (
        <Box
            sx={{
                backgroundColor: 'blacks',
            }}
        >
            <div style={{ display: 'flex', height: '100%' }} >

                <Sidebar style={{ height: "100vh" }} backgroundColor="#009788">
                    <Menu >
                        <MenuItem
                            title="Tasks"
                            icon={<MenuIcon
                                onClick={() => {
                                    collapseSidebar()
                                    setIsCollapsed(!isCollapsed)
                                    console.log(isCollapsed)
                                }} />}
                            component={<Link to="/" />}
                            style={{
                                margin: "10px 0 20px 0",

                            }}
                        >
                            {!isCollapsed && (
                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    ml="15px"
                                >

                                </Box>
                            )}

                            {!isCollapsed && (<h1>Ultimate ShotBOT</h1>)}
                        </MenuItem>

                        <Box paddingLeft={isCollapsed ? undefined : "5%"}>
                            <MenuItem title="Tasks" icon={<AssignmentIcon />} component={<Link to="/" />}> {!isCollapsed && (<h1>Tasks</h1>)} </MenuItem>
                            <MenuItem icon={<HttpIcon />} component={<Link to="/proxies" />}>  {!isCollapsed && (<h1>Proxie</h1>)} </MenuItem>
                            <MenuItem icon={<MonetizationOnIcon />} component={<Link to="/billing" />}> {!isCollapsed && (<h1>Billing</h1>)} </MenuItem>
                        </Box>
                    </Menu>
                    <main>


                    </main>
                </Sidebar>
            </div>
        </Box>
    )

}

export default SidebarGlobal;