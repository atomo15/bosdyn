import React,{useRef,useState,useEffect} from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar'
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import {Mic} from '@material-ui/icons';
import "./content.css"
export default function Content() {
    const [placeholder, setPlaceholder] = useState('Hi');
    const [temperature, setTemp] = useState('Hi');

  useEffect(() => {
    fetch('/api').then(res => res.json()).then(data => {
      setPlaceholder(data.battery);setTemp(data.temperature);
    });
  }, []);
  
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
        resetTranscript();
        stopHandle();
    };
  
    return (
        <div className="container">
            <div className="microphone-wrapper">
                <div className="mircophone-container">
                    <div
                    className="microphone-icon-container"
                    ref={microphoneRef}
                    onClick={handleListing}
                    >
                    <button className="mymic"><Mic/></button>
                    
                    </div>
                    <div className="microphone-status">
                    {isListening ? "Listening........." : ""}
                    </div>
                    {isListening && (
                    <button className="stp" onClick={stopHandle}>
                        Stop
                    </button>
                    )}
                </div>
                {transcript && (
                    <div className="microphone-result-container">
                    <div className="microphone-result-text">{transcript}</div>
                    <button className="stp" onClick={handleReset}>
                        Reset
                    </button>
                    </div>
                )}
                </div>
            </div>
    )
}
