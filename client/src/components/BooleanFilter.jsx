import React from 'react'

export default function BooleanFilter({value, setParams, params}) {

  return (
    <div>
        <label>{value.charAt(0).toUpperCase() + value.slice(1)}</label>      
            <input onClick={() => setParams({...params, [`${value}`]: true})} type="radio" name={value} />Yes
            <input onClick={() => setParams({...params, [`${value}`]: false})} type="radio" name={value} />No
    </div>
  )
}
