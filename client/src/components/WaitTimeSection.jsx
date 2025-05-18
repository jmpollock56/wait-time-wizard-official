import React, { useEffect, useState } from "react";
import WaitTimePanel from "./WaitTimePanel";
import '../style/WaitTimeSection.css'

export default function WaitTimeSection({ park }) {
    const [rides, setRides] = useState([])

    useEffect(() => {
        const updateRides = () => {
            if(park?.rides){
                const sortedRides = park.rides
                .slice()
                .sort((a, b) => b.wait_time - a.wait_time)
                setRides(sortedRides)
            }
        }
        updateRides()
    },[park])

  

  return (
    <div className="d-flex flex-column w-75 align-items-center bg-warning" style={{ height: "100%" }}>
        <div>{park.name}</div>
        <section className="d-flex flex-column justify-content-center align-items-center gap-2 w-100 ride-sec">
            {rides.map((ride, i) => {
            
                return <WaitTimePanel key={i} ride={ride} />;
            
            })}
        </section>
    </div>
  );
}
