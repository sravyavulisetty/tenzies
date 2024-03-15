import React from 'react'
import "./Die.css";
function Die(props) {
    const styles={
        backgroundColor: props.isHeld ? "green": "white",
        color: props.isHeld ? "white" : "black"
    }
  return (
    <div style={styles} className='die' onClick={props.holdDice}>
        <h3>{props.value}</h3>
    </div>
  )
}

export default Die;
