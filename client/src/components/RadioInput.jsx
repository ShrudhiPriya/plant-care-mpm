import React from 'react'

export default function RadioInput({value, setParams, params}) {

  return (
    <div className='col'>
        <label className='form-label me-3'><strong>{value.charAt(0).toUpperCase() + value.slice(1)}</strong></label>      
            <input 
              onClick={() => setParams({...params, [`${value}`]: true})} 
              type="radio" 
              name={value}
              className='form-check-input me-1'
              checked={params[value]}
            />Yes
            <input 
              onClick={() => setParams({...params, [`${value}`]: false})} 
              type="radio" 
              name={value}
              className='form-check-input ms-3 me-1' 
              checked={!params[value] && params[value] !== null}
            /> No
    </div>
  )
}
