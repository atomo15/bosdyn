
// import ProgressBar from 'react-bootstrap/ProgressBar'
import ProgressBar from 'react-customizable-progressbar'

import { Alert } from '@material-ui/lab';
import { BatteryFull, Wifi, Extension} from "@material-ui/icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRobot, faTemperatureHigh } from '@fortawesome/free-solid-svg-icons'
import React,{ useEffect} from 'react'
import { useState } from "react"
import "./sidebar.css"


export default function sidebar() {
   
    function GetInfo() {
        const [battery, setBattery] = useState('0');
        const [temperature, setTemp] = useState('0');
        const [spot_status, setSpotStatus] = useState(false);
        const [wifi, setWifi] = useState("");
        const [payload, setPayload] = useState(false);
        useEffect(() => {
            fetch('/api').then(res => res.json()).then(data => {
                setBattery(data.battery);setTemp(data.temperature);setSpotStatus(data.spot);
                setWifi(data.wifi);setPayload(data.payload);
            });
          }, []);
        const result = [battery,temperature,spot_status,wifi,payload]
        return result
      }
    const battery = GetInfo()[0];
    const temperature = GetInfo()[1];
    const spot_status = GetInfo()[2];
    const wifi_status = GetInfo()[3];
    const payload_status = GetInfo()[4];
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Dashboard</h3>
                    <ul className="sidebarList">
                        {/* <li className="sidebarListItem active">
                            <Home className="sidebarIcon"/>HOME    
                        </li> */}
                        {/* <li className="sidebarListItem">
                            <Timeline className="sidebarIcon"/>Analytics    
                        </li> */}
                        <br></br>
                        <li >
                            <Wifi className="sidebarIcon"/><span>&nbsp;</span>WIFI
                        </li>
                        <br></br>
                        <li>
                            { wifi_status !== "" &&
                            <Alert variant="outlined" severity="success">
                                Connected to {wifi_status}
                            </Alert>}
                            { wifi_status === "" &&
                            <Alert variant="outlined" severity="error">
                                No Connection
                            </Alert>}
                        </li>
                        <br></br>
                        <li>
                            <FontAwesomeIcon icon={faRobot} /><span>&nbsp;</span>SPOT
                        </li>
                        <br></br>
                        <li >
                            {spot_status === true &&
                            <Alert variant="outlined" severity="success">
                                Connected
                            </Alert>}
                            {spot_status === false &&
                            <Alert variant="outlined" severity="error">
                                No Connection
                            </Alert>}
                        </li>
                        <br></br>
                        <li>
                            <Extension className="sidebarIcon"/>Payload
                        </li>
                        <br></br>
                        <li >
                            {payload_status === true &&
                            <Alert variant="outlined" severity="success">
                                Connected
                            </Alert>}
                            {payload_status === false &&
                            <Alert variant="outlined" severity="error">
                                No Connection
                            </Alert>}
                        </li>
                        <br></br>
                        <li>
                            <BatteryFull className="sidebarIcon"/>Battery    
                        </li>
                        <li >
                            {battery >= 80 &&
                            <ProgressBar
                                radius={60}
                                progress={battery}
                                strokeWidth={28}
                                strokeColor="green"
                                strokeLinecap="butt"
                                trackStrokeWidth={14}
                                trackStrokeLinecap="butt"
                                initialAnimation="true"
                                initialAnimationDelay = {100}
                                cut={120}
                                rotate={-210}
                            >
                                <div className="indicator">
                                    <div>{battery}%</div>
                                </div>
                            </ProgressBar>}
                            {battery < 80 && battery >30 &&
                            <ProgressBar
                            radius={60}
                            progress={battery}
                            strokeWidth={28}
                            strokeColor="orange"
                            strokeLinecap="butt"
                            trackStrokeWidth={14}
                            trackStrokeLinecap="butt"
                            initialAnimation="true"
                            initialAnimationDelay = {100}
                            cut={120}
                            rotate={-210}
                            >
                                <div className="indicator">
                                    <div>{battery}%</div>
                                </div>
                            </ProgressBar>}
                            {battery < 30 && battery >0 &&
                            <ProgressBar
                            radius={60}
                            progress={battery}
                            strokeWidth={28}
                            strokeColor="red"
                            strokeLinecap="butt"
                            trackStrokeWidth={14}
                            trackStrokeLinecap="butt"
                            initialAnimation="true"
                            initialAnimationDelay = {100}
                            cut={120}
                            rotate={-210}
                            >
                                <div className="indicator">
                                    <div>{battery}%</div>
                                </div>
                            </ProgressBar>}
                            {battery < 0 &&
                            <ProgressBar
                            radius={70}
                            progress={100}
                            strokeWidth={28}
                            strokeColor="aqua"
                            strokeLinecap="butt"
                            trackStrokeWidth={14}
                            trackStrokeLinecap="butt"
                            initialAnimation="true"
                            initialAnimationDelay = {100}
                            cut={120}
                            rotate={-210}
                            >
                                <div className="indicator">
                                    <div> N/A% </div>
                                </div>
                            </ProgressBar>}
                        </li>
                        <li>
                            <span>&nbsp;</span><FontAwesomeIcon icon={faTemperatureHigh}/><span>&nbsp;</span>Temperature    
                        </li>
                        <li >
                            {temperature < 0 &&
                            <ProgressBar
                            radius={70}
                            progress={100}
                            strokeWidth={28}
                            strokeColor="aqua"
                            strokeLinecap="butt"
                            trackStrokeWidth={14}
                            trackStrokeLinecap="butt"
                            initialAnimation="true"
                            initialAnimationDelay = {100}
                            cut={120}
                            rotate={-210}
                            >
                                <div className="indicator">
                                    <div> N/A° </div>
                                </div>
                            </ProgressBar>}
                            {temperature <= 34 && temperature>0&&
                            <ProgressBar
                            radius={60}
                            progress={temperature*2}
                            strokeWidth={28}
                            strokeColor="green"
                            strokeLinecap="butt"
                            trackStrokeWidth={14}
                            trackStrokeLinecap="butt"
                            initialAnimation="true"
                            initialAnimationDelay = {100}
                            cut={120}
                            rotate={-210}
                            >
                                <div className="indicator">
                                    <div>{temperature} °</div>
                                </div>
                            </ProgressBar>}
                            {temperature > 34 && temperature<37&&
                            <ProgressBar
                            radius={60}
                            progress={temperature*2.5}
                            strokeWidth={28}
                            strokeColor="orange"
                            strokeLinecap="butt"
                            trackStrokeWidth={14}
                            trackStrokeLinecap="butt"
                            initialAnimation="true"
                            initialAnimationDelay = {100}
                            cut={120}
                            rotate={-210}
                            >
                                <div className="indicator">
                                    <div>{temperature} °</div>
                                </div>
                            </ProgressBar>}
                            {temperature >= 37 &&
                            <ProgressBar
                            radius={60}
                            progress={temperature*2.5}
                            strokeWidth={28}
                            strokeColor="red"
                            strokeLinecap="butt"
                            trackStrokeWidth={14}
                            trackStrokeLinecap="butt"
                            initialAnimation="true"
                            initialAnimationDelay = {100}
                            cut={120}
                            rotate={-210}
                            >
                                <div className="indicator">
                                    <div>{temperature} °</div>
                                </div>
                            </ProgressBar>}
                        </li>
                        
                    </ul>
                    {/* <h3 className="sidebarTitle">Quick Menu</h3>
                    <ul className="sidebarList">
                        <li className="sidebarListItem">
                            <LineStyle/>HOME    
                        </li>
                        <li className="sidebarListItem">
                            <Timeline/>Analytics    
                        </li>
                        <li className="sidebarListItem">
                            <TrendingUp/>Sales    
                        </li>
                    </ul>
                    <h3 className="sidebarTitle">Notifications</h3>
                    <ul className="sidebarList">
                        <li className="sidebarListItem">
                            <LineStyle/>HOME    
                        </li>
                        <li className="sidebarListItem">
                            <Timeline/>Analytics    
                        </li>
                        <li className="sidebarListItem">
                            <TrendingUp/>Sales    
                        </li>
                    </ul>
                    <h3 className="sidebarTitle">Staff </h3>
                    <ul className="sidebarList">
                        <li className="sidebarListItem">
                            <LineStyle/>HOME    
                        </li>
                        <li className="sidebarListItem">
                            <Timeline/>Analytics    
                        </li>
                        <li className="sidebarListItem">
                            <TrendingUp/>Sales    
                        </li>
                    </ul> */}
                </div>
            </div>
        </div>
    )
}
