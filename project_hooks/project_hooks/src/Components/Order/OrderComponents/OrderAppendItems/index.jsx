import P from 'prop-types'
import { OrderListItems } from '../OrderListItems'
import { SelectCategory } from '../../../CategorySelect'
import { handleSubmitGet, handleSubmitPost } from '../../../../Utils/ApiCalls'
import { useState, useCallback, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { changeWarning } from '../../../../features/warning/warningSlice'

export const OrderAppendItems = ({orderId, triggerItems, handleFetchOrder}) => {
    const [products, setProducts] = useState([])
    const [chosenProduct, setChosenProduct] = useState([])

    const [productCategory, setProductCategory] = useState([])

    const [categoryId, setCategoryId] = useState('')
    const [productName, setProductName] = useState('')

    const [lastFuncProductCall, setLastFuncProductCall] = useState()

    const dispatch = useDispatch()

    const productCategoryData = useCallback(async () => {
        const data = await handleSubmitGet('http://127.0.0.1:8000/search_product_category/')
        setProductCategory(data.data.data)
        return data
    }, [])

    const handleFetchProducts = useCallback(async () => {
        const productData = await handleSubmitGet('http://127.0.0.1:8000/get_products/')

        setLastFuncProductCall('handleFetchProducts')
        {productData.data ? setProducts(productData.data.data) : setProducts([])}

        return
    }, [setLastFuncProductCall])

    const handleSearchProductByCategory = useCallback(async () => {
        const url = `http://127.0.0.1:8000/search_product_by_category/?search_category=${categoryId}`
        const categoryData = await handleSubmitGet(url)

        setLastFuncProductCall('handleClickSearchProductByCategory')

        {categoryData.data.data ? setProducts(categoryData.data.data) : setProducts([])}

        return categoryData
    }, [categoryId, setLastFuncProductCall])

    const handleSearchProductByName =useCallback(async () => {
        const url = `http://127.0.0.1:8000/search_product_by_name/?search_name=${productName}`
        const productNameData = await handleSubmitGet(url)

        setLastFuncProductCall('handleClickSearchProductByName')

        {productNameData.data.data ? setProducts(productNameData.data.data) :  setProducts([])}

        return productNameData
    }, [productName, setLastFuncProductCall])

    const getProductsByOrder = useCallback(async (order_id) => {
        const url = `http://127.0.0.1:8000/search_products_by_order/?products_by_order=${order_id}`
        const product = await handleSubmitGet(url)

        {product.response === 200 ? setChosenProduct(product.data.data) : setChosenProduct([])}
    }, [])

    const callLastProductFunc = useCallback(async () => {
        {lastFuncProductCall === 'handleFetchProducts' && handleFetchProducts()}
        {lastFuncProductCall === 'handleClickSearchProductByCategory' && handleSearchProductByCategory()}
        {lastFuncProductCall === 'handleClickSearchProductByName' && handleSearchProductByName()}
    }, [
        handleFetchProducts, handleSearchProductByCategory,
        handleSearchProductByName,lastFuncProductCall
    ])

    const handleAppendProduct = useCallback(async (e) => {
        if (orderId !== 0) {
            const row = e.currentTarget

            const id = row.children[0].innerText;
            const name = row.children[1].innerText;
            const price = row.children[2].innerText;

            const product = {
                id,
                orderId : orderId,
                name,
                price,
                quantity: 1,
            };

            const url = 'http://127.0.0.1:8000/append_items/'
            const body = {
                id_order: orderId,
                id_product: product.id,
                quantity: product.quantity
            }
            const saveProductsOnDB = await handleSubmitPost(url, body)

            if (saveProductsOnDB.response === 200) {

                await callLastProductFunc() // Recarrega sempre a ultima função de busca de produtos chamada
                handleFetchOrder() // Recarrega os pedidos no elemento Order
            }
            return saveProductsOnDB
        } else {
            dispatch(changeWarning('Crie um pedido.'))
        }
    }, [handleFetchOrder, orderId, callLastProductFunc, dispatch])

    const handleSelectChangeProduct = (e) => {
        const value = e.target.value
        setCategoryId(value)
    }

    const handleInputChangeProduct = (e) => {
        const value = e.target.value
        setProductName(value)
    }

    useEffect(() => {
        const fetch = async() => {
            await getProductsByOrder(orderId)
        }
        fetch()
    }, [triggerItems,getProductsByOrder, orderId])

    useEffect(() => {
        productCategoryData()
    }, [productCategoryData])

    useEffect(() => {
        handleFetchProducts()
    }, [handleFetchProducts])

    const handleClickSearchProductByCategory =  async () => {
        const msgData = await handleSearchProductByCategory()
        {msgData.response !== 200 && dispatch(changeWarning(msgData.data.msg))}
    }

    const handleClickSearchProductByName =  async () => {
        const msgData = await handleSearchProductByName()
        {msgData.response !== 200 && dispatch(changeWarning(msgData.data.msg))}
    }

    return (
        <>
        <div>
            <h3>Adicione Produtos</h3>
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
                                        <tr onClick={handleAppendProduct} className='click-product' key={data.id}>
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
        <div>
            <OrderListItems
                product={chosenProduct}
                reloadListItemsTrrigger={async(order_id) => await getProductsByOrder(order_id)}
                reloadProductstrigger={async() => await handleFetchProducts()}
                reloadOrderTrigger={() => handleFetchOrder()}
            />
        </div>
        </>
    )
}

OrderAppendItems.propTypes ={
    idCustomer: P.string,
    orderId: P.number,
    triggerItems: P.func,
    handleFetchOrder: P.func,
}
