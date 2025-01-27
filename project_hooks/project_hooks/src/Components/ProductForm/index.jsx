import './style.css'
import { useState, useMemo, useCallback, useEffect } from 'react'
import { ProductButton } from '../ProductButton'
import { ClearButton } from '../ClearButton'
import { handleSubmitGet, handleSubmitPost } from '../../Utils/ApiCalls'
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
    const [productCategory, setProductCategory] = useState([])

    const handleClearForm = useCallback(() => {
        setFormData(
            {
                name: '',
                price: '',
                quantity: '',
            }
        )
    }, [setFormData])

    const handleWarning = useCallback(async (msg) => {
        setRegisterStatus(msg)
        await new Promise(() => setTimeout(() => {setRegisterStatus('')}, 3000))
    }, [])

    useEffect(() => {
        const data = async () =>{
            const dt = await handleSubmitGet('http://127.0.0.1:8000/search_product_category/')
            console.log(dt.data);

            setProductCategory(dt.data)
        }
        data()
    }, [])

    const handleRegisterClick = useCallback(async () => {
        if (formData.name && formData.price && formData.quantity) {
            const war = await handleSubmitPost("http://127.0.0.1:8000/register_product/", formData, handleClearForm)
            handleWarning(war)
        }else {
            handleWarning('Faltam Dados no Formulario')
        }
    }, [formData, handleWarning, handleClearForm])

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(
            (prevData) => ({...prevData, [name]: value,})
        )
    }

    return (
        <>
            <Warning warning={registerStatus}/>
            <div className='container-product-form'>
                <div className="product-form">
                    <label htmlFor="name">Nome Produto</label>
                    <input value={formData.name}
                    onChange={handleChange} type="text" name="name" id="name" />
                    <label htmlFor="category-product">Categoria</label>
                    <select name="category" id="category" >
                        {productCategory.map((cat) => {
                            return (
                                <option key={cat.id} value={cat.category_name}>{cat.category_name}</option>
                            )
                        })}

                    </select>
                    <label htmlFor="price">Valor</label>
                    <input value={formData.price}
                    onChange={handleChange} type="number" name="price" id="price" />
                    <label htmlFor="quantity">Quantidade</label>
                    <input value={formData.quantity}
                    onChange={handleChange} type="number" name="quantity" id="quantity" />
                    {useMemo(() => <ClearButton click={handleClearForm}/>, [handleClearForm])}
                    {useMemo(() => <ProductButton click={handleRegisterClick}/>, [handleRegisterClick])}
                </div>
                <div className='category-form'>
                    <label htmlFor="category">Categoria</label>
                    <input type="text" />
                    <button className='style-button'>Cadastrar Categoria</button>
                </div>
            </div>
        </>
    )
}
