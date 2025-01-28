import { useCallback, useState } from 'react'
import './style.css'
import { handleSubmitGet } from '../../Utils/ApiCalls'
import { Warning } from '../Warning'
import { Form } from './form'
import P from 'prop-types'



export const OrderForm = ({change, customId}) => {
    const [warning, setWarning] = useState('')
    const [searchCustomer, setSearchCustomer] = useState('')
    const [customerSearched, setCustomerSearched] = useState([])
    const [customerId, setCustomerId] = useState(0)

    const handleClearForm = () => {
        setSearchCustomer('')
    }

    const handleSearchClick = async () => {
        if (searchCustomer) {
            const url = `http://127.0.0.1:8000/search_customer/?search_name=${searchCustomer}`
            const data = await handleSubmitGet(url)
            console.log(data.msg);
            if (data.msg === 'Sucesso.'){
                setCustomerSearched(data.data)
                handleClearForm()
                handleWarning(data.msg)
                console.log(data.data);
            }
            if (data.msg === 'Not Found') {
                setCustomerSearched([])
                handleWarning('Não Encontrado.')
            }
            if (data.msg === 'TypeError: Failed to fetch') {
                setCustomerSearched([])
                handleWarning('Verificar conexão com a internet.')
            }
        } else {
            handleWarning('Campo vazio.')
            setCustomerSearched([])
        }
    }

    const handleOrderCustomerId = (e) => {
        const id = e.target.text
        setCustomerId(id)
        customId(customerId)
        change('order')
        console.log(id)
    }

    const handleWarning = useCallback(async (msg) => {
        setWarning(msg)
        await new Promise(() => setTimeout(() => {setWarning('')}, 3000))
    }, [setWarning])

    const handleOnChangeCustomerSearch = (e) => {
        const customer = e.target.value
        setSearchCustomer(customer)
    }

    return (
        <>
            <div className='conteiner'>
                <div className='form-container'>
                    <label htmlFor="customer">Buscar por Cliente</label>
                    <input onChange={handleOnChangeCustomerSearch} value={searchCustomer} type="search" name="customer" id="customer" />
                    <button onClick={handleSearchClick}>Buscar</button>
                </div>
                <div className='found-container'>
                    <h2>Clientes Encontrados:</h2>
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
            <Warning warning={warning}/>
        </>
    )
}
