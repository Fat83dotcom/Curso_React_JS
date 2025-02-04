import './style.css'
import { useState, useMemo, useCallback, useEffect, useRef } from 'react'
import { ProductButton } from '../ProductButton'
import { ClearButton } from '../ClearButton'
import { handleSubmitGet, handleSubmitPost } from '../../Utils/ApiCalls'
import { Warning } from '../Warning'
import { SelectCategory } from '../CategorySelect'

import { useDispatch } from 'react-redux'
import { changeWarning } from '../../features/warning/warningSlice'


export const ProductForm = () => {
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

    const inputNameProduct = useRef(null)
    const inputNameCategory = useRef(null)
    const inputQuantity = useRef(null)

    const dispatch = useDispatch()

    const handleClearCategoryProductForm = useCallback(() =>{
        setProductCategoryInput('')
        inputNameCategory.current.focus()
    }, [setProductCategoryInput])


    const productCategoryData = async () => {
        const data = await handleSubmitGet('http://127.0.0.1:8000/search_product_category/')
        setProductCategory(data.data.data)
    }

    const handleRegisterCategory = useCallback(async () => {
        if (productCategoryInput) {
            const war = await handleSubmitPost(
                'http://127.0.0.1:8000/register_product_category/',
                {category_name: productCategoryInput}
            )
            console.log(war.response);

            if (war.response === 201) {
                productCategoryData()
                handleClearCategoryProductForm()
                inputNameCategory.current.focus()
                dispatch(changeWarning(war.data.msg))
            } else {
                dispatch(changeWarning(war.data.msg))
            }
            // handleWarning(war.data.msg)
        } else{
            dispatch(changeWarning('Campo vazio.'))
            inputNameCategory.current.focus()
        }
    }, [productCategoryInput, handleClearCategoryProductForm, dispatch])

    const handleChangeProductCategory = (e) => {
        const category_name = e.target.value
        setProductCategoryInput(category_name)
    }

    const handleClearProductForm = useCallback(() => {
        setProductInput(
            {
                name: '',
                price: '',
                quantity: '',
                category: productInput.category,
            }
        )
        {inputNameProduct.current.focus()}
        setProductCategoryInput('')
    }, [setProductInput, productInput])

    const handleRegisterProduct = useCallback(async () => {
        if (productInput.name && productInput.price && productInput.quantity) {
            const war = await handleSubmitPost("http://127.0.0.1:8000/register_product/", productInput)
            if (war.response === 201) {
                handleClearProductForm()
                dispatch(changeWarning(war.data.msg))
            }
        }else {
            dispatch(changeWarning('Faltam Dados no Formulario'))
            {inputNameProduct.current.focus()}
        }
    }, [productInput, handleClearProductForm, dispatch])

    const handleChangeProduct = (e) => {
        const { name, value } = e.target
        setProductInput(
            (prevData) => ({...prevData, [name]: value,})
        )
    }

    const handlePressEnter = async (e) => {
        if (e.key === 'Enter') {
            if (document.activeElement === inputNameCategory.current) {
                await handleRegisterCategory()
                console.log('caegoria');
                
            }
            if (document.activeElement === inputQuantity.current) {
                await handleRegisterProduct()
                console.log('produto');
            }
        }

    }

    useEffect(() => {
        productCategoryData()
    }, [])

    const clearButton = useMemo(() => <ClearButton click={handleClearProductForm}/>, [handleClearProductForm])
    const productButton = useMemo(() => <ProductButton click={handleRegisterProduct}/>, [handleRegisterProduct])
    const categoryButton = useMemo(
        () => <button onClick={handleRegisterCategory} className='style-button'>Cadastrar Categoria</button>, [handleRegisterCategory]
    )
    const warning = useMemo(() => <Warning/>, [])

    return (
        <>
            {warning}
            <div className='container-product-form'>
                <div className="product-form">
                    <label htmlFor="name">Nome Produto</label>
                    <input value={productInput.name}
                        onChange={handleChangeProduct}
                        ref={inputNameProduct}
                        type="text" name="name" id="name"
                    />
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
                        onKeyDown={handlePressEnter}
                        ref={inputQuantity}
                        onChange={handleChangeProduct} type="number" name="quantity" id="quantity"
                    />
                    {clearButton}
                    {productButton}
                </div>
                <div className='category-form'>
                    <label htmlFor="category">Categoria</label>
                    <input
                        ref={inputNameCategory}
                        onChange={handleChangeProductCategory}
                        onKeyDown={handlePressEnter}
                        value={productCategoryInput} type="text" name='category-form' id='category-form'
                    />
                    {categoryButton}
                </div>
            </div>
        </>
    )
}
