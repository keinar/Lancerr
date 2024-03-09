import { useEffect, useState } from "react"

export function GigFilter({  onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState()


    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleTagClick(tag) {
        // Create a new filter with the clicked tag
        const updatedFilter = {
            ...filterByToEdit,
            tags: [tag], // Replace the existing tags with the clicked tag
        }
        setFilterByToEdit(updatedFilter)
    }


    return (
        <section className="gig-filter">
            <div className="static">
                <ul className="categories-container">
                    <button
                        className="category-button"
                        onClick={() => handleTagClick("logo-design")}
                    >
                        Logo Design
                    </button>
                    <button
                        className="category-button"
                        onClick={() => handleTagClick("Programming & Tech")}
                    >
                        Programming &amp; Tech
                    </button>
                    <button
                        className="category-button"
                        onClick={() => handleTagClick("Digital Marketing")}
                    >
                        Digital Marketing
                    </button>
                </ul>
            </div>
        </section>
    )
}