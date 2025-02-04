import './style.css'
import P from 'prop-types'
import { useState, useCallback} from 'react'
import { handleSubmitGet, handleSubmitPatch, handleSubmitPost } from '../../Utils/ApiCalls'
import { Warning } from '../Warning'
import { OrderDisplay } from './OrderComponents/OrderDisplay'
import { OrderAppendItems } from './OrderComponents/OrderAppendItems'
import { useEffect } from 'react'

export const Order = ({customerId, change}) => {
    const [warning, setWarning] = useState('')
    const [orderId, setOrderId] = useState(0)
    const [orderData, setOrderData] = useState([])
    const [orderSearchData, setOrderSearchData] = useState([])
    const [allOrders, setAllOrders] = useState([])

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

    const handleGetAllOrders = useCallback(async () => {
        const url = `http://127.0.0.1:8000/all_orders_from_customer/?id_customer=${customerId}`

        const orders = await handleSubmitGet(url)

        {orders.response === 200 ? setAllOrders(orders.data.data) : setAllOrders([])}
        {orders.response === 200 && handleFetchOrder()}
    }, [customerId, handleFetchOrder])

    const handleCloseOrder = useCallback(async () => {
        if (orderId === 0) {
            alert('Crie um pedido.')
        } else {
            const choice = window.confirm('Após está ação, não será possivel adicionar mais produtos, deseja continuar?')
            const url = `http://127.0.0.1:8000/close_order/`
            const body = {
                id: orderId,
                order_status: false
            }
            {choice && await handleSubmitPatch(url, body)}
            {choice && await handleGetAllOrders()}
        }
    }, [orderId, handleGetAllOrders])

    const handleUpdateOrder = useCallback(async () => {
        const orderUpdate = await handleFetchSearchOrder()
        setOrderData([orderUpdate.data])
        setOrderSearchData([orderUpdate.data])
        await handleGetAllOrders()
    }, [handleFetchSearchOrder, handleGetAllOrders])

    const handleTriggerProductItems = (getitems) => {
        getitems()
    }

    useEffect(() => {
        const fetch = async () => {
            await handleGetAllOrders()
        }
        fetch()
    }, [])

    return (
        <>
            <Warning warning={warning}/>
            <button onClick={handleFetchOrder}>Criar Pedido</button>
            <div className='container-order-main'>
                <OrderDisplay
                    orderData={orderData}
                    orderAllData={allOrders}
                    orderSearchData={orderSearchData}
                    handleChangePage={handleChangePage}
                    handleCloseOrder={() => handleCloseOrder()}
                    handleFetchOrder={() => handleFetchOrder(true)}
                />
                <OrderAppendItems
                    orderId={orderId}
                    idCustomer={customerId}
                    handleFetchOrder={() => handleUpdateOrder()}
                    triggerItems={(trigger) => handleTriggerProductItems(trigger)}
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
