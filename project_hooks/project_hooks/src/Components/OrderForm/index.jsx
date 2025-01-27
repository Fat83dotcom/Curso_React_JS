import { useCallback, useState } from 'react'
import './style.css'
import { handleSubmitGet } from '../../Utils/ApiCalls'


export const OrderForm = () => {
    const [searchCustomer, setSearchCustomer] = useState('')

    const handleClearForm = () => {
        setSearchCustomer('')
    }

    const handleSearchClick = async () => {
        const url = `http://127.0.0.1:8000/search_customer/?search_name=${searchCustomer}`

        const data = await handleSubmitGet(url,handleClearForm)
        console.log(data);

    }

    const handleOnChangeCustomerSearch = useCallback((e) => {
        const customer = e.target.value
        setSearchCustomer(customer)
    }, [setSearchCustomer])

    return (
        <div className='conteiner'>
            <div className='form-container'>
                <label htmlFor="customer">Buscar por Cliente</label>
                <input onChange={handleOnChangeCustomerSearch} type="search" name="customer" id="customer" />
                <p>{searchCustomer}</p>
                <button onClick={handleSearchClick}>Buscar</button>
            </div>
        </div>
    )
}
