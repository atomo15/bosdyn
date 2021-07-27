import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import Content from "./components/content/Content";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./app.css"

function App() {
    
    return ( 
        <div> 
            <Topbar/>
            <div className="container">
                <Sidebar/>
                <div className="others">
                    <Content/>
                </div>
            </div>
        </div>
    );
}

export default App;