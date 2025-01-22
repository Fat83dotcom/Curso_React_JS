import './style.css'
import { useState } from 'react'
import { ProductButton } from '../ProductButton'

export const ProductForm = () => {
    const [formData, setFormData] = useState(
        {
            name: '',
            price: '',
            quantity: '',
        }
    )

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(
            (prevData) => ({...prevData, [name]: value,})
        )
    }

    const handleClick = () => {
        {
            formData.name && formData.price && formData.quantity ?
            console.log('Grava os dados no banco') :
            console.log('Falta dados no formulario')
        }
    }

    return (
        <>
        <div className="product-form">
            <label htmlFor="name">Nome Produto</label>
            <input value={formData.name}
              onChange={handleChange} type="text" name="name" id="name" />
            <label htmlFor="price">Valor</label>
            <input value={formData.price}
              onChange={handleChange} type="number" name="price" id="price" />
            <label htmlFor="quantity">Quantidade</label>
            <input value={formData.quantity}
              onChange={handleChange} type="number" name="quantity" id="quantity" />
        </div>
        <ProductButton click={handleClick}/>
        </>
    )
}