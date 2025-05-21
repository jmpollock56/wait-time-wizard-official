import  { useState, useEffect, useRef } from "react";
import "../style/WaitTimePanel.css";

export default function WaitTimePanel({ ride }) {
  
  const [rideData, setRideData] = useState(ride);
  const [panelClass, setPanelClass] = useState();
  const [waitTimeClass, setWaitTimeClass] = useState('')
  const currentWaitTime = useRef(rideData.wait_time)
  const timeElement = useRef(null)
  

  
 
  /**
   * 1. Wait time is displayed in the 'wait-time' element
   * 2. New wait time comes as 'wait-time-new'
   * 3. Animation sends wait-time out of view
   * 4. Animation brings wait-time-new into view with new wait time
   * 
   */

  useEffect(() => {
    

    if(rideData.wait_time != currentWaitTime.current){
      console.log(`${rideData.name} wait time changed`)
      console.log(rideData.wait_time, currentWaitTime.current)
    }

    currentWaitTime.current = rideData.wait_time
    setRideData(ride)
    
  },[ride])
  
  

  return (
    <div className="ride-card-normal">
      <div className="fire fire1">🕒</div>
      <div className="fire fire2">🕒</div>
      <div className="fire fire3">🕒</div>

      <div className="ride-info">
        <div className="ride-name">{rideData.name}</div>
        <div className="tags">
          <div className="tag">Rollercoaster</div>
          <div className="tag">Thrill Ride</div>
          <div className="tag">Heights</div>
        </div>
      </div>
      <div className="wait-time" ref={timeElement}>
        {rideData.wait_time}
        <span>Minutes</span>
      </div>

      <div className="wait-time-new">
        {rideData.wait_time}
        <span>Minutes</span>
      </div>
    </div>
  );
}
