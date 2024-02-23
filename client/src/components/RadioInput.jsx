import React from "react";

export default function RadioInput({ value, setParams, params }) {
  return (
    <div className="col-4">
      <label className="me-3">
        <strong>{value.charAt(0).toUpperCase() + value.slice(1)}</strong>
      </label>
      <input
        onChange={() => setParams({ ...params, [`${value}`]: true })}
        type="radio"
        name={value}
        className="form-check-input me-2"
        checked={params[value] === true || params[value] === "true"}
      />
      Yes
      <input
        onChange={() => setParams({ ...params, [`${value}`]: false })}
        type="radio"
        name={value}
        className="form-check-input ms-3 me-2"
        checked={params[value] === false || params[value] === "false"}
        // checked={
        //   (!params[value] && params[value] !== undefined) || [`${false}`]
        // }
      />
      No
    </div>
  );
}
