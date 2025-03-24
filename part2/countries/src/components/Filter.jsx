const Filter = ({ searchQuery, handleSearchQueryChange }) => {
    return (
        <div>
        Find Countries: <input value={searchQuery} onChange={handleSearchQueryChange} />
        </div>
    )
    }

export default Filter