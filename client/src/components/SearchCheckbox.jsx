import { useEffect, useState } from "react";

export default function SearchCheckbox({ park, addParkToView, removeParkFromView }) {
  const [selectedOption, setSelectedOption] = useState(false)

  useEffect(() => {
    if(selectedOption === true){
      addParkToView(park)
    } else {
      removeParkFromView(park)
    }

  },[selectedOption])

  function handleChange(e){
    const checked = e.target.checked
    setSelectedOption(checked)
    console.log(checked)
  }

  return (
    <div className="d-flex gap-2 p-2">
      <input type="checkbox" name={park.id} onChange={handleChange}/>
      <label htmlFor={park.id}>{park.name}</label>
    </div>
  );
}
