import './style.css'

// eslint-disable-next-line react/prop-types
export const SearchInput = ({ searchValue, handleChange }) => {
    return (
        <div className='search-style'>
            {!!searchValue && (<><label htmlFor="search">Texto Digitado -&gt; {searchValue}</label></>)}
            <input className='search-input-style' type="search" name='search' onChange={handleChange}/>
        </div>
    )
}