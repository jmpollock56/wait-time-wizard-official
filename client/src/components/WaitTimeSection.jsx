import React, { useEffect, useState } from "react";
import WaitTimePanel from "./WaitTimePanel";
import "../style/WaitTimeSection.css";

export default function WaitTimeSection({ parks }) {
  const [rides, setRides] = useState([]);

  useEffect(() => {
    const updateRides = () => {
      if (parks.length === 1) {
        const sortedRides = parks[0].rides
          .slice()
          .sort((a, b) => b.wait_time - a.wait_time)
        setRides(sortedRides)
      } else {
        const allRides = parks.map((park) => {
            return park.rides
        })
        
        const flatRides = allRides.flat().slice().sort((a,b) => b.wait_time - a.wait_time)

        setRides(flatRides)
      }
      
    };
    updateRides();
  }, [parks]);

  return (
    <div className="d-flex flex-column w-100 align-items-center flex-grow-1">
      <section className="d-flex flex-column justify-content-center align-items-center gap-2 w-100 ride-sec">
        {rides.map((ride, i) => {
          return <WaitTimePanel key={i} ride={ride} />;
        })}
      </section>
    </div>
  );
}
