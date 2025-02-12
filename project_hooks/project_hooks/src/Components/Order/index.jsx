import './style.css'
import P from 'prop-types'
import { useState, useCallback, useMemo} from 'react'
import { handleSubmitGet, handleSubmitPatch, handleSubmitPost } from '../../Utils/ApiCalls'
import { Warning } from '../Warning'
import { OrderDisplay } from './OrderComponents/OrderDisplay'
import { OrderAppendItems } from './OrderComponents/OrderAppendItems'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { changeWarning } from '../../features/warning/warningSlice'

export const Order = ({customerId, change}) => {
    const [orderId, setOrderId] = useState(0)
    const [orderData, setOrderData] = useState([])

    const [allOrders, setAllOrders] = useState([])

    const dispatch = useDispatch()

    const handleChangePage = useCallback(() => {
        change('orderForm')
    }, [change])

    const handleFetchSearchOrder = useCallback(async () => {
        const url = `http://127.0.0.1:8000/search_order/?search_order=${customerId}`
        const data = await handleSubmitGet(url)
        if (data.response === 200) return data.data

        return {}
    }, [customerId])

    const handleFetchOrder = useCallback(async () => {
        const body = {id_customer: customerId, total: 0}
        const data = await handleSubmitPost(
            'http://127.0.0.1:8000/create_order/',
            body
        )
        console.log(data.data);

        if (data.response === 201) {
            const orderData = await handleFetchSearchOrder()
            setOrderData([orderData.data])
            setOrderId(orderData.data.pk)
        } else {
            const orderDataUnauthorized = await handleFetchSearchOrder()
            setOrderId(orderDataUnauthorized.data.pk)
            setOrderData([orderDataUnauthorized.data])
        }

        return data

    }, [setOrderData, customerId, handleFetchSearchOrder, setOrderId])

    const handleGetAllOrders = useCallback(async () => {
        const url = `http://127.0.0.1:8000/all_orders_from_customer/?id_customer=${customerId}`

        const orders = await handleSubmitGet(url)

        {orders.response === 200 ? setAllOrders(orders.data.data) : setAllOrders([])}

    }, [customerId])

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
    }, [handleGetAllOrders])

    const handleCreateOrderButtonClick = async () => {
        const dataMsg = await handleFetchOrder()
        console.log(dataMsg.data);
        console.log('componente order');
        dispatch(changeWarning(dataMsg.data.msg))
    }

    const memoWarnig = useMemo(()=> <Warning/>, [])
    const memoOrderDisplay = useMemo(() => <OrderDisplay
        orderData={orderData}
        orderAllData={allOrders}
        handleCloseOrder={() => handleCloseOrder()}
    />, [allOrders, orderData, handleCloseOrder])

    return (
        <>
            {memoWarnig}
            <button onClick={handleCreateOrderButtonClick}>Criar Pedido</button>
            <div className='container-order-main'>
                {memoOrderDisplay}
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
