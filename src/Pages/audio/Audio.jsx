import React,{ useEffect}  from 'react'
import { DataGrid } from '@material-ui/data-grid';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';
import { useState }  from "react"
import { ReactTypical } from '@deadcoder0904/react-typical'
import useSound from 'use-sound';
import { Component } from 'react';
import { Howl } from 'howler';
import "./audio.css"

class App extends Component {
  soundPlay = (src) => {
  const sound = new Howl({
    src,
    html5: true
  })
  sound.play();
  }
  
  RenderButtonSound = (audioClips) =>{
    return audioClips.map((soundObj,index)=>{
      return(
        <Button variant="contained" color="default" startIcon={<PlayCircleFilledWhiteIcon />} key={index} onClick={()=>this.soundPlay(soundObj.sound)}>
          {soundObj.label}
        </Button>
      )
    }
    )
  }
  RenderButtonSoundByFile = (audioClips,i) =>{
    return audioClips.map((soundObj,index)=>{
      if(index==i){
      return(
        <Button variant="contained" color="default" startIcon={<PlayCircleFilledWhiteIcon />} key={index} onClick={()=>this.soundPlay(soundObj.sound)}>
          {soundObj.label}
        </Button>
      )}
    }
    )
  }
}

function upload_file(filename){
  //console.log('upload function',filename)
  const response = fetch("/upload_audio", {
    method: "POST",
    headers: {
    'Content-Type' : 'application/json'
    },
    body: JSON.stringify(filename)
    })
    if (response.ok){
    console.log("it worked")
    }
}

function play_sound_spot_by_var(filename){
  const response = fetch("/play_spot_audio", {
    method: "POST",
    headers: {
    'Content-Type' : 'application/json'
    },
    body: JSON.stringify(filename)
    })
    if (response.ok){
    console.log("it worked")
    }
}
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
  
  function GetSpotInfo() {
    const [spotlist, setSpotList] = useState([]);
    useEffect(() => {
        fetch('/get_spot_list').then(res => res.json()).then(data => {
          setSpotList(data.spot_list);
        });
      }, []);
    const result = [spotlist]
    //console.log(result[0][0])
    return result
  }
  
  function playz(audioClips,i){
    const a = new App();
    return audioClips.map((soundObj,index)=>{
      if(index==i)
        {
          a.soundPlay(soundObj.sound)
        //   console.log(soundObj,index)
        // return
        //   (
        //     console.log(soundObj,index)
        //   //a.soundPlay(soundObj.sound)
        //   //this.soundPlay(soundObj.sound)
        //   )
        }
    }
    )
  }

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
    editable: false,
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
    // valueGetter: (params) =>
    //   `${params.getValue(params.id, 'SoundList') || ''} ${
    //     params.getValue(params.id, 'FileName') || ''
    // //   }`,
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
  }
  // },{
  //   field: 'Content',
  //   headerName: 'Content',
  //   width: 140,
  //   editable: false,
  //   sortable: false,
  //   // type: 'number',
  // },
];

const columns_spot = [
  { field: 'id', headerName: 'ID', width: 120 },
  {
    field: 'SoundList',
    headerName: 'SoundList',
    width: 200,
    editable: true,
  },
  {
    field: 'Sounds',
    headerName: 'Play Sounds on Spot',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 200,
    editable: false,
    // renderCell: ButtonFormatter
    // valueGetter: (params) =>
    //   `${params.getValue(params.id, 'SoundList') || ''} ${
    //     params.getValue(params.id, 'FileName') || ''
    // //   }`,
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
  }
];

// const audioClips = [
//   {sound: process.env.PUBLIC_URL + 'autonomous_robot_en.wav',label:'autonomous_robot_en'},
//   {sound: process.env.PUBLIC_URL + 'spot_real_time.wav',label:'spot_real_time'}]



export default function Audio()  {
    const list_wave = GetInfo()[0]
    const list_duration = GetInfo()[1]
    const list_spot = GetSpotInfo()[0]
    var rows = []
    var rows_spot = []
    //var test_sounds = []
    
    var audioClips = []
    list_wave.map((item,index)=>{
      audioClips.push({sound: process.env.PUBLIC_URL + item,label:item})
    })
    
    list_spot.map((item,index)=>{
      rows_spot.push({id:index+1,SoundList:item})
    })
    // const audioClips = [
    //   {sound: process.env.PUBLIC_URL + 'autonomous_robot_en.wav',label:'autonomous_robot_en'},
    //   {sound: process.env.PUBLIC_URL + 'spot_real_time.wav',label:'spot_real_time'}]
    
    
    const a = new App();
    list_wave.map((item,index)=>{
        rows.push({ id: index+1, FileName: item , SoundList: item.split('.')[0], Duration: list_duration[index], Action: 'Playing'})
    })
    
    return (
        // <div style={{ height: '50vh', width: '100%' }}>
        <div className='home1'>
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
                style={{ height: '40vh', width: '100%' }}
                onCellClick={(columns) =>
                  //console.log(columns)
                  {                  
                      if(columns.field == "Sounds")
                    {
                      //console.log(columns.row.id-1)
                      playz(audioClips,columns.row.id-1);
                        // if(index==(columns.row.id-1))
                        //   {
                        //     console.log(columns.row.FileName)
                        //   }
                    }
                    else if(columns.field == "Action"){
                      //console.log("upload",columns.row.FileName)
                      upload_file(columns.row.FileName);
                    }
                  }
                }
            />
            <br></br>
             {/* {a.RenderButtonSound(audioClips)}
             {a.RenderButtonSoundByFile(audioClips,2)} */}
            <center>
            Sound list on Spot
            </center>
            <br></br>
            <DataGrid
                rows={rows_spot}
                columns={columns_spot}
                pageSize={5}
                checkboxSelection
                disableSelectionOnClick
                style={{ height: '40vh', width: '100%' }}
                onCellClick={(columns) =>
                  //console.log(columns)
                  {                  
                      if(columns.field == "Sounds")
                        {
                          console.log(columns.row.SoundList)
                          play_sound_spot_by_var(columns.row.SoundList)
                        }
                  }
                }
                
            />
            {/* <p>{test_sounds.length}</p> */}
           
    </div>
    
  );
}
