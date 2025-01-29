import { useEffect, useState, useCallback } from 'react'
import './style.css'
import P from 'prop-types'
import { handleSubmitPost } from '../../Utils/ApiCalls'
import { Warning } from '../Warning'


export const Order = ({customerId, change}) => {

    const [warning, setWarning] = useState('teste')

    const handleChangePage = useCallback(() => {
        change('orderForm')
    }, [change])

    const handleWarning = useCallback(async (msg) => {
        setWarning(msg)
        await new Promise((resolve) => setTimeout(() => {setWarning(''); resolve()}, 3000))
    }, [setWarning])

    const handleFetchOrder = useCallback(async() => {
        const body = {id_customer: customerId, total: 0}
        const data = await handleSubmitPost(
            'http://127.0.0.1:8000/create_order/',
            body
        )
        handleWarning(data.msg)
        console.log(data);
    }, [handleWarning, customerId])

    useEffect(() => {
        handleFetchOrder()
    }, [])

    return (
        <>
            <Warning warning={warning}/>
            <p>{customerId}</p>
            <button onClick={handleChangePage}>Voltar à página anterior.</button>
        </>
    )
}

Order.propTypes = {
    customerId: P.number,
    change: P.func,
}
