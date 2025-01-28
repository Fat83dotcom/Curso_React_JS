import './style.css'
import P from 'prop-types'


export const Order = ({customerId, change}) => {

    const changePage = () => {
        change('orderForm')
    }

    return (
        <>
            <p>Pagina de venda iniciada.</p>
            <p>{customerId}</p>
            <button onClick={changePage}>mudar</button>
        </>
    )
}

Order.propTypes = {
    customerId: P.string,
    change: P.func,
}
