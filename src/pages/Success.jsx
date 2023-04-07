import React from 'react'
import {Link} from 'react-router-dom'

const success = () => {
  return (
	<div className='text-5xl font-bold p-10 text-green-500'>
    Successfully placed order . Thank You
    <Link to='/'><button className="block bg-green-400 text-white my-10 text-lg px-3 py-3 rounded-xl">Home</button></Link>
  </div>

  )
}

export default success