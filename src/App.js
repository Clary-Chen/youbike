import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StationInfo from "./pages/stationInfo";

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<StationInfo/>}/>
          <Route path='/instructions' element={<StationInfo/>}/>
          <Route path='/charging' element={<StationInfo/>}/>
          <Route path='/news' element={<StationInfo/>}/>
          <Route path='/activities' element={<StationInfo/>}/>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
