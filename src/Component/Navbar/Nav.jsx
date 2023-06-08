import React from 'react'
import {NavLink} from 'react-router-dom'
export function Nav() {
  return (
    <div className='navlink-head'>
     <NavLink to="/home" className="navlink">Home</NavLink>
     <NavLink to="/AddScenario" className="navlink">Add Scenario</NavLink>
     <NavLink to="/AllScenarios" className="navlink">All Scenarios</NavLink>
     <NavLink to="/AddVehicle" className="navlink">Add Vehicle</NavLink>
    </div>
  )
}
