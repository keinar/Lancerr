import { useState } from 'react'
import { addGig } from '../store/actions/gig.actions'
import { Label } from '@mui/icons-material'
import { gigService } from '../services/gig.service.local'
import { saveGig } from '../store/actions/gig.actions.js'
import { useNavigate } from 'react-router'

export function NewGig() {
  const [gig, setGig] = useState(gigService.getEmptyGig())
  const navigate = useNavigate()

  function onChange(ev) {
    setGig({ ...gig, [ev.target.id]: ev.target.value })
  }

  function handleChange({ target }) {
    let { name: field, value, type } = target
    setGig((prevGig) => ({ ...prevGig, [field]: value }))
}

  async function onSubmitGig(ev) {
    ev.preventDefault()
    try {
        saveGig(gig)
        navigate('/gig')
    } catch (err) {
        console.log('Had issues saving gig', err);
    }
}

  const { title, description } = gig
  return (
    <section className="new-gig">
      <section className="section-heading">
        <h1 className="heading">Add a gig </h1>
        <h2 className="sub-heading">Fill the required information and start earning today!</h2>
      </section>
      <form className='create-gig' onSubmit={onSubmitGig}>        
        <label className="form-label">
          <span >Upload Images</span>
          <div>upload preview</div>
        </label>
        <label htmlFor="title" className="form-label">
          <span>
            <span>Title</span>
            <small>A short title for your gig</small>
          </span>
          <input value={title} onChange={handleChange} type="text" id="title" name="title" placeholder='type your title here'   required />
        </label>
        <label htmlFor="description" className="form-label">
          <span>
            <span>Description</span>
            <small>Extended details about your provided service</small>
          </span>
          <textarea value={description} onChange={handleChange} type="text" id="description" name="description" placeholder='Write Description' required />
        </label>
        <button>Create</button>
      </form>
    </section>
  )
}


