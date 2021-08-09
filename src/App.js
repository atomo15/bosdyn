import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
//import Content from "./components/content/Content";
// import 'bootstrap/dist/css/bootstrap.min.css';
import "./app.css"
import Home from "./Pages/home/Home";
import Audio from "./Pages/audio/Audio"
import Mic from "./Pages/mic/Mic"
import {cors} from "cors"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    //Link
  } from "react-router-dom";
  
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

function App() {
    const classes = useStyles();
    return ( 
        <Router> 
            <Grid container spacing={0}>
            <Topbar/>
            </Grid>
            {/* <div className="container"> */}
            <Grid container spacing={0}>
                <Grid item xs={3}>
                    <Sidebar/>
                </Grid>
                <Grid item xs={9}>
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route exact path="/audio">
                        <Audio />
                    </Route>
                    <Route exact path="/content">
                        <Mic />
                    </Route>
                </Switch>
                </Grid>
            </Grid>
            {/* </div> */}
        </Router>
    );
}

export default App;