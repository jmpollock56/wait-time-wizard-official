import React, { useEffect, useState } from "react";
import WaitTimePanel from "./WaitTimePanel";
import "../style/WaitTimeSection.css";

export default function WaitTimeSection({ parks, filteredParks }) {
  const [rides, setRides] = useState([]);

  useEffect(() => {
    const updateRides = () => {
      
      if (filteredParks.length === 0 && parks.length === 1) {  
        console.log('1')
        const sortedRides = parks[0].rides
          .slice()
          .sort((a, b) => b.wait_time - a.wait_time)
        setRides(sortedRides)

      } else if (filteredParks.length > 0){
          console.log('2')
          const filteredRides = filteredParks.map((park) => {
            return park.rides
          })
          console.log(filteredRides, '2', filteredParks)
          const flatFilteredRides = filteredRides.flat().slice().sort((a,b) => b.wait_time - a.wait_time)
          console.log('flat',flatFilteredRides)
          setRides(flatFilteredRides)

      } else {
       console.log('3')
        const allRides = parks.map((park) => {
            return park.rides
        })
        
        const flatRides = allRides.flat().slice().sort((a,b) => b.wait_time - a.wait_time)

        setRides(flatRides)
      }
      
    };
    updateRides();
  }, [parks, filteredParks]);

  console.log(rides)
  return (
    <div className="d-flex flex-column w-75 align-items-center flex-grow-1 p-2">
      <section className="d-flex flex-column gap-2 w-100 ride-sec">
        {(rides.length > 0) ? rides.map((ride, i) => {
          return <WaitTimePanel key={i} ride={ride} />
     }) : (
        <div>Choose a Park</div>
        )}
      </section>
    </div>
  );
}
