export default function RideTypeCheckbox({ attribute }) {
  return (
    <div className="d-flex gap-2 p-2">
      <input
        className="form-check-input pointer"
        type="checkbox"
        name={attribute}
      />
      <label htmlFor={attribute}>{attribute}</label>
    </div>
  );
}
