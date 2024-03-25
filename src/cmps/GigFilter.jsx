import { ChevronLeft, ChevronRight } from "lucide-react"
import { setFilterBy } from "../store/actions/gig.actions.js"
import { useNavigate } from "react-router"

export function GigFilter() {
  const navigate = useNavigate()

  function handleTagClick(tag) {
    const updatedFilter = {
      tags: [tag],
    }

    const fieldsToUpdate = { ...updatedFilter }
    setFilterBy(fieldsToUpdate)
    navigate("/explore")
    window.scrollTo(0, 0)
  }

  return (
    <nav id="categories-menu-package" className="categories-menu-package default has-overflow">
      {/* <button className="nav-button left"><ChevronLeft size={16} color="#74767e"/></button> */}
      <ul className="categories">
        <li onClick={() => handleTagClick("Logo Design")}>Graphics & Design</li>
        <li onClick={() => handleTagClick("Programming & Tech")}>Programming & Tech</li>
        <li onClick={() => handleTagClick("Digital Marketing")}>Digital Marketing</li>
        <li onClick={() => handleTagClick("Video & Animation")}>Video & Animation</li>
        <li onClick={() => handleTagClick("Writing & Translation")}>Writing & Translation</li>
        <li onClick={() => handleTagClick("Music & Audio")}>Music & Audio</li>
        <li onClick={() => handleTagClick("Business")}>Business</li>
        <li onClick={() => handleTagClick("Data")}>Data</li>
        <li onClick={() => handleTagClick("Photography")}>Photography</li>
        <li onClick={() => handleTagClick("AI Services")}>AI Services</li>
      </ul>
      {/* <button className="nav-button right"><ChevronRight size={16} color="#74767e"/></button> */}
    </nav>
  )
}
