import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { getTokenChallenge } from '../loginView/actions';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import { Link } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

import './loginView.css';

const LoginView = () => {
  const [showPasswordChallenge, setShowPasswordChallenge] = useState(false);
  const [userInformation, setUserInformation] = useState({ username: '', password: '' });

  const dispatch = useDispatch();
  const refChallenge = useRef(null);

  const tokenChallenge = useSelector(state => state.loginViewReducers.token)

  /* useEffect(() => {
   return () => {
    dispatch(clearToken())
   }
  }, []) */

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      refChallenge.current.click();
    }
  }, [tokenChallenge])

  const handleClickShowPassword = () => {
    setShowPasswordChallenge(!showPasswordChallenge);
  }

  const onChangeInputLogin = ({ target: { name, value } }) => {
    setUserInformation({ ...userInformation, [name]: value })
  }

  const getTokenUser = () => {
    dispatch(getTokenChallenge(userInformation))
  }

  return (
    <div className="containerLogin">
      <ToastContainer icon={false} />
      <div className="inputsLogin">
        <span className="fontStyleTitleLogin">Please enter your user name and password</span>
        <FormControl style={{ marginTop: '2rem', width: '60%' }} variant="outlined">
          <TextField name="username" value={userInformation.username} label='User' onChange={onChangeInputLogin} inputProps={{ "data-testid": "usernameTestLogin" }} />
        </FormControl>
        <FormControl style={{ marginTop: '2rem', width: '60%' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPasswordChallenge ? 'text' : 'password'}
            name="password"
            onChange={onChangeInputLogin}
            inputProps={{ "data-testid": "passwordLoginTest" }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  data-testid='iconShowPasswordLogin'
                  edge="end"
                >
                  {showPasswordChallenge ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <Button data-testid='buttonLogInView' onClick={getTokenUser} variant='contained' style={{ marginTop: '1rem' }}>Log in</Button>
      </div>
      <Link to='/menu' ref={refChallenge} style={{ display: 'none' }} />
    </div>
  );
};

export default LoginView;