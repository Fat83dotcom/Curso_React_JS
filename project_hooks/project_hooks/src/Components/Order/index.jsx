import './style.css'
import P from 'prop-types'
import { useState, useCallback, useEffect } from 'react'
import { handleSubmitGet, handleSubmitPost } from '../../Utils/ApiCalls'
import { Warning } from '../Warning'
import { SelectCategory } from '../CategorySelect'


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
                                {orderSearchData ? orderSearchData.map((data) => {
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
                                }) : <p></p>}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

const OrderAppendItems = ({orderId}) => {
    const [products, setProducts] = useState([])
    const [chosenProduct, setChosenProduct] = useState([])
    const [productCategory, setProductCategory] = useState([])

    const [productByName, setProductByName] = useState([])
    const [productByCategory, setProductByCategory] = useState([])

    const [categoryId, setCategoryId] = useState('')
    const [productName, setProductName] = useState('')

    const [warning, setWarning] = useState('')

    const productCategoryData = useCallback(async () => {
        const data = await handleSubmitGet('http://127.0.0.1:8000/search_product_category/')
        console.log(data.data.data);

        setProductCategory(data.data.data)
    }, [])

    const handleFetchProducts = useCallback(async () => {
        const productData = await handleSubmitGet('http://127.0.0.1:8000/get_products/')
        console.log(productData.data);

        if (productData.data) {
            setProducts(productData.data.data)
            setProductByCategory([])
        } else {
            setProducts([])
        }
    }, [])

    const handleWarning = useCallback(async (msg) => {
        setWarning(msg)
        await new Promise((resolve) => setTimeout(() => {setWarning(''); resolve()}, 3000))
    }, [setWarning])

    const handleClickSearchProductByCategory = useCallback(async () => {
        const url = `http://127.0.0.1:8000/search_product_by_category/?search_category=${categoryId}`
        const categoryData = await handleSubmitGet(url)
        console.log(categoryData.data.data);

        if (categoryData.data.data) {
            setProductByCategory(categoryData.data.data)
            setProductByName([])
            setProducts([])
        } else {
            handleWarning('Não encontrado.')
            setProductByCategory([])
        }
    }, [categoryId, handleWarning])

    const handleClickSearchProductByName =useCallback(async () => {
        const url = `http://127.0.0.1:8000/search_product_by_name/?search_name=${productName}`
        const productNameData = await handleSubmitGet(url)
        if (productNameData.data.data) {
            setProductByName(productNameData.data.data)
            setProductByCategory([])
            setProducts([])
        } else {
            handleWarning('Não encontrado.')
            setProductByName([])
        }
    }, [productName, handleWarning])

    const handleClickAppendProduct = async (e) => {
        if (orderId !== 0) {
            const row = e.currentTarget

            const id = row.children[0].innerText;
            const name = row.children[1].innerText;
            const price = row.children[2].innerText;

            const product = {
                id,
                name,
                price,
                quantity: 1,
                orderId : orderId,
            };
            const url = 'http://127.0.0.1:8000/append_items/'
            const body = {
                id_order: orderId,
                id_product: product.id,
                quantity: product.quantity
            }
            const saveProductsOnDB = await handleSubmitPost(url, body)
            handleWarning(saveProductsOnDB.msg.msg)

            if (saveProductsOnDB.response === 200) {
                console.log(saveProductsOnDB.response);
                setChosenProduct((chosenProduct) => ([...chosenProduct, product]))
            }
            console.log(saveProductsOnDB.msg);
        }
        else {
            handleWarning('Crie um pedido.')
        }
    }

    const handleSelectChangeProduct = (e) => {
        const value = e.target.value
        setCategoryId(value)
        console.log(categoryId);
    }

    const handleInputChangeProduct = (e) => {
        const value = e.target.value
        setProductName(value)
    }

    useEffect(() => {
        productCategoryData()
    }, [productCategoryData])

    useEffect(() =>{
        handleFetchProducts()
    }, [handleFetchProducts])

    return (
        <>
        <div>
            <h3>Adicione Produtos</h3>
            <Warning warning={warning}/>
            <div className='container-search-products-order'>
                <div className='search-products-order'>
                    <h5>Buscar por Nome:</h5>
                    <input onChange={handleInputChangeProduct} type="text" value={productName} name="product-name" id="product-name" />
                    <button onClick={handleClickSearchProductByName}>Buscar</button>
                </div>
                <div className='search-products-order'>
                    <h5>Buscar por Categoria:</h5>
                    <div className='select-category'>
                        <SelectCategory
                            handleChangeProduct={handleSelectChangeProduct}
                            productCategory={productCategory}
                        />
                    </div>
                    <button onClick={handleClickSearchProductByCategory}>Buscar</button>
                </div>
            </div>
            <div className='container-order'>
                <h2>Produtos</h2>
                <h5>Clique nos produtos para adicionar</h5>
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
                                {products && products.map((data) => {
                                    return (
                                        <tr onClick={handleClickAppendProduct} className='click-product' key={data.id}>
                                            <td><a>{data.id}</a></td>
                                            <td>{data.name}</td>
                                            <td>{data.price}</td>
                                            <td>{data.quantity}</td>
                                        </tr>
                                    )
                                }
                               )}
                               {productByCategory && productByCategory.map((data) => {
                                return (
                                    <tr onClick={handleClickAppendProduct} className='click-product' key={data.id}>
                                        <td><a>{data.id}</a></td>
                                        <td>{data.name}</td>
                                        <td>{data.price}</td>
                                        <td>{data.quantity}</td>
                                    </tr>
                                )
                               })}
                                {productByName && productByName.map((data) => {
                                    return (
                                        <tr onClick={handleClickAppendProduct} className='click-product' key={data.id}>
                                            <td><a>{data.id}</a></td>
                                            <td>{data.name}</td>
                                            <td>{data.price}</td>
                                            <td>{data.quantity}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <OrderListItems product={chosenProduct}/>
        </div>
        </>
    )
}

const OrderListItems = ({product}) => {

    useEffect(() => {
        console.log(product);

    }, [product])
    console.log(product)
    return (
        <div className='container-items'>
            <h3>Lista de itens</h3>

            <div className='center-tables'>
                    <table>
                        <thead>
                            <tr>
                                <th>código Pedido</th>
                                <th>Código Produto</th>
                                <th>Nome</th>
                                <th>Preço R$</th>
                                <th>Qtd</th>
                            </tr>
                        </thead>
                        <tbody>
                            {product && product.map((data, index) => {
                                return (
                                    <tr  className='click-product' key={index}>
                                        <td><a>{data.orderId}</a></td>
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
    )
}

//Pai
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
