import { useCallback, useEffect, useState } from 'react'
import './style.css'
import { handleSubmitGet } from '../../Utils/ApiCalls'
import { Warning } from '../Warning'
import { Form } from './form'
import P from 'prop-types'



export const OrderForm = ({change, customId}) => {
    const [warning, setWarning] = useState('')
    const [searchCustomer, setSearchCustomer] = useState('')
    const [customerSearched, setCustomerSearched] = useState([])

    const handleClearForm = () => {
        setSearchCustomer('')
    }

    const handleSearchClick = async () => {
        if (searchCustomer) {
            const url = `http://127.0.0.1:8000/search_customer/?search_name=${searchCustomer}`
            const data = await handleSubmitGet(url)
            // console.log(data.msg);
            if (data.msg === 'Sucesso.'){
                setCustomerSearched(data.data)
                handleClearForm()
                handleWarning(data.msg)
                // console.log(data.data);
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
        customId(id)
        change('order')
        // console.log(id)
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
            <Warning warning={warning}/>
            <Form
                handleOnChangeCustomerSearch={handleOnChangeCustomerSearch}
                searchCustomer={searchCustomer}
                handleSearchClick={handleSearchClick}
                customerSearched={customerSearched}
                handleOrderCustomerId={handleOrderCustomerId}
            />
        </>
    )
}

OrderForm.propTypes = {
    change: P.func,
    customId: P.func,
}
