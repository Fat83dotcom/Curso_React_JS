import './style.css'
import P from 'prop-types'
import { useState, useCallback, useEffect } from 'react'
import { handleSubmitGet, handleSubmitPost } from '../../Utils/ApiCalls'
import { Warning } from '../Warning'

//Filhos
const OrderDisplay = ({orderData, orderSearchData}) => {
    return (
        <>
            <div className='container-order'>
                <h2>Pedido</h2>
                <div>
                    <div className='center-tables'>
                        <h3>Dados do Pedido</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Código Pedido</th>
                                    <th>Data</th>
                                    <th>Valor Total</th>
                                    <th>Status Pedido</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderData.map((data) => {
                                    return (
                                        <tr key={data.pk}>
                                            <td><a>{data.pk}</a></td>
                                            <td>{data.date}</td>
                                            <td>{data.total}</td>
                                            <td>{data.order_status ? 'Aberto' : 'Fechado'}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className='center-tables'>
                        <h3>Dados do Cliente</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Sobrenome</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderData.map((data) => {
                                    return (
                                        <tr key={data.pk}>
                                            <td>{data.customer_name}</td>
                                            <td>{data.customer_second_name}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>

                    </div>
                    <div className='center-tables'>
                    <h3>Pedidos do Cliente</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Sobrenome</th>
                                    <th>Código Pedido</th>
                                    <th>Data</th>
                                    <th>Valor Total</th>
                                    <th>Status Pedido</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderSearchData.map((data) => {
                                    return (
                                        <tr key={data.pk}>
                                            <td>{data.customer_name}</td>
                                            <td>{data.customer_second_name}</td>
                                            <td><a>{data.pk}</a></td>
                                            <td>{data.date}</td>
                                            <td>{data.total}</td>
                                            <td>{data.order_status ? 'Aberto' : 'Fechado'}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

const OrderAppendItems = () => {
    const [products, setProducts] = useState([])

    const handleFetchProducts = useCallback(async () => {
        const productData = await handleSubmitGet('http://127.0.0.1:8000/get_products/')
        if (productData.data) {
            console.log(productData);

            setProducts(productData.data)
        } else {
            setProducts([])
        }
        console.log(products)
    }, [])

    useEffect(() =>{
        handleFetchProducts()
    }, [handleFetchProducts])
    return (
        <div>
            <h3>Adicione Produtos</h3>
            <div className='container-order'>
                <h2>Produtos</h2>
                <div>
                    <div className='center-tables'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Código Produto</th>
                                    <th>Nome</th>
                                    <th>Preço R$</th>
                                    <th>Qtd Estoque</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((data) => {
                                    return (
                                        <tr key={data.id}>
                                            <td><a>{data.id}</a></td>
                                            <td>{data.name}</td>
                                            <td>{data.price}</td>
                                            <td>{data.quantity}</td>
                                        </tr>
                                    )
                                }
                               )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

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


//Pai
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
