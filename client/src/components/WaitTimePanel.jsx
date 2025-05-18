import React, { useRef } from "react";
import '../style/WaitTimePanel.css'

export default function WaitTimePanel({ ride }){
    
    return (
        
        <div className="ride-card-normal">
        
            <div className="fire fire1">🕒</div>
            <div className="fire fire2">🕒</div>
            <div className="fire fire3">🕒</div>
        
            <div className="ride-info">
            <div className="ride-name">{ ride.name }</div>
            </div>
            <div className="wait-time">
            {ride.wait_time}
            <span>Minutes</span>
            </div>
        </div>
    )
}