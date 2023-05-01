import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import * as routes from '../../routesChallenge/routes'
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import SearchIcon from '@mui/icons-material/Search';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import GenericTable from "../../baseComponents/genericTable";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { showLoading } from "../../baseComponents/showLoading";
import { getUsersList, clearUserList, saveUser, clearStatusSaveUser, updateUser, deleteUsers } from "../usersView/actions";
import { ToastContainer } from 'react-toastify';


import './usersView.css'

const ROWS_TABLE_HEAD = [
    { field: 'username', headerName: 'User name', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
]

const UsersView = () => {

    const [usersInformation, setUsersInformation] = useState([]);
    const [openDialogUser, setOpenDialogUser] = useState(false);
    const [idsUsersSelected, setIdsUsersSelected] = useState([]);
    const [anchorMenuUserAction, setAnchorMenuUserAction] = useState();
    const [openUserMenuAction, setOpenUserMenuAction] = useState(false);
    const [userInformationToSave, setUserInformationToSave] = useState({ username: '', password: '', email: '', englishLevel: '', linkCv: '' })
    const [updateUserFlag, setUpdateUserFlag] = useState(false);
    const [showPasswordUser, setShowPasswordUser] = useState(false);
    const [showLoadingUser, setShowLoadingUser] = useState(false);
    const [idUserToUpdate, setIdUserToUpdate] = useState(0);

    const dispatch = useDispatch();

    const userList = useSelector(state => state.usersViewReducers.usersInformationList);
    const statusSaveUser = useSelector(state => state.usersViewReducers.statusCodeSaveUser);

    useEffect(() => {
        dispatch(getUsersList())
        return () => {
            dispatch(clearUserList())
            dispatch(clearStatusSaveUser())
        }
    }, [])

    useEffect(() => {
        if (userList && userList.data && userList.data.length > 0) {
            setUsersInformation(userList.data)
        }
    }, [userList])

    useEffect(() => {
        if (statusSaveUser >= 200 && statusSaveUser <= 301) {
            setShowLoadingUser(false)
            dispatch(getUsersList());
            dispatch(clearStatusSaveUser());
            setIdsUsersSelected([]);
            setOpenUserMenuAction(false);
            handleCloseDialogUser();
        } else {
            dispatch(clearStatusSaveUser())
            setShowLoadingUser(false);
        }
    }, [statusSaveUser])

    const getUsersSelected = (values) => {
        setIdsUsersSelected(values);
    }

    const getWidthFromButtonActions = () => {
        if (document.getElementById('usertActionsButtons') && document.getElementById('usertActionsButtons').clientWidth) {
            return document.getElementById('usertActionsButtons').clientWidth;
        } else {
            return '0px'
        }
    }

    const closeMenuUsersAction = () => {
        setAnchorMenuUserAction(null);
        setOpenUserMenuAction(false);
    }

    const openMenuUserAction = (event) => {
        setAnchorMenuUserAction(event.currentTarget);
        setOpenUserMenuAction(true);
    }

    const handleCloseDialogUser = () => {
        setOpenDialogUser(false);
        setUpdateUserFlag(false)
        setIdUserToUpdate(0);
        setUserInformationToSave({ username: '', password: '', email: '' })
    }

    const handleChangeDialogUser = ({ target: { name, value } }) => {
        setUserInformationToSave({ ...userInformationToSave, [name]: value })
    }

    const handleClickShowPassword = () => {
        setShowPasswordUser(!showPasswordUser);
    }

    const handleOpenDialogUserToSave = () => {
        setOpenDialogUser(true);
    }

    const disabledSaveNewUserButtonDialog = () => {
        let { username, email, password } = userInformationToSave
        if (username !== '' && email !== '' && password !== '') {
            return false
        }
        return true
    }

    const disabledSaveUpdateUserButtonDialog = () => {
        let { username, email } = userInformationToSave
        if (username !== '' && email !== '') {
            return false
        }
        return true
    }

    const openDialogToUpdataUser = () => {
        const filterUser = userList.data.filter((val) => { return val.id === idsUsersSelected[0]; })
        if (filterUser && filterUser.length > 0) {
            setOpenDialogUser(true);
            setUpdateUserFlag(true);
            setIdUserToUpdate(filterUser[0].id)
            setUserInformationToSave({
                ...userInformationToSave,
                username: filterUser[0].username,
                email: filterUser[0].email
            })
        }
    }

    const saveNewUpdateUser = () => {
        setShowLoadingUser(true);
        if (updateUserFlag) {
            dispatch(updateUser(idUserToUpdate, userInformationToSave))
        } else {
            dispatch(saveUser(userInformationToSave));
        }
    }

    const deleteUsersList = () => {
        setShowLoadingUser(true);
        dispatch(deleteUsers(idsUsersSelected.join(','))).then(() => {
            dispatch(getUsersList()).then(() => {
                setShowLoadingUser(false);
                setIdsUsersSelected([]);
                setOpenUserMenuAction(false);
            })
        })
    }

    return (
        <div className="containerUsers">
            <ToastContainer icon={false} />
            {showLoading(showLoadingUser)}
            <div className="containerTittleButton">
                <div className="formatTitle">
                    <Link to={routes.MENU_CHALLENGE}>
                        <IconButton>
                            <ArrowBackIcon fontSize='large' />
                        </IconButton>
                    </Link>
                    <div className="titleUsersView">
                        <span>Users administration</span>
                    </div>
                </div>
            </div>
            <div className="findUsersField">
                <div style={{ width: '50%', paddingLeft: '2rem' }}>
                    <TextField
                        style={{ width: '40%' }}
                        name="username"
                        label='User'
                        placeholder="Find a user"
                        disabled
                        onChange={() => { }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </div>
                <div style={{ width: '50%' }} className="containerButtonsUsersActions">
                    <Button data-testid="userOpenDialogNew" onClick={handleOpenDialogUserToSave} variant="contained" style={{ height: '100%', marginRight: '2rem', backgroundColor: 'green' }}>
                        Add user
                    </Button>
                    <Button id="usertActionsButtons" data-testid="usertActionsButtons" onClick={openMenuUserAction} variant="contained" style={{ height: '100%', backgroundColor: 'green' }}>
                        User actions
                    </Button>
                    <Menu
                        data-testid="menuUsersViewActions"
                        anchorEl={anchorMenuUserAction}
                        open={openUserMenuAction}
                        onClose={closeMenuUsersAction}
                    >
                        <MenuItem data-testid='menuUpdateUser' style={{ width: getWidthFromButtonActions() }} disabled={idsUsersSelected && idsUsersSelected.length === 1 ? false : true} onClick={openDialogToUpdataUser}>Update user</MenuItem>
                        <MenuItem data-testid='menuDeleteUser' style={{ width: getWidthFromButtonActions() }} disabled={idsUsersSelected && idsUsersSelected.length > 0 ? false : true} onClick={deleteUsersList}>Delete user(s)</MenuItem>
                    </Menu>
                </div>
            </div>
            <div className="tableStyle">
                <GenericTable
                    columns={ROWS_TABLE_HEAD}
                    dataBody={usersInformation}
                    getidsSelected={getUsersSelected}
                    idsSelectedTable={idsUsersSelected}
                />
            </div>
            <div className="containerDialog">
                <Dialog
                    className="dialogUser"
                    open={openDialogUser}
                    onClose={handleCloseDialogUser}
                    scroll={'paper'}
                    fullScreen={true}
                    aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description"
                >
                    <DialogTitle id="scroll-dialog-title">{updateUserFlag ? 'Update the user' : 'Add new user'}</DialogTitle>
                    <DialogContent style={{ width: '25rem' }}>
                        <div style={{ marginTop: '2rem' }}>
                            <TextField
                                name='username'
                                style={{ width: '100%' }}
                                label="User name"
                                inputProps={{ "data-testid": "usernameTest" }}
                                value={userInformationToSave.username}
                                onChange={handleChangeDialogUser}
                                variant="outlined"
                            />
                            {!updateUserFlag ?
                                <FormControl style={{ marginTop: '2rem', width: '100%' }} variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={showPasswordUser ? 'text' : 'password'}
                                        name="password"
                                        onChange={handleChangeDialogUser}
                                        inputProps={{ "data-testid": "inputPasswordUser" }}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    data-testid='iconShowPassword'
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    edge="end"
                                                >
                                                    {showPasswordUser ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Password"
                                    />
                                </FormControl>
                                :
                                <div />
                            }
                            <TextField
                                name='email'
                                style={{ width: '100%', marginTop: '2rem' }}
                                label="Email"
                                value={userInformationToSave.email}
                                onChange={handleChangeDialogUser}
                                inputProps={{ "data-testid": "emailUserTest" }}
                                variant="outlined"
                            />
                            <TextField
                                name='englishLevel'
                                style={{ width: '100%', marginTop: '2rem' }}
                                label="English level"
                                value={userInformationToSave.englishLevel}
                                onChange={handleChangeDialogUser}
                                variant="outlined"
                                disabled
                            />
                            <TextField
                                name='linkCv'
                                style={{ width: '100%', marginTop: '2rem' }}
                                label="Link resume"
                                value={userInformationToSave.linkCv}
                                onChange={handleChangeDialogUser}
                                variant="outlined"
                                disabled
                            />
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button id='buttonCancelDialogUser' onClick={handleCloseDialogUser}>Cancel</Button>
                        <Button id='buttonSaveDialogUser' disabled={!updateUserFlag ? disabledSaveNewUserButtonDialog() : disabledSaveUpdateUserButtonDialog()} onClick={saveNewUpdateUser}>Save</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    )
};

export default UsersView;