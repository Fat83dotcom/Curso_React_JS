import { useCallback, useState } from 'react'
import './style.css'
import { handleSubmitGet } from '../../Utils/ApiCalls'
import { Warning } from '../Warning'
import { Form } from './form'
import P from 'prop-types'
import { useDispatch } from 'react-redux'
import { changeWarning } from '../../features/warning/warningSlice'


export const OrderForm = ({change, customId}) => {
    const [searchCustomer, setSearchCustomer] = useState('')
    
    const [customerSearched, setCustomerSearched] = useState([])

    const dispatch = useDispatch()

    const handleClearForm = () => {
        setSearchCustomer('')
    }

    const handleSearchClick = useCallback(async () => {
        if (searchCustomer) {
            const url = `http://127.0.0.1:8000/search_customer/?search_name=${searchCustomer}`
            const data = await handleSubmitGet(url)

            dispatch(changeWarning(data.data.msg))

            if (data.response === 200){
                setCustomerSearched(data.data.data)
                handleClearForm()
            }

            if (data.response === 404) setCustomerSearched([])

        } else {
            dispatch(changeWarning('Campo vazio.'))
            setCustomerSearched([])
        }
    }, [dispatch, searchCustomer])

    const handleOrderCustomerId = (e) => {
        const id = e.target.text
        customId(id)
        change('order')
    }

    const handleOnChangeCustomerSearch = (e) => {
        const customer = e.target.value
        setSearchCustomer(customer)
    }

    return (
        <>
            <Warning/>
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
