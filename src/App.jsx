import './App.css';
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import { Home } from './Component/Home/Home'
import { AddScenario } from './Component/AddScenario/AddScenario'
import { AllScenarios } from './Component/AllScenarios/AllScenarios'
import { AddVehicle } from './Component/AddVehicle/AddVehicle'
function App() {
  const[btn,setBtn] = useState(true);

  //Add schenario useState
  const [data, setData] = useState({
    sName: "",
    sTime: "",
    sId : 0,
  })
 
  //Add vehicle useState
  const [vehicleControlForm, setVehicleControlForm] = useState({
    sName: "",
    vName: "",
    speed: "",
    positionX: "",
    positionY: "",
    direction: "",
  })
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='*' element = {<Home/>}/>
          <Route path='/addScenario' element = {<AddScenario data = {data} setData = {setData} btn = {btn} setBtn = {setBtn}/>}/>
          <Route path='/allScenarios' element = {<AllScenarios data = {data} setData = {setData} btn = {btn} setBtn = {setBtn}/>}/>
          <Route path='/addVehicle' element = {<AddVehicle vehicleControlForm = {vehicleControlForm} setVehicleControlForm = {setVehicleControlForm}/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
