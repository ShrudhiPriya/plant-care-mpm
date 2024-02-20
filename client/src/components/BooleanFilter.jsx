import React from 'react'

export default function BooleanFilter({value, setParams, params}) {

  return (
    <div>
        <label className='form-label me-3'>{value.charAt(0).toUpperCase() + value.slice(1)}</label>      
            <input onClick={() => setParams({...params, [`${value}`]: true})} type="radio" name={value} className='form-check-input' /> Yes
            <input onClick={() => setParams({...params, [`${value}`]: false})} type="radio" name={value} className='form-check-input ms-3' /> No
    </div>
  )
}
