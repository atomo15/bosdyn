import React from 'react'
import "./topbar.css"
import { NotificationsNone,Language,Settings } from '@material-ui/icons';
import Avatar from '@material-ui/core/Avatar';
export default function Topbar() {
    return ( 
        <div className="topbar" >
            <div className="topbarWrapper" >
                <div className="topLeft">
                    <span className="logo"> BOSDYN </span>
                </div>
                <div className="topRight">
                    <div className="topbarIconsContainer">   
                    <NotificationsNone/>
                    <span className="topIconBadge">2</span>
                    </div>
                    <div className="topbarIconsContainer">   
                    <Language/>
                    <span className="topIconBadge">2</span>
                    </div>
                    <div className="topbarIconsContainer">   
                    <Settings/>
                    </div>
                    <Avatar alt="Atom Thunnathorne" src="https://firebasestorage.googleapis.com/v0/b/my-bot-5849f.appspot.com/o/OoAtomoO.jpg?alt=media&token=d614ba21-7e8c-4b1a-a96e-f06f539e577f" />
                    <img src="https://firebasestorage.googleapis.com/v0/b/my-bot-5849f.appspot.com/o/OoAtomoO.jpg?alt=media&token=d614ba21-7e8c-4b1a-a96e-f06f539e577f" alt=" " className="topAvatar"></img>
                </div>
            </div>
        </div >
    )
}