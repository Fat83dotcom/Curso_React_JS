import P from 'prop-types'

export const OrderDisplay = ({orderData, orderSearchData, handleCloseOrder}) => {
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
                                            <td>{data.total.toFixed(2)}</td>
                                            <td>{data.order_status ? 'Aberto' : 'Fechado'}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        <button onClick={handleCloseOrder}>Fechar Pedido</button>
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
                                            <td>{data.total.toFixed(2)}</td>
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

OrderDisplay.propTypes = {
    handleFetchOrder: P.func,
    orderData: P.array,
    orderSearchData: P.array,
    handleChangePage: P.func,
    handleCloseOrder: P.func
}
