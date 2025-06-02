import { useEffect, useState } from "react";

export default function RideTypeCheckbox({
  attribute,
  addAttributeFilter,
  removeAttributeFilter,
}) {
  const [selectedAttribute, setSelectedAttribute] = useState(false)

  useEffect(() => {
    if(selectedAttribute === true){
      addAttributeFilter(attribute)
    } else {
      removeAttributeFilter(attribute)
    }
  }, [selectedAttribute])

  function handleChange(e) {
    const checked = e.target.checked
    setSelectedAttribute(checked)
  }

  return (
    <div className="d-flex gap-2 p-2">
      <input
        className="form-check-input pointer"
        type="checkbox"
        name={attribute}
        onChange={handleChange}
      />
      <label htmlFor={attribute}>{attribute}</label>
    </div>
  );
}
