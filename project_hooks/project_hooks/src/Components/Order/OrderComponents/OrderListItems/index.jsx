import P from 'prop-types'
import { useEffect, useState, useCallback } from 'react';
import { handleSubmitDelete } from '../../../../Utils/ApiCalls';
import { Warning } from '../../../Warning';


export const OrderListItems = (
    {product, reloadListItemsTrrigger, reloadProductstrigger, reloadOrderTrigger}
) => {

    const [productList, setProductList] = useState([])
    const [warning, setWarning] = useState('')

    const handleWarning = useCallback((msg) => {
        setWarning(msg)
        setTimeout(() => {setWarning('')}, 3000)
    }, [setWarning])


    const handleDeleteItem = async (index) =>{
       console.log(productList[index].id_order_items);
       const id_item = productList[index].id_order_items
       const id_order = productList[index].id_order
       const id_product = productList[index].id_product
       const quantity = productList[index].quantity
       const url = `http://127.0.0.1:8000/delete_items/${id_item}/${id_order}/${id_product}/${quantity}/`

       const result = await handleSubmitDelete(url)

       reloadListItemsTrrigger(id_order)
       reloadProductstrigger()
       reloadOrderTrigger()
       handleWarning(result.data)
       console.log(result.data.msg);
    }


    useEffect(() =>{
        console.log(product);
        {product && setProductList(product)}
    }, [product])


    return (
        <div className='container-items'>
            <h3>Lista de itens</h3>
            <Warning warning={warning}/>
            <h5>Clique nos itens para excluir.</h5>
            <div className='center-tables'>
                <table>
                    {productList.length === 0 && <tr className='click-product'><td>Pedido Sem Produtos</td></tr>}
                    {productList.length > 0 &&
                        <>
                        <thead>
                            <tr>
                                <th>Cod. Item</th>
                                <th>Cod. Pedido</th>
                                <th>Cod. Produto</th>
                                <th>Nome</th>
                                <th>Preço R$</th>
                                <th>Qtd</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productList && productList.map((data, index) => {
                                return (
                                    <tr onClick={() => handleDeleteItem(index)}  className='click-product' key={index}>
                                        <td><a>{data.id_order_items}</a></td>
                                        <td><a>{data.id_order}</a></td>
                                        <td><a>{data.id_product}</a></td>
                                        <td>{data.product_name}</td>
                                        <td>{data.price}</td>
                                        <td>{data.quantity}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                        </>
                    }
                </table>
            </div>
        </div>
    )
}

OrderListItems.propTypes = {
    orderId: P.number,
    product: P.array,
    reloadListItemsTrrigger: P.func,
    reloadProductstrigger: P.func,
    reloadOrderTrigger: P.func
}
