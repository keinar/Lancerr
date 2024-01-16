import React, { useState } from 'react'
import { addGig } from '../store/actions/gig.actions'

export default function CreateGig() {
  const [gig,setGig] = useState({
    
    "title": "",
    "price": 0,
    "owner": {
      "_id": "u101",
      "fullname": "Dudu Da",
      "imgUrl": "url",
      "level": "basic/premium",
      "rate": 4
    },
    "daysToMake": 1,
    "description": "",
    "imgUrl": "",
    "tags": [],
    "likedByUsers": [] // for user-wishlist : use $in
  })

  function onChange(ev){
    setGig({...gig, [ev.target.id]:ev.target.value})
  }

  function onSubmit(ev){
    ev.preventDefault()
    addGig(gig)
  }
  return (
    <form onSubmit={onSubmit}>
      <input type="text" id='title' placeholder='type your title here' value={gig.title} onChange={onChange} required />
      <input type="number" id='price' placeholder='Enter Price' min = '0' value={gig.price} onChange={onChange} required/>
      <button>Create</button>
    </form>
  )
}
