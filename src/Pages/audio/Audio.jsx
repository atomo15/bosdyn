import React,{ useEffect}  from 'react'
import { DataGrid } from '@material-ui/data-grid';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';
import { useState }  from "react"
import { ReactTypical } from '@deadcoder0904/react-typical'
import useSound from 'use-sound';
function GetInfo() {
    const [wavelist, setWaveList] = useState([]);
    const [durationlist, setDurationList] = useState([]);
    //const [playbackRate, setPlaybackRate] = useState(0.75);
    useEffect(() => {
        fetch('/audio_api').then(res => res.json()).then(data => {
            setWaveList(data.wave_list);setDurationList(data.duration_list);
        });
      }, []);
    const result = [wavelist,durationlist]
    //console.log(result)
    return result
  }

  const ButtonFormatter = ({ value }) => {
    //{ value }
    //return <ProgressBar now={value} label={`${value}%`} />;
    return <Button variant="contained" color="default"startIcon={<PlayCircleFilledWhiteIcon />}>Play</Button>; 
  };

const columns = [
  { field: 'id', headerName: 'ID', width: 120 },
  {
    field: 'SoundList',
    headerName: 'SoundList',
    width: 200,
    editable: true,
  },
  {
    field: 'FileName',
    headerName: 'FileName',
    width: 200,
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
    sortable: false,
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
    field: 'Sounds',
    headerName: 'Preview Sounds',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 180,
    editable: false,
    renderCell: ButtonFormatter
    // valueGetter: (params) =>
    //   `${params.getValue(params.id, 'SoundList') || ''} ${
    //     params.getValue(params.id, 'FileName') || ''
    //   }`,
    // renderCell: (params) => {
    //     return (
    //         <Button
    //         variant="contained"
    //         color="default"
    //         startIcon={<PlayCircleFilledWhiteIcon />}
    //         >
    //         Play
    //         </Button> 
    //     )
    // }
  },
];



export default function Audio()  {
    const list_wave = GetInfo()[0]
    const list_duration = GetInfo()[1]
    var rows = []
    var test_sounds = []
    const [play] = useSound(process.env.PUBLIC_URL + 'spot_real_time.wav');
    const [play2] = useSound(process.env.PUBLIC_URL + 'autonomous_robot_en.wav');
    test_sounds.push(play)
    test_sounds.push(play2)
    // test_sounds.map((i,index)=> {
    //   if(index==1)
    //   {i();}
    // })
    const list = list_wave
    
    function Play_sound(value){
      const [playing] = useSound(process.env.PUBLIC_URL + value);
      //console.log(value)
      //test_sounds.push(playing)
      playing();
    }
    //console.log(typeof(list[0]))
    //Play_sound(list[0]);
    //Play_sound(list[1]);
    
  
    
    
    // list_wave.map((item,index)=>{
    //   const [temp_play] = useSound(process.env.PUBLIC_URL + item);
    //   test_sounds.push(temp_play)
    // })
   
    list_wave.map((item,index)=>{
        rows.push({ id: index+1, FileName: item , SoundList: item.split('.')[0], Duration: list_duration[index], Action: 'Playing', Sounds:item})
    })
    
    
    
    
    
    
    return (
        <div style={{ height: 400, width: '100%' }}>
            <br></br>
            <center>
                <h1 style={{color:'navy'}}><ReactTypical
                    steps={['SPOT CAM AUDIO [OUTPUT]', 4000]}
                    loop={Infinity}
                    wrapper="div" ></ReactTypical></h1>
            </center>
            <br></br>
            <center>
            Sound list on Devices
            {/* <Button onClick={handleClick}>
            <span role="img" aria-label="Heart">
                💖
            </span>
            </Button> */}
            {/* <button
            onClick={() => play()}
            ></button> */}
            {/* <button
            onClick={() => play()}
            ></button>  */}
            </center>
            <br></br>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                checkboxSelection
                disableSelectionOnClick
                onCellClick={(columns) =>
                  test_sounds.map((i,index)=> {
                    console.log(columns)
                    if(columns.field == "Sounds"){
                    if(index==(columns.row.id-1))
                    {i();}}
                  })}
            />
            <br></br>
            {/* <ul>
                        {list_wave.map((item,index)=>{
                    return <li key={index}>{item}</li>
                })}
            </ul> */}
            <center>
            Sound list on Spot
            </center>
            <br></br>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                checkboxSelection
                disableSelectionOnClick
                onCellClick={(columns) =>
                  
                  Play_sound(columns.row.FileName)
                  // test_sounds.map((i,index)=> {
                  //   //console.log(columns)
                  //   if(columns.field == "Sounds"){
                  //   if(index==(columns.row.id-1))
                  //   {i();}}
                  // })
                }
                  //  Play_sound(columns.row.FileName)}
            />
            <p>{test_sounds.length}</p>
    </div>
    
  );
}
