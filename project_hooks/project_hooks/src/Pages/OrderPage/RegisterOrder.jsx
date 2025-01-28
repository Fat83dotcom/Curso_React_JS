import { useState } from 'react'
import { Order } from '../../Components/Order'
import { OrderForm } from '../../Components/OrderForm'
import './style.css'


export const RegisterOrder = () => {
    const [changePage, setChangePage] = useState('orderForm')
    const [customerId, setCustomerId] = useState(0)
    return (
        <>
            <h1>Vendas</h1>
            {changePage === 'orderForm' && <OrderForm change={(change) => setChangePage(change)} customId={(id)=> setCustomerId(id)}/>}
            {changePage === 'order' && <Order customerId={customerId} change={(change) => setChangePage(change)}/>}

        </>
    )
}

<Order/>
