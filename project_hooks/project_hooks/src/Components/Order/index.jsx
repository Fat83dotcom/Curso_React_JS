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
        if (data.data) {
            return data.data
        }
        return {}
    }, [customerId])

    const handleFetchOrder = useCallback(async () => {
        const body = {id_customer: customerId, total: 0}
        const data = await handleSubmitPost(
            'http://127.0.0.1:8000/create_order/',
            body
        )

        if (data.data) {
            const orderData = await handleFetchSearchOrder()
            setOrderData([orderData])
            setOrderId(orderData.id)
            handleWarning(data.msg)
        } else {
            const orderDataUnauthorized = await handleFetchSearchOrder()
            setOrderId(orderDataUnauthorized.pk)
            setOrderSearchData([orderDataUnauthorized])
            handleWarning(data.msg)
        }
    }, [handleWarning, setOrderData, customerId, handleFetchSearchOrder, setOrderId])

    return (
        <>
            <Warning warning={warning}/>
            <button onClick={handleFetchOrder}>Criar Pedido</button>
            <div className='container-order-main'>
                <OrderDisplay
                    handleFetchOrder={handleFetchOrder}
                    orderData={orderData}
                    orderSearchData={orderSearchData}
                    handleChangePage={handleChangePage}
                />
                <OrderAppendItems orderId={orderId}/>
            </div>
            <button onClick={handleChangePage}>Voltar à página anterior.</button>
        </>
    )
}

Order.propTypes = {
    customerId: P.string,
    change: P.func,
}

OrderAppendItems.propTypes ={
    orderId: P.number
}

OrderListItems.propTypes = {
    orderId: P.number,
    product: P.array,
}

OrderDisplay.propTypes = {
    handleFetchOrder: P.func,
    orderData: P.array,
    orderSearchData: P.array,
    handleChangePage: P.func
}
