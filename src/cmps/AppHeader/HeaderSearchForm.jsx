import { Search } from "lucide-react"
import React, { useState } from "react"
import { useNavigate } from "react-router"
import { setFilterBy } from "../../store/actions/gig.actions"
import { store } from "../../store/store.js"

export default function HeaderSearchForm() {
  const [longPlaceholderValue, setLongPlaceholderValue] = useState("")
  const filterBy = store.getState().gigModule.filterBy
  const navigate = useNavigate()

  function handleClick(inputValue) {
    const updatedFilter = {
      txt: inputValue,
    }
    if (!inputValue) return
    // const fieldsToUpdate = { ...filterBy, ...updatedFilter }
    const fieldsToUpdate = { ...updatedFilter }
    setFilterBy(fieldsToUpdate)
    navigate("/explore")
    window.scrollTo(0, 0)
  }
  return (
    <form>
      <input type="search" className="short-placeholder" placeholder="Find services" />
      <input type="search" className="long-placeholder" placeholder="What service are you looking for today?" value={longPlaceholderValue} onChange={e => setLongPlaceholderValue(e.target.value)} />
      <button type="button" className="submit-button" onClick={() => handleClick(longPlaceholderValue)}>
        <Search size={18} color="white" />
      </button>
    </form>
  )
}
