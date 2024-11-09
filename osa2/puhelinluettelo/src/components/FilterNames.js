const FilterNames = ({ value, onChange }) => {
    return(
        <div>
        Search name: <input value={value} onChange={onChange}/>
        </div>
    )
}
export default FilterNames