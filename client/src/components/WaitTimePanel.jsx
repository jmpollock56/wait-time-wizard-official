import React, { useState, useEffect } from "react";
import "../style/WaitTimePanel.css";

export default function WaitTimePanel({ ride }) {
  const [rideData, setRideData] = useState();
  const [panelClass, setPanelClass] = useState();

  /**
   * The ride panel CSS should change whenever the the wait time changes. So..
   * 1. Check if ride has updated (useEffect)
   * 2. If not, do nothing. If so, check whether the wait time has changed.
   */

  useEffect(() => {}, [ride]);

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
        {ride.wait_time}
        <span>Minutes</span>
      </div>
    </div>
  );
}
