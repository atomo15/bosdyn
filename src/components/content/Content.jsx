import React,{useRef,useState,useEffect} from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar'
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import {Mic} from '@material-ui/icons';
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
        continuous: true,
        });
    };
    const stopHandle = () => {
        setIsListening(false);
        microphoneRef.current.classList.remove("listening");
        SpeechRecognition.stopListening();
    };
    const handleReset = () => {
        stopHandle();
        resetTranscript();
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
                    <Mic/>
                    </div>
                    <div className="microphone-status">
                    {isListening ? "Listening........." : "Click to start Listening"}
                    </div>
                    {isListening && (
                    <button className="microphone-stop btn" onClick={stopHandle}>
                        Stop
                    </button>
                    )}
                </div>
                {transcript && (
                    <div className="microphone-result-container">
                    <div className="microphone-result-text">{transcript}</div>
                    <button className="microphone-reset btn" onClick={handleReset}>
                        Reset
                    </button>
                    </div>
                )}
                </div>
            </div>
    )
}
