import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import * as routes from '../../routesChallenge/routes'
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import GenericTable from "../../baseComponents/genericTable";
import MultipleSelect from "../../baseComponents/multipleSelect";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import moment from "moment";
import { getTeamsLists, deleteTeams, saveNewTeam, updateTeam, clearStatusCodeTeam, clearTeamList, getUserByTeam, clearGetUserByTeam } from "../teamsAccounts/actions";
import { getUsersList, clearUserList } from "../usersView/actions";
import { getAccountsList, clearAccountList } from "../accountsView/actions";
import { showLoading } from "../../baseComponents/showLoading";
import { ToastContainer } from 'react-toastify';

import './teamsAccountsView.css'

const ROWS_TABLE_HEAD = [
    { field: 'team_name', headerName: 'Team name', flex: 1 },
    { field: 'account_name', headerName: 'Account', flex: 1 }
]

const TeamsAccountsViews = () => {

    const [teamsAccountsInformation, setTeamsAccountsInformation] = useState([]);
    const [openDialogTeams, setOpenDialogTeams] = useState(false);
    const [idsTeamsSelected, setIdsTeamsSelected] = useState([]);
    const [anchorMenuTeamAction, setAnchorMenuTeamAction] = useState();
    const [openTeamMenuAction, setOpenTeamMenuAction] = useState(false);
    const [teamAccountInformationToSave, setTeamAccountInformationToSave] = useState({ account: '', team_name: '', date_start: '', date_end: '', users: [] })
    const [arrayListUsers, setArrayListUsers] = useState([]);
    const [arrayAccountsList, setArrayAccountsList] = useState([]);
    const [updateTeamFlag, setUpdateTeamFlag] = useState(false);
    const [showLoadingTeams, setShowLoadingTeams] = useState(false);
    const [idTeamToUpdate, setIdTeamToUpdate] = useState(0);
    const [namesUsersSelected, setNamesUsersSelected] = useState([]);

    const dispatch = useDispatch();

    const teamsList = useSelector(state => state.teamsAccountsReducers.teamsInformationList);
    const usersTeam = useSelector(state => state.teamsAccountsReducers.usersByTeam);
    const statusCodeTeam = useSelector(state => state.teamsAccountsReducers.statusCodeTeamsAccount);
    const accountsList = useSelector(state => state.accountsViewReducers.accountsInformationList);
    const userList = useSelector(state => state.usersViewReducers.usersInformationList);

    useEffect(() => {
        dispatch(getTeamsLists())
        dispatch(getAccountsList())
        dispatch(getUsersList());
        return () => {
            dispatch(clearAccountList());
            dispatch(clearTeamList());
            dispatch(clearUserList());
            dispatch(clearStatusCodeTeam());
        }
    }, [])

    useEffect(() => {
        if (userList && userList.data && userList.data.length > 0) {
            let users = []
            userList.data.forEach((val) => {
                let user = {
                    id: val.id,
                    name: val.username
                }
                users.push(user)
            })
            setArrayListUsers(users)
        }
    }, [userList])

    useEffect(() => {
        const filterTeam = teamsAccountsInformation.filter((val) => { return val.id === idsTeamsSelected[0]; })

        let usersTeamArrayId = [];
        let usersTeamArrayNames = [];
        if (usersTeam && usersTeam.data && usersTeam.data.length > 0 && filterTeam.length > 0) {
            usersTeam.data.forEach((val) => {
                usersTeamArrayId.push(val.user.id)
                usersTeamArrayNames.push(val.user.username)
            })
            setOpenDialogTeams(true);
            setUpdateTeamFlag(true);
            setIdTeamToUpdate(filterTeam[0].id)
            setTeamAccountInformationToSave({
                account: filterTeam[0].account,
                team_name: filterTeam[0].team_name,
                date_start: filterTeam[0].date_start,
                date_end: filterTeam[0].date_end,
                users: usersTeamArrayId
            })
            setNamesUsersSelected(usersTeamArrayNames);
            setShowLoadingTeams(false);
        } else {
            if (filterTeam.length > 0) {
                setOpenDialogTeams(true);
                setUpdateTeamFlag(true);
                setIdTeamToUpdate(filterTeam[0].id)
                setTeamAccountInformationToSave({
                    account: filterTeam[0].account,
                    team_name: filterTeam[0].team_name,
                    date_start: filterTeam[0].date_start,
                    date_end: filterTeam[0].date_end,
                    users: []
                })
                setShowLoadingTeams(false);
            }
        }
    }, [usersTeam])

    useEffect(() => {
        if (accountsList && accountsList.data && accountsList.data.length > 0) {
            let accounts = []
            accountsList.data.forEach((val) => {
                let account = {
                    id: val.id,
                    name: val.account_name
                }
                accounts.push(account)
            })
            setArrayAccountsList(accounts)
        }
    }, [accountsList])

    useEffect(() => {
        if (teamsList && teamsList.data && teamsList.data.length) {
            let teams = [];
            teamsList.data.forEach((val) => {
                let team = {
                    id: val.id,
                    account: val.account.id,
                    account_name: val.account.account_name,
                    team_name: val.team_name,
                    date_start: val.date_start,
                    date_end: val.date_end
                }
                teams.push(team)
            })
            setTeamsAccountsInformation(teams);
        } else {
            setTeamsAccountsInformation([]);
        }
    }, [teamsList])

    useEffect(() => {
        if (statusCodeTeam >= 200 && statusCodeTeam <= 301) {
            setShowLoadingTeams(false)
            dispatch(getTeamsLists());
            setIdsTeamsSelected([]);
            setOpenTeamMenuAction(false);
            handleCloseDialogTeams();
            dispatch(clearStatusCodeTeam());
        } else {
            dispatch(clearStatusCodeTeam());
            setShowLoadingTeams(false);
        }
    }, [statusCodeTeam])

    const handleOpenDialogTeamsAccountToSave = () => {
        setOpenDialogTeams(true);
    }

    const openMenuTeamAccountAction = (event) => {
        setAnchorMenuTeamAction(event.currentTarget);
        setOpenTeamMenuAction(true);
    }

    const closeMenuTeamAccountAction = () => {
        setAnchorMenuTeamAction(null);
        setOpenTeamMenuAction(false);
    }

    const getWidthFromButtonActions = () => {
        if (document.getElementById('accountActionsButtons') && document.getElementById('accountActionsButtons').clientWidth) {
            return document.getElementById('accountActionsButtons').clientWidth;
        } else {
            return '0px'
        }
    }

    const openDialogToUpdateTeam = () => {
        setShowLoadingTeams(true);
        const filterTeam = teamsAccountsInformation.filter((val) => { return val.id === idsTeamsSelected[0]; })
        if (filterTeam && filterTeam.length > 0) {
            dispatch(getUserByTeam(filterTeam[0].id))
        }
    }

    const deleteTeamsAccount = () => {
        setShowLoadingTeams(true);
        dispatch(deleteTeams(idsTeamsSelected.join(','))).then(() => {
            dispatch(getTeamsLists()).then(() => {
                setShowLoadingTeams(false);
                setIdsTeamsSelected([]);
                setOpenTeamMenuAction(false)
            })
        })
    }

    const getTeamsSelected = (values) => {

        setIdsTeamsSelected(values);
    }

    const handleCloseDialogTeams = () => {
        setOpenDialogTeams(false);
        setUpdateTeamFlag(false)
        setIdTeamToUpdate(0);
        setTeamAccountInformationToSave({ account: '', date_end: '', date_start: '', team_name: '', users: [] })
        setNamesUsersSelected([]);
    }

    const handleChangeDialogTeam = ({ target: { name, value } }) => {
        setTeamAccountInformationToSave({ ...teamAccountInformationToSave, [name]: value })
    }

    const disabledTeamDialogFields = () => {
        let { account, team_name, date_start, date_end, users } = teamAccountInformationToSave;
        if (account !== '' && team_name !== '' && date_start !== '' & date_end !== '' && users.length > 0) return false;
        return true;
    }

    const saveNewUpdateTeam = () => {
        setShowLoadingTeams(true);
        if (updateTeamFlag) {
            dispatch(updateTeam(idTeamToUpdate, teamAccountInformationToSave))
        } else {
            dispatch(saveNewTeam(teamAccountInformationToSave))
        }
    }

    const getIdsUsersFromSelect = (values) => {
        let arraySelectedUsers = [];
        values.forEach((val) => {
            let userFilter = userList.data.filter((reg) => { return reg.username === val })
            if (userFilter && userFilter.length > 0) {
                arraySelectedUsers.push(userFilter[0].id)
            }
        })
        setNamesUsersSelected(values)
        setTeamAccountInformationToSave({ ...teamAccountInformationToSave, users: arraySelectedUsers })
    }

    return (
        <div className="containerTeamsAccounts">
            <ToastContainer icon={false} />
            {showLoading(showLoadingTeams)}
            <div className="formatTitleTeamsView">
                <Link to={routes.MENU_CHALLENGE}>
                    <IconButton>
                        <ArrowBackIcon fontSize='large' />
                    </IconButton>
                </Link>
                <div className="titleTeamsView">
                    <span>Teams accounts administration</span>
                </div>
            </div>
            <div className="findTeamsContainer">
                <div style={{ width: '50%', paddingLeft: '2rem' }}>
                    <TextField
                        style={{ width: '40%' }}
                        name="team"
                        label='Team'
                        placeholder="Find a team"
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
                <div style={{ width: '50%' }} className="containerButtonsTeamsActions">
                    <Button onClick={handleOpenDialogTeamsAccountToSave} variant="contained" style={{ height: '100%', marginRight: '2rem', backgroundColor: 'green' }}>
                        Add team
                    </Button>
                    <Button id="accountActionsButtons" onClick={openMenuTeamAccountAction} variant="contained" style={{ height: '100%', backgroundColor: 'green' }}>
                        Team actions
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorMenuTeamAction}
                        open={openTeamMenuAction}
                        onClose={closeMenuTeamAccountAction}
                    >
                        <MenuItem style={{ width: getWidthFromButtonActions() }} disabled={idsTeamsSelected && idsTeamsSelected.length === 1 ? false : true} onClick={openDialogToUpdateTeam}>Update team</MenuItem>
                        <MenuItem style={{ width: getWidthFromButtonActions() }} disabled={idsTeamsSelected && idsTeamsSelected.length > 0 ? false : true} onClick={deleteTeamsAccount}>Delete team(s)</MenuItem>
                    </Menu>
                </div>
            </div>
            <div style={{ marginTop: '3rem' }}>
                <GenericTable
                    columns={ROWS_TABLE_HEAD}
                    dataBody={teamsAccountsInformation}
                    getidsSelected={getTeamsSelected}
                    idsSelectedTable={idsTeamsSelected}
                />
            </div>
            <div className="containerDialogAccount">
                <Dialog
                    className="dialogAccount"
                    open={openDialogTeams}
                    onClose={handleCloseDialogTeams}
                    scroll={'paper'}
                    fullScreen={true}
                    aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description"
                >
                    <DialogTitle id="scroll-dialog-title">{updateTeamFlag ? 'Update team' : 'Add new team'}</DialogTitle>
                    <DialogContent style={{ width: '25rem' }}>
                        <div style={{ marginTop: '2rem' }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Account</InputLabel>
                                <Select
                                    name="account"
                                    value={teamAccountInformationToSave.account}
                                    label="Account"
                                    onChange={handleChangeDialogTeam}
                                    style={{ width: '100%' }}
                                >
                                    {
                                        arrayAccountsList.map((val, key) => (
                                            <MenuItem value={val.id} key={key}>
                                                {val.name}
                                            </MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                            <TextField
                                name='team_name'
                                style={{ width: '100%', marginTop: '2rem' }}
                                label="Team name"
                                value={teamAccountInformationToSave.team_name}
                                onChange={handleChangeDialogTeam}
                                variant="outlined"
                            />
                            <TextField
                                name='date_start'
                                type='date'
                                style={{ width: '100%', marginTop: '2rem' }}
                                label="Date start"
                                InputLabelProps={{ shrink: true }}
                                value={teamAccountInformationToSave.date_start}
                                onChange={handleChangeDialogTeam}
                                variant="outlined"
                            />
                            <TextField
                                name='date_end'
                                type='date'
                                style={{ width: '100%', marginTop: '2rem' }}
                                label="Date end"
                                InputLabelProps={{ shrink: true }}
                                value={teamAccountInformationToSave.date_end}
                                onChange={handleChangeDialogTeam}
                                variant="outlined"
                            />
                            <MultipleSelect
                                label={'Users'}
                                userNamesValues={namesUsersSelected}
                                arrayUsers={arrayListUsers}
                                handleChangeSelect={getIdsUsersFromSelect}
                            />
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialogTeams}>Cancel</Button>
                        <Button disabled={disabledTeamDialogFields()} onClick={saveNewUpdateTeam}>Save</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    )
};

export default TeamsAccountsViews;