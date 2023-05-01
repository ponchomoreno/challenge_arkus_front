import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CatchingPokemonOutlinedIcon from '@mui/icons-material/CatchingPokemonOutlined';

import { Link } from "react-router-dom";
import { clearToken } from "../challenge_arkus/loginView/actions";


const AppBarChallenge = () => {

    const [validToken, setValidToken] = useState(false);
    const tokenChallenge = useSelector(state => state.loginViewReducers.token)

    const refAppBar = useRef(null)

    const logOutFromChallenge = () => {
        clearToken();
        sessionStorage.clear();
        refAppBar.current.click();
        setValidToken(false)
    }

    useEffect(() => {
        if(sessionStorage.getItem('token') || tokenChallenge !== ''){
            setValidToken(true)
        }
    },[])

    useEffect(() => {
        if (tokenChallenge !== '') {
            setValidToken(true);
        }
    }, [tokenChallenge])

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <CatchingPokemonOutlinedIcon fontSize="large" />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Arkus Challenge
                    </Typography>
                    {validToken ? <Button onClick={logOutFromChallenge} color="inherit">Log out</Button> : <div />}
                </Toolbar>
            </AppBar>
            <Link to='/login' ref={refAppBar} style={{ display: 'none' }} />
        </Box>
    )
}

export default AppBarChallenge;