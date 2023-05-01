import * as React from 'react';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import PropTypes from 'prop-types'

const MultipleSelect = (props) => {
    const {label, userNamesValues, arrayUsers, handleChangeSelect} = props;

    const onChangeSelect = ({ target: { value } }) => {
        handleChangeSelect(value)
    };

    return (
        <div>
            <FormControl sx={{ width: '100%', marginTop: '2rem' }}>
                <InputLabel >{label}</InputLabel>
                <Select
                    id="selectMultipleChallenge"
                    name='selectMultipleChallenge'
                    multiple
                    value={userNamesValues}
                    onChange={onChangeSelect}
                    input={<OutlinedInput label={label} />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} />
                            ))}
                        </Box>
                    )}
                >
                    {arrayUsers.map((val, key) => (
                        <MenuItem
                            key={key}
                            value={val.name}
                        >
                            {val.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}

MultipleSelect.propTypes = {
    label: PropTypes.string.isRequired,
    arrayUsers: PropTypes.array.isRequired,
    userNamesValues: PropTypes.array.isRequired,
    handleChangeSelect: PropTypes.func.isRequired
}

export default MultipleSelect;