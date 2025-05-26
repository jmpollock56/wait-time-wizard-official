import React, { useState, useEffect } from "react";
import "../style/Search.css";

export default function Search({
  parkOptions,
  changeSelectedPark,
  currentPark,
}) {
  const [selectedParkId, setSelectedParkId] = useState(currentPark);

  useEffect(() => {
    setSelectedParkId(currentPark);
  }, [currentPark]);

  function handleParkChange(e) {
    const newId = Number(e.target.value);
    setSelectedParkId(newId);
    changeSelectedPark(newId);
  }

  return (
    <section className="w-25 search-sec">
        <select
          name="parkName"
          className="w-75 form-select form-select-lg"
          value={selectedParkId}
          onChange={handleParkChange}
        >
          {parkOptions.map((park) => (
            <option value={park.id} key={park.id}>
              {park.name}
            </option>
          ))}
        </select>    
    </section>
  );
}
