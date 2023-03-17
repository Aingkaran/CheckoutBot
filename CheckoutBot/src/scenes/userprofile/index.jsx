import UserContext from '../../UserContext';
import { useState, useContext } from "react";

const userprofile = (props) => {
    const { userInfo, setUserInfo, loggedIn, setLoggedIn } = useContext(UserContext);
    const { loginToggle } = props;
    return (
        <>

            <h2 style={{ color: 'black' }}>Welcome {userInfo.username}</h2>
            <button onClick={loginToggle}>LOGOUT</button>
        </>
    )
}

export default userprofile