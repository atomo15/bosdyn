import React from 'react'
import "./topbar.css"
import { NotificationsNone,Home,Settings,Mic,VolumeUp,Camera,CameraAltRounded } from '@material-ui/icons';
import Avatar from '@material-ui/core/Avatar';
import ProgressBar from 'react-bootstrap/ProgressBar';
import {Link} from 'react-router-dom'

export default function Topbar() {
    return ( 
        <div className="topbar" >
            <div className="topbarWrapper" >
                <div className="topLeft">
                    <Link to="/">
                    <span className="logo"><img src={process.env.PUBLIC_URL + 'robot.png'} height="20px" width="20px"></img> BOSDYN <img src={process.env.PUBLIC_URL + 'robot.png'} height="20px" width="20px"></img></span>
                    </Link>
                </div>
                <div className="topRight">
                    <ProgressBar striped variant="success" now={40} />
                    {/* <div className="topbarIconsContainer">   
                    <NotificationsNone/>
                    <span className="topIconBadge">2</span>
                    </div>
                    <div className="topbarIconsContainer">   
                    <Language/>
                    <span className="topIconBadge">2</span>
                    </div> */}
                    {/* <div className="topbarIconsContainer">   
                    <Settings/>
                    </div> */}
                    <div className="topbarIconsContainer">   
                        <Link to="/">
                            <Home/>
                        </Link>
                    </div>
                    <div className="topbarIconsContainer">   
                        <Link to="/content">
                            <Mic/>
                        </Link> 
                    </div>
                    <div className="topbarIconsContainer">  
                        <Link to="/audio">
                            <VolumeUp/>
                        </Link> 
                    </div>
                    <div className="topbarIconsContainer">   
                    <Camera/>
                    </div>
                    <div className="topbarIconsContainer">   
                    <CameraAltRounded/>
                    </div>
                    
                    <Avatar alt="Atom Thunnathorne" src={process.env.PUBLIC_URL + 'OoAtomoO.jpg'}  />
                    {/* <img src="https://firebasestorage.googleapis.com/v0/b/my-bot-5849f.appspot.com/o/OoAtomoO.jpg?alt=media&token=d614ba21-7e8c-4b1a-a96e-f06f539e577f" alt=" " className="topAvatar"></img> */}
                </div>
            </div>
        </div >
    )
}