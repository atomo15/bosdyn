import "./sidebar.css"
import { LineStyle, Timeline, TrendingUp, Home, BatteryFull } from "@material-ui/icons"
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
                            <BatteryFull className="sidebarIcon"/>Battery    
                        </li>
                    </ul>
                    <h3 className="sidebarTitle">Quick Menu</h3>
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
                    </ul>
                </div>
            </div>
        </div>
    )
}
