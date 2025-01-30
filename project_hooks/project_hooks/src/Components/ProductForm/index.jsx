import './style.css'
import { useState, useMemo, useCallback, useEffect } from 'react'
import { ProductButton } from '../ProductButton'
import { ClearButton } from '../ClearButton'
import { handleSubmitGet, handleSubmitPost } from '../../Utils/ApiCalls'
import { Warning } from '../Warning'
import { SelectCategory } from '../CategorySelect'

export const ProductForm = () => {
    const [registerStatus, setRegisterStatus] = useState('')
    const [productInput, setProductInput] = useState(
        {
            name: '',
            price: '',
            quantity: '',
            category: '',
        }
    )
    const [productCategory, setProductCategory] = useState([])
    const [productCategoryInput, setProductCategoryInput] = useState('')

    const handleClearProductForm = useCallback(() => {
        setProductInput(
            {
                name: '',
                price: '',
                quantity: '',
                category: productInput.category,
            }
        )
    }, [setProductInput, productInput])

    const handleClearCategoryProductForm = useCallback(() =>{
        setProductCategoryInput('')
    }, [setProductCategoryInput])

    const handleWarning = useCallback(async (msg) => {
        setRegisterStatus(msg)
        await new Promise(() => setTimeout(() => {setRegisterStatus('')}, 3000))
    }, [])

    const productCategoryData = async () => {
        const data = await handleSubmitGet('http://127.0.0.1:8000/search_product_category/')
        console.log(data.data);
        setProductCategory(data.data)
    }

    const handleRegisterClick = useCallback(async () => {
        if (productInput.name && productInput.price && productInput.quantity) {
            const war = await handleSubmitPost("http://127.0.0.1:8000/register_product/", productInput)
            handleClearProductForm()
            handleWarning(war.msg)
        }else {
            handleWarning('Faltam Dados no Formulario')
        }
    }, [productInput, handleWarning, handleClearProductForm])

    const handleRegisterCategoryClick = useCallback(async () => {
        if (productCategoryInput) {
                const war = await handleSubmitPost(
                'http://127.0.0.1:8000/register_product_category/',
                {category_name: productCategoryInput}
            )
            productCategoryData()
            handleClearCategoryProductForm()
            handleWarning(war.msg)
        } else{
            handleWarning('Campo vazio.')
        }
    }, [handleWarning, productCategoryInput, handleClearCategoryProductForm])

    const handleChangeProduct = (e) => {
        const { name, value } = e.target;
        console.log(productInput);

        setProductInput(
            (prevData) => ({...prevData, [name]: value,})
        )
    }

    const handleChangeProductCategory = (e) => {
        const category_name = e.target.value
        setProductCategoryInput(category_name)
    }

    useEffect(() => {
        productCategoryData()
    }, [])

    return (
        <>
            <Warning warning={registerStatus}/>
            <div className='container-product-form'>
                <div className="product-form">
                    <label htmlFor="name">Nome Produto</label>
                    <input value={productInput.name}
                    onChange={handleChangeProduct} type="text" name="name" id="name" />
                    <label htmlFor="category-product">Categoria</label>
                    <SelectCategory
                        handleChangeProduct={handleChangeProduct}
                        productCategory={productCategory}
                    />
                    <label htmlFor="price">Valor</label>
                    <input value={productInput.price}
                    onChange={handleChangeProduct} type="number" name="price" id="price" />
                    <label htmlFor="quantity">Quantidade</label>
                    <input value={productInput.quantity}
                    onChange={handleChangeProduct} type="number" name="quantity" id="quantity" />
                    {useMemo(() => <ClearButton click={handleClearProductForm}/>, [handleClearProductForm])}
                    {useMemo(() => <ProductButton click={handleRegisterClick}/>, [handleRegisterClick])}
                </div>
                <div className='category-form'>
                    <label htmlFor="category">Categoria</label>
                    <input onChange={handleChangeProductCategory} value={productCategoryInput} type="text" name='category-form' id='category-form' />
                    {useMemo(()=> {
                        return <button onClick={handleRegisterCategoryClick} className='style-button'>Cadastrar Categoria</button>
                    }, [handleRegisterCategoryClick])}
                </div>
            </div>
        </>
    )
}
