import "./sidebar.css"
import ProgressBar from 'react-bootstrap/ProgressBar'
import Alert from 'react-bootstrap/Alert'
import { LineStyle, Timeline, TrendingUp, Home, BatteryFull, Wifi } from "@material-ui/icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRobot, faTemperatureHigh } from '@fortawesome/free-solid-svg-icons'
export default function sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Dashboard</h3>
                    <ul className="sidebarList">
                        <li className="sidebarListItem active">
                            <Home className="sidebarIcon"/>HOME    
                        </li>
                        <li className="sidebarListItem">
                            <Timeline className="sidebarIcon"/>Analytics    
                        </li>
                        <li className="sidebarListItem">
                            <Wifi className="sidebarIcon"/><span>&nbsp;</span>WIFI
                        </li>
                        <li className="sidebarListItem">
                            <Alert variant="success">
                                Connected
                            </Alert>
                        </li>
                        <li className="sidebarListItem">
                            <FontAwesomeIcon icon={faRobot} /><span>&nbsp;</span>SPOT
                        </li>
                        <li className="sidebarListItem">
                            <Alert variant="success">
                                Connected
                            </Alert>
                        </li>
                        <li className="sidebarListItem">
                            <BatteryFull className="sidebarIcon"/>Battery    
                        </li>
                        <li >
                            <ProgressBar variant="success" animated now={95} label={'95%'} maxLength={100}/>
                        </li>
                        <li className="sidebarListItem">
                            <FontAwesomeIcon icon={faTemperatureHigh}/><span>&nbsp;</span>Temperature    
                        </li>
                        <li >
                            <ProgressBar variant="success" animated now={30} label={'30°'} max={40}/>
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
