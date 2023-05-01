import * as React from 'react';
import PropTypes from 'prop-types';
import { DataGrid } from '@mui/x-data-grid';

const GenericTable = (props) => {
    const { columns, dataBody, getidsSelected, idsSelectedTable } = props;

    const checkBoxSelectionGrid = (values) => {
        getidsSelected(values)
    }

    return (
        <div style={{ height: '100%', marginTop: '2rem' }} data-testid='genericTableChallenge'>
            <div style={{ flexGrow: 1 }}>
                <DataGrid
                    rows={dataBody}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    checkboxSelection
                    style={{ height: '100%' }}
                    autoHeight
                    onSelectionModelChange={checkBoxSelectionGrid}
                    selectionModel={idsSelectedTable}
                />
            </div>
        </div>
    )
}

GenericTable.propTypes = {
    mensaje: PropTypes.string,
    columns: PropTypes.array.isRequired,
    dataBody: PropTypes.array.isRequired,
    getidsSelected: PropTypes.func,
    idsSelectedTable: PropTypes.array
}

export default GenericTable;