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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { getAccountsList, clearAccountList, clearStatusCodeAccount, saveNewAccount, updateAccount, deleteAccounts } from "../accountsView/actions";
import { showLoading } from "../../baseComponents/showLoading";
import { ToastContainer } from 'react-toastify';

import './accountsView.css';

const ROWS_TABLE_HEAD = [
    { field: 'account_name', headerName: 'Account name', flex: 1 },
    { field: 'customer_name', headerName: 'Customer name', flex: 1 },
    { field: 'account_manager_name', headerName: 'Account manager', flex: 1 }
]

const AccountsView = () => {

    const [accountsInformation, setAccountInformation] = useState([]);
    const [openDialogAccount, setOpenDialogAccount] = useState(false);
    const [idsAccountsSelected, setIdsAccountsSelected] = useState([]);
    const [anchorMenuAccountAction, setAnchorMenuAccountAction] = useState();
    const [openAccountMenuAction, setOpenAccountMenuAction] = useState(false);
    const [accountInformationToSave, setAccountInformationToSave] = useState({ account_name: '', customer_name: '', account_manager_name: '' })
    const [updateAccountFlag, setUpdateAccountFlag] = useState(false);
    const [showLoadingAccount, setShowLoadingAccount] = useState(false);
    const [idAccountToUpdate, setIdAccountToUpdate] = useState(0);

    const dispatch = useDispatch();

    const accountsList = useSelector(state => state.accountsViewReducers.accountsInformationList);
    const statusSaveCodeAccount = useSelector(state => state.accountsViewReducers.statusCodeAccount);

    useEffect(() => {
        dispatch(getAccountsList())

        return () => {
            dispatch(clearStatusCodeAccount())
            dispatch(clearAccountList())
        }
    }, [])

    useEffect(() => {
        if (accountsList && accountsList.data && accountsList.data.length > 0) {
            setAccountInformation(accountsList.data)
        }
    }, [accountsList])

    useEffect(() => {
        if (statusSaveCodeAccount >= 200 && statusSaveCodeAccount <= 301) {
            setShowLoadingAccount(false)
            dispatch(getAccountsList()).then(() => {
                dispatch(clearStatusCodeAccount());
            })
            setIdsAccountsSelected([]);
            setOpenAccountMenuAction(false);
            handleCloseDialogAccount();
        } else {
            dispatch(clearStatusCodeAccount())
            setShowLoadingAccount(false);
        }
    }, [statusSaveCodeAccount])

    const handleOpenDialogAccountToSave = () => {
        setOpenDialogAccount(true);
    }

    const openMenuAccountAction = (event) => {
        setAnchorMenuAccountAction(event.currentTarget);
        setOpenAccountMenuAction(true);
    }

    const closeMenuAccountAction = () => {
        setAnchorMenuAccountAction(null);
        setOpenAccountMenuAction(false);
    }

    const getWidthFromButtonActions = () => {
        if (document.getElementById('accountActionsButtons') && document.getElementById('accountActionsButtons').clientWidth) {
            return document.getElementById('accountActionsButtons').clientWidth;
        } else {
            return '0px'
        }
    }


    const openDialogToUpdataAccount = () => {
        const filterAccount = accountsList.data.filter((val) => { return val.id === idsAccountsSelected[0]; })
        if (filterAccount && filterAccount.length > 0) {
            setOpenDialogAccount(true);
            setUpdateAccountFlag(true);
            setIdAccountToUpdate(filterAccount[0].id)
            setAccountInformationToSave({
                account_name: filterAccount[0].account_name,
                customer_name: filterAccount[0].customer_name,
                account_manager_name: filterAccount[0].account_manager_name
            })
        }
    }

    const getAccountsSelected = (values) => {
        setIdsAccountsSelected(values);
    }

    const handleCloseDialogAccount = () => {
        setOpenDialogAccount(false);
        setUpdateAccountFlag(false)
        setIdAccountToUpdate(0);
        setAccountInformationToSave({ account_name: '', customer_name: '', account_manager_name: '' })
    }

    const handleChangeDialogAccount = ({ target: { name, value } }) => {
        setAccountInformationToSave({ ...accountInformationToSave, [name]: value })
    }

    const disabledAccountDialogFields = () => {
        let { account_name, customer_name, account_manager_name } = accountInformationToSave;

        if (account_name !== '' && customer_name !== '' && account_manager_name !== '') return false
        return true
    }

    const saveNewUpdateAccount = () => {
        setShowLoadingAccount(true)
        if (updateAccountFlag) {
            dispatch(updateAccount(idAccountToUpdate, accountInformationToSave))
        } else {
            dispatch(saveNewAccount(accountInformationToSave))
        }
    }

    const deleteAccountsList = () => {
        setShowLoadingAccount(true);
        dispatch(deleteAccounts(idsAccountsSelected.join(','))).then(() => {
            dispatch(getAccountsList()).then(() => {
                setShowLoadingAccount(false);
                setIdsAccountsSelected([]);
                setOpenAccountMenuAction(false)
            })
        })
    }

    return (
        <div className="containerAccounts">
            <ToastContainer icon={false} />
            {showLoading(showLoadingAccount)}
            <div className="formatTitleAccountsView">
                <Link to={routes.MENU_CHALLENGE}>
                    <IconButton>
                        <ArrowBackIcon fontSize='large' />
                    </IconButton>
                </Link>
                <div className="titlAccountsView">
                    <span>Accounts administration</span>
                </div>
            </div>
            <div className="findAccountField">
                <div style={{ width: '50%', paddingLeft: '2rem' }}>
                    <TextField
                        style={{ width: '40%' }}
                        name="account"
                        label='Account'
                        placeholder="Find an account"
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
                <div style={{ width: '50%' }} className="containerButtonsAccountsActions">
                    <Button onClick={handleOpenDialogAccountToSave} variant="contained" style={{ height: '100%', marginRight: '2rem', backgroundColor: 'green' }}>
                        Add account
                    </Button>
                    <Button id="accountActionsButtons" onClick={openMenuAccountAction} variant="contained" style={{ height: '100%', backgroundColor: 'green' }}>
                        Account actions
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorMenuAccountAction}
                        open={openAccountMenuAction}
                        onClose={closeMenuAccountAction}
                    >
                        <MenuItem style={{ width: getWidthFromButtonActions() }} disabled={idsAccountsSelected && idsAccountsSelected.length === 1 ? false : true} onClick={openDialogToUpdataAccount}>Update account</MenuItem>
                        <MenuItem style={{ width: getWidthFromButtonActions() }} disabled={idsAccountsSelected && idsAccountsSelected.length > 0 ? false : true} onClick={deleteAccountsList}>Delete account(s)</MenuItem>
                    </Menu>
                </div>
            </div>
            <div className="tableAccount">
                <GenericTable
                    columns={ROWS_TABLE_HEAD}
                    dataBody={accountsInformation}
                    getidsSelected={getAccountsSelected}
                    idsSelectedTable={idsAccountsSelected}
                />
            </div>
            <div className="containerDialogAccount">
                <Dialog
                    className="dialogAccount"
                    open={openDialogAccount}
                    onClose={handleCloseDialogAccount}
                    scroll={'paper'}
                    fullScreen={true}
                    aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description"
                >
                    <DialogTitle id="scroll-dialog-title">{updateAccountFlag ? 'Update account' : 'Add new account'}</DialogTitle>
                    <DialogContent style={{ width: '25rem' }}>
                        <div style={{ marginTop: '2rem' }}>
                            <TextField
                                name='account_name'
                                style={{ width: '100%' }}
                                label="Account name"
                                value={accountInformationToSave.account_name}
                                onChange={handleChangeDialogAccount}
                                variant="outlined"
                            />
                            <TextField
                                name='customer_name'
                                style={{ width: '100%', marginTop: '2rem' }}
                                label="Customer name"
                                value={accountInformationToSave.customer_name}
                                onChange={handleChangeDialogAccount}
                                variant="outlined"
                            />
                            <TextField
                                name='account_manager_name'
                                style={{ width: '100%', marginTop: '2rem' }}
                                label="Manager name"
                                value={accountInformationToSave.account_manager_name}
                                onChange={handleChangeDialogAccount}
                                variant="outlined"
                            />
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialogAccount}>Cancel</Button>
                        <Button disabled={disabledAccountDialogFields()} onClick={saveNewUpdateAccount}>Save</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    )
}

export default AccountsView;