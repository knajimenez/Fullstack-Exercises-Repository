const Filter = ({ searchQuery, handleSearchQueryChange }) => {
    return (
        <div>
        Filter: <input value={searchQuery} onChange={handleSearchQueryChange} />
        </div>
    )
    }

export default Filter