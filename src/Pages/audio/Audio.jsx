import React from 'react'
import { DataGrid } from '@material-ui/data-grid';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';





const columns = [
  { field: 'id', headerName: 'ID', width: 120 },
  {
    field: 'SoundList',
    headerName: 'SoundList',
    width: 150,
    editable: true,
  },
  {
    field: 'FileName',
    headerName: 'FileName',
    width: 150,
    editable: true,
  },
  {
    field: 'Duration',
    headerName: 'Duration',
    width: 140,
    editable: true,
    // type: 'number',
  },
  {
    field: 'Action',
    headerName: 'Action',
    width: 150,
    renderCell: (params) => {
        return (
            <Button
            variant="contained"
            color="default"
            startIcon={<CloudUploadIcon />}
            >
            Upload
            </Button> 
        )
    }
  },
  {
    field: 'Contents',
    headerName: 'Contents',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    editable: false,
    // valueGetter: (params) =>
    //   `${params.getValue(params.id, 'SoundList') || ''} ${
    //     params.getValue(params.id, 'FileName') || ''
    //   }`,
    renderCell: (params) => {
        return (
            <Button
            variant="contained"
            color="default"
            startIcon={<PlayCircleFilledWhiteIcon />}
            >
            Play
            </Button> 
        )
    }
  },
];

const rows = [
  { id: 1, FileName: 'Snow.wav', SoundList: 'Snow', Duration: 35, Action: 'Playing'},
  { id: 2, FileName: 'Cersei.wav', SoundList: 'Cersei', Duration: 42, Action: 'Playing'},
  { id: 3, FileName: 'Jaime.wav', SoundList: 'Jaime', Duration: 45, Action: 'Playing'}
];
export default function Audio() {
    return (
        <div style={{ height: 400, width: '100%' }}>
            <br></br>
            <center>
            Sound list on Devices
            </center>
            <br></br>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                checkboxSelection
                disableSelectionOnClick
            />
            <br></br>
            <center>
            Sound list on Spot
            {/* <Button
            variant="contained"
            color="default"
            className={classes.button}
            startIcon={<CloudUploadIcon />}
            >
            Upload
            </Button>  */}
            </center>
            <br></br>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                checkboxSelection
                disableSelectionOnClick
            />
    </div>
    
  );
}
