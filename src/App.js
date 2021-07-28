import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
//import Content from "./components/content/Content";
// import 'bootstrap/dist/css/bootstrap.min.css';
import "./app.css"
import Home from "./Pages/home/Home";
import Audio from "./Pages/audio/Audio"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

function App() {
    
    return ( 
        <Router> 
            <Topbar/>
            <div className="container">
                <Sidebar/>
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/audio">
                        <Audio />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;