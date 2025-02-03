import './style.css'
import P from 'prop-types'
import { useState, useCallback} from 'react'
import { handleSubmitGet, handleSubmitPost } from '../../Utils/ApiCalls'
import { Warning } from '../Warning'
import { OrderDisplay } from './OrderComponents/OrderDisplay'
import { OrderAppendItems } from './OrderComponents/OrderAppendItems'

export const Order = ({customerId, change}) => {
    const [warning, setWarning] = useState('')
    const [orderId, setOrderId] = useState(0)
    const [orderData, setOrderData] = useState([])
    const [orderSearchData, setOrderSearchData] = useState([])

    const handleChangePage = useCallback(() => {
        change('orderForm')
    }, [change])

    const handleWarning = useCallback(async (msg) => {
        setWarning(msg)
        await new Promise((resolve) => setTimeout(() => {setWarning(''); resolve()}, 3000))
    }, [setWarning])

    const handleFetchSearchOrder = useCallback(async () => {
        const url = `http://127.0.0.1:8000/search_order/?search_order=${customerId}`
        const data = await handleSubmitGet(url)
        if (data.response === 200) {
            return data.data
        }
        return {}
    }, [customerId])

    const handleFetchOrder = useCallback(async (msgCondition) => {
        const body = {id_customer: customerId, total: 0}
        const data = await handleSubmitPost(
            'http://127.0.0.1:8000/create_order/',
            body
        )

        if (data.response === 200) {
            const orderData = await handleFetchSearchOrder()
            setOrderData([orderData.data])
            setOrderId(orderData.id)
            await handleWarning(data.msg)
        } else {
            {msgCondition && handleWarning(data.data.msg)}
            const orderDataUnauthorized = await handleFetchSearchOrder()
            setOrderId(orderDataUnauthorized.data.pk)
            setOrderData([orderDataUnauthorized.data])
            setOrderSearchData([orderDataUnauthorized.data])
        }
    }, [handleWarning, setOrderData, customerId, handleFetchSearchOrder, setOrderId])

    const handleUpdateOrder = useCallback( async () => {
        const orderUpdate = await handleFetchSearchOrder()
        setOrderData([orderUpdate.data])
        setOrderSearchData([orderUpdate.data])
    }, [handleFetchSearchOrder])

    const handleTriggerProductItems = (getitems) =>{
        getitems()
    }

    return (
        <>
            <Warning warning={warning}/>
            <button onClick={handleFetchOrder}>Criar Pedido</button>
            <div className='container-order-main'>
                <OrderDisplay
                    handleFetchOrder={() => handleFetchOrder(true)}
                    orderData={orderData}
                    orderSearchData={orderSearchData}
                    handleChangePage={handleChangePage}
                />
                <OrderAppendItems
                    triggerItems={(trigger) => handleTriggerProductItems(trigger)}
                    orderId={orderId}
                    handleFetchOrder={() => handleUpdateOrder()}
                />
            </div>
            <button onClick={handleChangePage}>Voltar à página anterior.</button>
        </>
    )
}

Order.propTypes = {
    customerId: P.string,
    change: P.func,
}
