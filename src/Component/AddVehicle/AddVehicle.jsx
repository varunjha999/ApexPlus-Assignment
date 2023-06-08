import React, { useEffect, useState } from 'react'
import { Nav } from '../Navbar/Nav'
import { Link } from 'react-router-dom'
import style2 from './style2.module.css'
import style from '../AddScenario/style.module.css'
import axios from 'axios'


export function AddVehicle({vehicleControlForm,setVehicleControlForm}) {

  const [userData, setUserData] = useState([]);
  
  useEffect(() => {
    getDetails();
  }, [])

  async function getDetails() {
    const response = await axios.get('http://localhost:8080/scenario')
    setUserData(response.data);
  }


  // Add vehicle function
  function submitForm() {
    if (vehicleControlForm.sName === "") alert("Scenario Name is required");
    else if (vehicleControlForm.vName === "") alert("Vehicle Name is required");
    else if (vehicleControlForm.speed === "") alert("Speed is required");
    else if (vehicleControlForm.positionX === "") alert("PositionX is required");
    else if (vehicleControlForm.positionY === "") alert("PositionY is required");
    else if (vehicleControlForm.direction === "") alert("Direction is required");
    else {
      axios.post('http://localhost:8080/scenarioCar', {
        scenarioName: vehicleControlForm.sName,
        vehicleName: vehicleControlForm.vName,
        speed: vehicleControlForm.speed,
        positionX: vehicleControlForm.positionX,
        positionY: vehicleControlForm.positionY,
        direction: vehicleControlForm.direction,
      })

      alert("Successfully Added!")
      setVehicleControlForm({
        sName: "",
        vName: "",
        speed: "",
        positionX: "",
        positionY: "",
        direction: "",
      })
    }
  }

  //reset data
  function resetData() {
    setVehicleControlForm({
      sName: "",
      vName: "",
      speed: "",
      positionX: "",
      positionY: "",
      direction: "",
    })
  }

  return (
    <div className='layout'>
      <Nav />
      <div className='layout1'>
        <div className={style2["parent-div"]}>
          <h3 style={{ color: "#f5f5f5c7" }}>Vehicle / add</h3>
          <h1 style={{ color: "#f5f5f5c7" }}>Add Vehicle</h1>
          <form>
            <div className={style2["form-div1"]}>
              <div className={style2["layout2"]}>
                <div>
                  <label htmlFor='s-list'>Scenarios List</label><br />
                  <select id='s-list' className={style2["input"]} name='sName' value={vehicleControlForm.sName} onChange={(e) => { setVehicleControlForm({ ...vehicleControlForm, [e.target.name]: e.target.value }) }}>
                    <option hidden value="Select Scenario">Select Scenario</option>
                    {
                      userData.map((e, index) => {
                        return <option value={e.scenarioName} key={index}>{e.scenarioName}</option>
                      })
                    }
                  </select>
                </div>
                <div>
                  <label htmlFor='v-name'>Vehicle Name</label><br />
                  <input type='text' id='v-name' className={style2["input"]} name='vName' value={vehicleControlForm.vName} onChange={(e) => { setVehicleControlForm({ ...vehicleControlForm, [e.target.name]: e.target.value }) }} />
                </div>
                <div>
                  <label htmlFor='speed'>Speed</label><br />
                  <input type='number' id='speed' className={style2["input"]} name='speed' value={vehicleControlForm.speed} onChange={(e) => { setVehicleControlForm({ ...vehicleControlForm, [e.target.name]: e.target.value }) }} />
                </div>
              </div>

              <div className={style2["layout3"]}>
                <div>
                  <label htmlFor='position-x'>Position X</label><br />
                  <input type='number' id='position-x' className={style2["input"]} name='positionX' value={vehicleControlForm.positionX} onChange={(e) => { setVehicleControlForm({ ...vehicleControlForm, [e.target.name]: e.target.value }) }} />
                </div>
                <div>
                  <label htmlFor='position-y'>Position Y</label><br />
                  <input type='number' id='position-y' className={style2["input"]} name='positionY' value={vehicleControlForm.positionY} onChange={(e) => { setVehicleControlForm({ ...vehicleControlForm, [e.target.name]: e.target.value }) }} />
                </div>
                <div>
                  <label htmlFor='direction'>Direction</label><br />
                  <select id='direction' className={style2["input"]} name='direction' value={vehicleControlForm.direction} onChange={(e) => { setVehicleControlForm({ ...vehicleControlForm, [e.target.name]: e.target.value }) }}>
                    <option hidden>Select Direction</option>
                    <option value="Towards">Towards</option>
                    <option value="Backward">Backwards</option>
                    <option value="Upwards">Upwards</option>
                    <option value="Downwards">Downwards</option>
                  </select>
                </div>
              </div>
            </div>
            <div style={{ marginTop: "4%" }}>
              <button type='button' className={style["add"]} onClick={() => submitForm()}>Add</button>
              <button type='reset' className={style["reset"]} onClick={() => resetData()}>Reset</button>
              <Link to="/home" className={style["go-back"]}>Go Back</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
