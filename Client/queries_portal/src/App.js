import './App.css';
import AgentsPanel from './Components/JS/AgentsPanel';
import CustomerPanel from './Components/JS/CustomerPanel';
import LoginPortal from './Components/JS/LoginPortal';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';



function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
            <Route path="/" element={<LoginPortal/>}/>
            <Route path="/customerPanel"  element={<CustomerPanel/>}/>
            <Route path="/agentPanel" element={<AgentsPanel/>}/>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
