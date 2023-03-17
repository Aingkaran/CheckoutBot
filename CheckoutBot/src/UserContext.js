import { createContext } from 'react';

const UserContext = createContext({
    userInfo: {
        id: "",
        username: "",
        email: ""
    },
    loggedIn: false,
    setUserInfo: () => { },
    setLoggedIn: () => { }
});

export default UserContext;
