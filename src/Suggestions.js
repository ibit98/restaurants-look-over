import React from 'react'

const Suggestions = (props) => {
  const options = props.results.map( r => <ul text-align= 'left' key={r.restaurant.id} onClick={() => {props.method(r.restaurant);
  }}>{r.restaurant.name}</ul>)
  return (
    <div> {options}</div>
  )
}

export default Suggestions
