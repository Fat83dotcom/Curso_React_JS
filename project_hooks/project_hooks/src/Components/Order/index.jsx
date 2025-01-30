import { useState, useCallback } from 'react'
import './style.css'
import P from 'prop-types'
import { handleSubmitGet, handleSubmitPost } from '../../Utils/ApiCalls'
import { Warning } from '../Warning'

const OrderDisplay = ({orderData, orderSearchData}) => {
    return (
        <>
           
                <div className='container-order'>
                    <h2>Pedido</h2>
                    <div>
                        <div>
                            <h3>Dados do Pedido</h3>
                            {orderData.map((data) => {
                                return (
                                    <div className='order-customer-open' key={data.pk}>
                                        <div>
                                        <p>Código Pedido</p>
                                        <a>{data.pk}</a>
                                        </div>
                                        <div>
                                        <p>Data</p>
                                        <p>{data.date}</p>
                                        </div>
                                        <div>
                                        <p>Valor Total</p>
                                        <p>{data.total}</p>
                                        </div>
                                        <div>
                                        <p>Status Pedido</p>
                                        <p>{data.order_status ? 'Aberto' : 'Ferchado'}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div>
                            <h3>Dados do Cliente</h3>
                            {orderData.map((data) => {
                                return (
                                    <div className='order-customer-open' key={data.pk}>
                                        <div>
                                        <p>Nome</p>
                                        <p>{data.customer_name}</p>
                                        </div>
                                        <div>
                                        <p>Sobrenome</p>
                                        <p>{data.customer_second_name}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div>
                            <h3>Pedidos do Cliente</h3>
                            {orderSearchData.map((data) => {
                                return (
                                    <div className='order-customer-open' key={data.pk}>
                                        <div>
                                        <p>Nome</p>
                                        <p>{data.customer_name}</p>
                                        </div>
                                        <div>
                                        <p>Sobrenome</p>
                                        <p>{data.customer_second_name}</p>
                                        </div>
                                        <div>
                                        <p>Código Pedido</p>
                                        <a>{data.pk}</a>
                                        </div>
                                        <div>
                                        <p>Data</p>
                                        <p>{data.date}</p>
                                        </div>
                                        <div>
                                        <p>Valor Total</p>
                                        <p>{data.total}</p>
                                        </div>
                                        <div>
                                        <p>Status Pedido</p>
                                        <p>{data.order_status ? 'Aberto' : 'Ferchado'}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
               
            
        </>
    )
}

const OrderAppendItems = () => {
    return (
        <div>
            <h3>Adicione Produtos</h3>
            
        </div>
    )
}

const OrderListItems = () => {
    return (
        <div className='container-items'>
            <h3>Lista de itens</h3>
        </div>
    )
}

export const Order = ({customerId, change}) => {

    const [warning, setWarning] = useState('')
    const [orderCode, setOrderCode] = useState('')
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
            handleWarning(data.msg)
        } else {
            const orderDataUnauthorized = await handleFetchSearchOrder()
            setOrderSearchData([orderDataUnauthorized])
            handleWarning(data.msg)
        }
    }, [handleWarning, setOrderData, customerId, handleFetchSearchOrder])

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
                <OrderAppendItems/>
                <OrderListItems/>
            </div>
            <button onClick={handleChangePage}>Voltar à página anterior.</button>
        </>
    )
}

Order.propTypes = {
    customerId: P.string,
    change: P.func,
}

OrderDisplay.propTypes = {
    handleFetchOrder: P.func,
    orderData: P.array,
    orderSearchData: P.array,
    handleChangePage: P.func
}
