
import ProgressBar from 'react-bootstrap/ProgressBar'
import Alert from 'react-bootstrap/Alert'
import { LineStyle, Timeline, TrendingUp, Home, BatteryFull, Wifi } from "@material-ui/icons"
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
        useEffect(() => {
            fetch('/api').then(res => res.json()).then(data => {
                setBattery(data.battery);setTemp(data.temperature);setSpotStatus(data.spot);
                setWifi(data.wifi);
            });
          }, []);
        const result = [battery,temperature,spot_status,wifi]
        return result
      }
    const battery = GetInfo()[0];
    const temperature = GetInfo()[1];
    const spot_status = GetInfo()[2];
    const wifi_status = GetInfo()[3];
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Dashboard</h3>
                    <ul className="sidebarList">
                        <li className="sidebarListItem active">
                            <Home className="sidebarIcon"/>HOME    
                        </li>
                        {/* <li className="sidebarListItem">
                            <Timeline className="sidebarIcon"/>Analytics    
                        </li> */}
                        <li >
                            <Wifi className="sidebarIcon"/><span>&nbsp;</span>WIFI
                        </li>
                        <li>
                            { wifi_status !== "" &&
                            <Alert variant="success">
                                Connected to {wifi_status}
                            </Alert>}
                            { wifi_status === "" &&
                            <Alert variant="warning">
                                No Connection
                            </Alert>}
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faRobot} /><span>&nbsp;</span>SPOT
                        </li>
                        <li >
                            {spot_status === true &&
                            <Alert variant="success">
                                Connected
                            </Alert>}
                            {spot_status === false &&
                            <Alert variant="danger">
                                No Connection
                            </Alert>}
                        </li>
                        <li>
                            <BatteryFull className="sidebarIcon"/>Battery    
                        </li>
                        <li >
                            {battery >= 80 &&
                            <ProgressBar variant="success" animated now={battery} label={battery+'%'} maxLength={100}/>}
                            {battery < 80 && battery >30 &&
                            <ProgressBar variant="warning"  animated now={battery} label={battery+' %'} max={100}/>}
                            {battery < 30 && battery >0 &&
                            <ProgressBar variant="danger"  animated now={battery} label={battery+' %'} max={100}/>}
                            {battery < 0 &&
                            <ProgressBar variant="info"  animated now={100} label={'N/A %'} max={100}/>}
                        </li>
                        <li>
                            <span>&nbsp;</span><FontAwesomeIcon icon={faTemperatureHigh}/><span>&nbsp;</span>Temperature    
                        </li>
                        <li >
                            {temperature < 0 &&
                            <ProgressBar variant="info"  animated now={40} label={'N/A °'} min={30} max={40}/>}
                            {temperature <= 34 && temperature>0&&
                            <ProgressBar variant="success"  animated now={temperature} label={temperature+' °'} min={30} max={40}/>}
                            {temperature > 34 && temperature<37&&
                            <ProgressBar variant="warning"  animated now={temperature} label={temperature+' °'} min={30} max={40}/>}
                            {temperature >= 37 &&
                            <ProgressBar variant="danger"  animated now={temperature} label={temperature+' °'} min={30} max={40}/>}
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
