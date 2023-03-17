const userprofile = (props) => {
    const { userInfo, loggedIn, loginToggle } = props

    return (
        <>

            <h2 style={{ color: 'black' }}>Welcome {userInfo.username}</h2>
            <button onClick={loginToggle}>LOGOUT</button>
        </>
    )
}

export default userprofile