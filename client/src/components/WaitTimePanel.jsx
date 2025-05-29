import  { useState, useEffect, useRef } from "react";
import "../style/WaitTimePanel.css";

export default function WaitTimePanel({ ride }) {
  const [waitTime, setWaitTime] = useState(ride.wait_time)
  const prevWaitTime = useRef(ride.wait_time)
  const [panelClass, setPanelClass] = useState();
  const [waitTimeClass, setWaitTimeClass] = useState('')
  const [waitTimeEmoji, setWaitTimeEmoji] = useState('')
  
  useEffect(() => {
    setWaitTime(ride.wait_time)
    setWaitTimeClass(() => {
      if(ride.wait_time >= 60){
        setWaitTimeEmoji('🔥')
        return 'ride-card-fire'
      } else if(ride.wait_time > 0 && ride.wait_time <= 20){
        setWaitTimeEmoji('🐢')
        return 'ride-card-turtle'
      } else if(ride.wait_time > 20 && ride.wait_time < 60){
        setWaitTimeEmoji('🕒')
        return 'ride-card-normal'
      } else if(ride.wait_time === 0 && ride.is_open === true){
        setWaitTimeEmoji('🕒')
        return 'ride-card-normal'
      } else {
        setWaitTimeEmoji('🚷')
        return 'ride-card-closed'
      }
    })
  },[ride])

  return (
    <div className={waitTimeClass}>
      <div className="fire fire1">{waitTimeEmoji}</div>
      <div className="fire fire2">{waitTimeEmoji}</div>
      <div className="fire fire3">{waitTimeEmoji}</div>

      <div className="ride-info">
        <div className="ride-name">{ride.name}</div>
        <div className="tags">
          {(ride.attributes) && ride.attributes.map((att, i) => {
            return <div className="tag" key={i}>{att}</div>
          })}
        </div>
      </div>
      
      {(ride.is_open === true) ?
      <div className={`wait-time`}>
        {waitTime}
        <span>Minutes</span>
      </div> : <div className="fs-4">Closed</div>}
      

      <div className="wait-time-new">
        {ride.wait_time}
        <span>Minutes</span>
      </div>
    </div>
  );
}
