import React, { useEffect, useState } from 'react'
import { Nav } from '../Navbar/Nav'
import axios from 'axios';
import style from '../AllScenarios/style1.module.css'

export function Home() {

  const [userData, setUserData] = useState([]);
  const [schenario, setSchenario] = useState("");
  const [car, setCar] = useState([]);

  useEffect(() => {
    getDetails();
  }, [])

  async function getDetails() {
    const response = await axios.get('http://localhost:8080/scenario')
    const carData = await axios.get('http://localhost:8080/scenarioCar')
    setUserData(response.data);
    setCar(carData.data);
  }

 async function deleteItem(id){
  try {
    await axios.delete(`http://localhost:8080/scenarioCar/${id}`);
    const filteredUsers = car.filter((user) => user.id !== id);
    setCar(filteredUsers);
  } catch (error) {
    console.log(error);
  }
  }


  return (
    <div className='layout'>
      <Nav />
      <div className='layout1'>
        <div>
          <div className={style["home1schenario"]}>
            <label htmlFor='schenario' className={style["schenarioName"]}>Schenario</label><br />
            <select id='schenario' value={schenario} onChange={(e) => { setSchenario(e.target.value) }} className={style["selece-schenario"]}>
              <option hidden value="Select Schenario">Select Schenario</option>
              {
                userData.map((e, index) => {
                  return <option value={e.scenarioName} key={index}>{e.scenarioName}</option>
                })
              }
            </select>
          </div>
          <div className={style["table-div"]}>
            <table className={style["table"]}>
              <thead>
                <tr>
                  <th>Vehicle Id</th>
                  <th>Vehicle Name</th>
                  <th>Position X</th>
                  <th>Position Y</th>
                  <th>Speed</th>
                  <th>Direction</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {
                  car.map((e, index) => {
                    if (e.scenarioName === schenario) {
                      return <tr key={index}>
                        <td>
                          {e.id}
                        </td>
                        <td>
                          {e.vehicleName}
                        </td>
                        <td>
                          {e.positionX}
                        </td>
                        <td>
                          {e.positionY}
                        </td>
                        <td>
                          {e.speed}
                        </td>
                        <td>
                          {e.direction}
                        </td>
                        <td>
                          <button type='button' >Edit</button>
                        </td>
                        <td>
                          <button type='button' onClick={()=>deleteItem(e.id)}>Delete</button>
                        </td>
                      </tr>
                    }
                    else {
                      return "";
                    }
                  })
                }
              </tbody>
            </table>
          </div>
          <div className={style["button-div"]}>
          <button type='button' className={style["button-div-buton1"]}>Start Simulation</button>
          <button type='button' className={style["button-div-buton2"]}>Stop Simulation</button>
          </div>
        </div>
      </div>
    </div>
  )
}

