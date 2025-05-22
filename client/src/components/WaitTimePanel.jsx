import  { useState, useEffect, useRef } from "react";
import "../style/WaitTimePanel.css";

export default function WaitTimePanel({ ride }) {
  const [waitTime, setWaitTime] = useState(ride.wait_time)
  const prevWaitTime = useRef(ride.wait_time)
  const [panelClass, setPanelClass] = useState();
  const [waitTimeClass, setWaitTimeClass] = useState('')
  
  console.log(ride.wait_time)
  useEffect(() => {
    
    if(ride.wait_time != prevWaitTime.current){
      

      const timeout = setTimeout(() => {
        setWaitTime(ride.waitTime)
        prevWaitTime.current = ride.wait_time
        
      }, 1000)

      return () => clearTimeout(timeout)
    }
  },[ride])
  
  

  return (
    <div className="ride-card-normal">
      <div className="fire fire1">🕒</div>
      <div className="fire fire2">🕒</div>
      <div className="fire fire3">🕒</div>

      <div className="ride-info">
        <div className="ride-name">{ride.name}</div>
        <div className="tags">
          <div className="tag">Rollercoaster</div>
          <div className="tag">Thrill Ride</div>
          <div className="tag">Heights</div>
        </div>
      </div>
      <div className="wait-time">
        {waitTime}
        <span>Minutes</span>
      </div>

      <div className="wait-time-new">
        {ride.wait_time}
        <span>Minutes</span>
      </div>
    </div>
  );
}
