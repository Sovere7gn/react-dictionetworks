import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import HomeSearchTest from './pages/HomeSearchTest';
import ResultPage from './pages/ResultPage';

function App() {
  return (
    <Router>
      <div className="App">
          <div style={{position: 'relative', width: '100%', marginTop: '0px'}}>
            <Routes>
              <Route path="/dashboard" element={<DashboardPage />}/>
              <Route path="/" element={<HomeSearchTest />}/>
              <Route path="/result" element={<ResultPage />}/>
            </Routes>
          </div>
      </div>
    </Router>
  );
}

export default App;