import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import './App.css'

function App() {
    return (
        <div className="app-container">
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
