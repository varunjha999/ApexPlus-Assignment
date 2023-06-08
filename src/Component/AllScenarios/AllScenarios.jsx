import React, { useEffect, useState } from 'react'
import { Nav } from '../Navbar/Nav'
import { Link, useNavigate } from 'react-router-dom'
import style from './style1.module.css';
import axios from 'axios';

export function AllScenarios({ data, setData, btn, setBtn }) {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getUsers();
  }, []);
  const getUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/scenario');
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  async function deleteUser(id) {
    try {
      await axios.delete(`http://localhost:8080/scenario/${id}`);
      const filteredUsers = users.filter((user) => user.id !== id);
      setUsers(filteredUsers);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteAll() {

    const response = await axios.get('http://localhost:8080/scenario');
    let arr = [];
    for (let i = 0; i < response.data.length; i++) {
      arr.push(response.data[i].id);
    }
    for (let i = 0; i < arr.length; i++) {
      let id = arr[i];
      await axios.delete(`http://localhost:8080/scenario/${id}`)
      setUsers([]);
    }
  };

 // let response;
  async function updateUser(id) {
    const myData = await axios.get(`http://localhost:8080/scenario/${id}`)
    setData({
     sName : myData.data.scenarioName,
     sTime : myData.data.scenarioTime,
     sId : id,
  });
    setBtn(false);
    navigate("/addScenario");
  }




  return (
    <div className='layout'>
      <Nav />
      <div className='layout1'>
        <nav className={style["nav-bar"]}>
          <h1>All Scenarios</h1>
          <div className={style["parent-button"]}>
            <Link to="/addScenario" className={style["button1"]}>New Scenario</Link>
            <Link to="/addVehicle" className={style["button2"]}>Add Vehicle</Link>
            <button className={style["button3"]} onClick={() => deleteAll()}>DeleteAll</button>
          </div>
        </nav>
        <div className={style["table-div"]}>
          <table className={style["table"]}>
            <thead>
              <tr>
                <th>Scenario Id</th>
                <th>Scenario Name</th>
                <th>Scenario Time</th>
                <th>Number of Vehicles</th>
                <th>Add Vehicle</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {
                users.map((e, index) => {
                  return <tr key={index}>
                    <td>
                      {e.id}
                    </td>
                    <td>
                      {e.scenarioName}
                    </td>
                    <td>
                      {e.scenarioTime}
                    </td>
                    <td>
                      {e.scenarioCar.length}
                    </td>
                    <td>
                      <Link to="/addVehicle" className={style["add-vehicle"]}><span>+</span></Link>
                    </td>
                    <td>
                      <button type='button' onClick={() => updateUser(e.id)}>Edit</button>
                    </td>
                    <td>
                      <button type='button' onClick={() => deleteUser(e.id)}>Delete</button>
                    </td>
                  </tr>
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

