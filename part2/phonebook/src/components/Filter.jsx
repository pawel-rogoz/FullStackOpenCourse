function Filter({ filterValue, setFilterValue}) {
    const handleFilterValueChange = (event) => {
        setFilterValue(event.target.value)
    }

    return (
        <div>
        filter shown with <input value={filterValue} onChange={handleFilterValueChange} />
        </div>
    )
}

export default Filter