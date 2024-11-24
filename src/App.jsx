import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import './App.css'
import {UserProvider} from "./context/UserContext.jsx";

function App() {
    return (
        <UserProvider>
            <div className="app-container">
                <Router>
                    <Routes>
                        <Route path="/" element={<HomePage/>}/>
                    </Routes>
                </Router>
            </div>
        </UserProvider>
    );
}

export default App;
