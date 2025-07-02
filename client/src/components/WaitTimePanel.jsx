import  { useState, useEffect, useRef } from "react";
import "../style/WaitTimePanel.css";

export default function WaitTimePanel({ ride }) {
  const [waitTime, setWaitTime] = useState(ride.wait_time)
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
    <div className='ride-card-normal'>

      <div className="ride-info">
        <div className="ride-name">{`${ride.name} (${ride.initial})`}</div>
        <div className="tags">
          {(ride.attributes) && ride.attributes.map((att, i) => {
            return <div className="tag" key={i}>{att.name}</div>
          })}
        </div>
      </div>
      
      {(ride.is_open === true) ?
      <div className='wait-time'>
        {waitTime}
      </div> : <div className="fs-4">Closed</div>}
      
    </div>
  );
}
