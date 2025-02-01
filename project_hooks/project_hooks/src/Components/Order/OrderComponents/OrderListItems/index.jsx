import P from 'prop-types'
import { useEffect } from 'react'


export const OrderListItems = ({product}) => {

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

OrderListItems.propTypes = {
    orderId: P.number,
    product: P.array,
}
