import React,{useRef,useState,useEffect,useReducer} from 'react'
//import ProgressBar from 'react-bootstrap/ProgressBar'
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import {Mic} from '@material-ui/icons';
import useSound from 'use-sound';
import ReactHowler from 'react-howler'
import Select from 'react-select'
import "./content.css"
import { Grid } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import {
    ThemeProvider,
    makeStyles, 
    createTheme,
  } from '@material-ui/core/styles';
import { aqua } from 'color-name';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';



const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    margin: {
      margin: theme.spacing(1)
    },
    multilineColor:{
        color:'aqua'
    },
    notchedOutline: {
      borderWidth: "1px",
      borderColor: "aqua !important"
    },
  }));
  
const theme = createTheme({
    palette: {
      primary: { main:'#11cb5f'}
    },
  });

  theme.typography.h3 = {
    fontSize: '1.2rem',
    color: aqua,
    '@media (min-width:600px)': {
      fontSize: '1.5rem',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '2rem',
    },
  };
  
  
export default function Content() {
    const classes = useStyles();
    const [formInput, setFormInput] = useReducer(
      (state, newState) => ({ ...state, ...newState }),
      {
        filename: "",
        contents: ""
      }
    );
    const handleInput = evt => {
      const name = evt.target.name;
      const newValue = evt.target.value;
      setFormInput({ [name]: newValue });
    };
    // const [placeholder, setPlaceholder] = useState('Hi');
    // const [temperature, setTemp] = useState('Hi');

//   useEffect(() => {
//     fetch('/api').then(res => res.json()).then(data => {
//       setPlaceholder(data.battery);setTemp(data.temperature);
//     });
//   }, []);
  
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [isListening, setIsListening] = useState(false);
  const [temp,setTempVoice]= useState('asjdwqn');
  const microphoneRef = useRef(null);
  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return (
      <div className="mircophone-container">
        Browser is not Support Speech Recognition.
      </div>
    );
    }
    const handleListing = () => {
        setIsListening(true);
        microphoneRef.current.classList.add("listening");
        SpeechRecognition.startListening({
        continuous: true,language: 'en-US'
        });
    };
    
    const stopHandle = () => {
        setIsListening(false);
        microphoneRef.current.classList.remove("listening");
        SpeechRecognition.stopListening();
        if(transcript.length !== 0){
        const contents = { transcript };
            var statements =  contents['transcript']
            // console.log(statements,temp)
            if(statements!=temp){
                setTempVoice(statements)
            /*setTempVoice(contents);*/
            // console.log(contents['transcript'],test)
            const response = fetch("/speak", {
                method: "POST",
                headers: {
                'Content-Type' : 'application/json'
                },
                body: JSON.stringify(contents)
                })
                if (response.ok){
                console.log("it worked")
                }
            }
        }
    };
    const handleReset = () => {
        stopHandle();
        resetTranscript();
    };
    
    const options = [
        { value: 'EN', label: 'EN' },
        { value: 'TH', label: 'TH' },
      ]
      
    
      const handleSubmit = evt => {
        evt.preventDefault();
    
        let data = { formInput };
        console.log(data)
        const response = fetch("/text2file", {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then(response => response.json())
          .then(response => console.log("Success:", JSON.stringify(response)))
          .catch(error => console.error("Error:", error));
      };
    
    
    return (
        
        <div>
            <Grid
            container
            spacing={2}
            direction="column"
            justifyContent="center"
            alignItems="center"
            >
                <div className="microphone-wrapper">
                    <br></br>
                    <center>
                    <Typography variant="h3" style={{color:'aqua'}}> Synchronous Speaker </Typography>
                    </center>
                    <br></br>
                    <br></br>
                    <center>
                    <div className="mircophone-container">
                        <div
                        className="microphone-icon-container"
                        ref={microphoneRef}
                        onClick={handleListing}
                        >
                        <button className="mymic"><Mic/></button>
                        <br></br>
                        </div>
                        <div className="microphone-status">
                            <div style={{color:'white',fontSize:'20px'}}>
                            {isListening ? "Listening........." : ""}
                            </div>
                        </div>
                        <br></br>
                        {isListening && (
                        <button className="stp" onClick={stopHandle}>
                            Stop
                        </button>
                        )}
                        <br></br>
                    </div>
                    {transcript && (
                        <div className="microphone-result-container">
                        <br></br>
                        <div className="microphone-result-text">{transcript}</div>
                        <br></br>
                        <button className="stp" onClick={handleReset}>
                            Reset
                        </button>
                        </div>
                    )}
                    {/* {transcript === "" && !isListening && 
                        <ReactHowler src='spot_real_time.mp3' playing={true}/>
                    } */}
                    </center>
                    </div>
                    <Typography variant="h3" style={{color:'aqua'}}> Text to .wav </Typography>
                    <br></br>
                    <Grid
                    container
                    spacing={2}
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    >
                      <form onSubmit={handleSubmit} style={{justifyContent:"center"}}>
                      <ThemeProvider theme={theme}>
                          <TextField
                          name="filename"
                          className={classes.margin}
                          label="File Output"
                          variant="outlined"
                          id="custom-css-outlined-input"
                          onChange={handleInput}
                          InputProps={{
                              classes:{
                                notchedOutline: classes.notchedOutline,
                              },
                              className:classes.multilineColor
                            }}
                          InputLabelProps={{
                              style: { color: 'aqua'},
                            }}
                          />
                      </ThemeProvider>
                      <ThemeProvider theme={theme}>
                          <TextField
                          name="contents"
                          className={classes.margin}
                          label="Sound Input"
                          variant="outlined"
                          id="custom-css-outlined-input"
                          onChange={handleInput}
                          InputProps={{
                              classes:{
                                notchedOutline: classes.notchedOutline,
                              },
                              className:classes.multilineColor
                            }}
                          InputLabelProps={{
                              style: { color: 'aqua'},
                            }}
                          />
                      </ThemeProvider>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="small"
                        className={classes.button}
                        startIcon={<SaveIcon />}
                        style={{top:'20px'}}
                      >
                        Save
                      </Button>
                      </form>
                  </Grid>
            </Grid>
        </div>
            
    )
}
