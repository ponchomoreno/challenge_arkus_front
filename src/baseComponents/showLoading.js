import React from "react";
import CircularProgress from '@mui/material/CircularProgress';
import './showLoading.css'
export const showLoading = (flagCondition) => {
    return flagCondition ?
        <div className="overlay">
            <CircularProgress disableShrink size={100} thickness={4} />
        </div>
        :
        <div />
}