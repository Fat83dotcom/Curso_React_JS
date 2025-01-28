import './style.css'
import P from 'prop-types'

export const Form = (
        {handleOnChangeCustomerSearch,
        searchCustomer,
        handleSearchClick,
        customerSearched=[],
        handleOrderCustomerId}
    ) => {

    return (
        <>
            <div className='conteiner'>
                <div className='form-container'>
                    <label htmlFor="customer">Buscar por Cliente</label>
                    <input onChange={handleOnChangeCustomerSearch} value={searchCustomer} type="search" name="customer" id="customer" />
                    <button onClick={handleSearchClick}>Buscar</button>
                </div>
                <div className='found-container'>
                    <h2>Cique no código para iniciar uma venda:</h2>
                    {customerSearched.map((customer) => {
                        return (
                            <div className='customer-container' key={customer.id}>
                                <a onClick={handleOrderCustomerId}>{customer.id}</a>
                                <p>{customer.name}</p>
                                <p>{customer.second_name}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}


Form.propTypes = {
    handleOnChangeCustomerSearch: P.func,
    searchCustomer: P.string,
    handleSearchClick: P.func,
    customerSearched: P.array,
    handleOrderCustomerId: P.func
}
