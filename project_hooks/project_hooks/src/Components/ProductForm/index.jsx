import './style.css'
import { useState } from 'react'
import { ProductButton } from '../ProductButton'
import { ClearButton } from '../ClearButton'
import { handleSubmitData } from '../../Utils/ApiCalls'
import { Warning } from '../Warning'

export const ProductForm = () => {
    const [registerStatus, setRegisterStatus] = useState('')
    const [formData, setFormData] = useState(
        {
            name: '',
            price: '',
            quantity: '',
        }
    )
    // const [buttonStatus, setButtonStatus] = useState(false)

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(
            (prevData) => ({...prevData, [name]: value,})
        )
    }

    const handleRegisterClick = async () => {
        if (formData.name && formData.price && formData.quantity) {
            const war = await handleSubmitData("http://127.0.0.1:8000/register_product/", 'POST', formData, handleClearForm)
            handleWarning(war)
        }else {
            handleWarning('Faltam Dados no Formulario')
        }
    }

    const handleWarning = async (msg) => {
        setRegisterStatus(msg)
        await new Promise(() => setTimeout(() => {setRegisterStatus('')}, 3000))
    }

    const handleClearForm = () => {
        setFormData(
            {
                name: '',
                price: '',
                quantity: '',
            }
        )
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
            <ClearButton click={handleClearForm}/>
            <ProductButton click={handleRegisterClick}/>
            <Warning warning={registerStatus}/>
        </>
    )
}
