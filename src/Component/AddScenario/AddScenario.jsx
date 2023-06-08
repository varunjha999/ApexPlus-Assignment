import React from 'react'
import axios from 'axios';
import { Nav } from '../Navbar/Nav'
import style from './style.module.css';
import { Link } from 'react-router-dom';

export function AddScenario({data,setData,btn,setBtn}) {

  const submitData = () => {
    if (data.sName === "") alert("Scenario Name is required");
    else if (data.sTime === "") alert("Scenario Time is required");
    else {
      axios.get('http://localhost:8080/scenario').then((res) => {
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].scenarioName === data.sName) return alert("Scenarion Name is present Please try other name");
        }

          axios.post('http://localhost:8080/scenario', {
          scenarioName: data.sName,
          scenarioTime: data.sTime,
          scenarioCar: [],
        })

        alert("Successfully Added!")
        setData({
          sName: "",
          sTime: "",
        })
      })
    }
  }

function resetData(){
  setData({
    sName : "",
    sTime : "",
  })
}
 
async function updateData(id){
  if (data.sName === "") alert("Scenario Name is required");
    else if (data.sTime === "") alert("Scenario Time is required");
    else {
      axios.get('http://localhost:8080/scenario').then((res) => {
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].scenarioName === data.sName) return alert("Scenarion Name is present Please try other name");
        }

          axios.put(`http://localhost:8080/scenario/${id}`, {
          scenarioName: data.sName,
          scenarioTime: data.sTime,
          scenarioCar: [],
        })

        alert("Successfully Updated!");
        setData({
          sName: "",
          sTime: "",
        })
        setBtn(true);
      })
      
    }
}


  return (
    <div className='layout'>
      <Nav />
      <div className='layout1'>
        <div className={style["scenario"]}>
          <h3>Scenario / add</h3>
          <h1>Add Scenario</h1>
          <form>
            <div className={style["form-div"]}>
              <div>
                <label htmlFor='s-name' className={style["label"]}>Scenario name</label><br />
                <input value={data.sName} name='sName' onChange={(e) => { setData({ ...data, [e.target.name]: e.target.value }) }} type='text' id='s-name' className={style["input"]} />
              </div>
              <div>
                <label htmlFor='s-time' className={style["label"]}>Scenario Time (seconds)</label><br />
                <input value={data.sTime} name='sTime' onChange={(e) => { setData({ ...data, [e.target.name]: e.target.value }) }} type='number' id='s-time' className={style["input"]} />
              </div>
            </div>
            <div>{ btn ?
              <button type='button' onClick={()=>submitData()} className={style["add"]}>Add</button> : 
              <button type='button' onClick={()=>updateData(data.sId)} className={style["add"]} >Update</button>
              }
              <button type='reset' onClick={resetData} className={style["reset"]}>Reset</button>
              <Link to="/home" className={style["go-back"]}>Go Back</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

