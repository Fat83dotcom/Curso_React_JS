import './style.css'
import { useState, useMemo, useRef } from 'react'
import { ClientSubmitButton } from '../ClientButton'
import { ClearButton } from '../ClearButton'
import { handleSubmitPost } from '../../Utils/ApiCalls'
import { Warning } from '../Warning'
import { useCallback } from 'react'
import { useDispatch } from "react-redux"
import { changeWarning } from "../../features/warning/warningSlice"

export const ClientForm = () => {

    const inputCustomerName = useRef(null)

    const [formData, setFormData] = useState(
        {
            name: '',
            second_name: '',
            email: '',
            phone: '',
            address: '',
        }
    )

    const dispatch = useDispatch()

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({...prevData, [name]: value,}));
    }

    const handleClearForm = useCallback(() => {
        setFormData(
            {
                name: '',
                second_name: '',
                email: '',
                phone: '',
                address: '',
            }
        )
        {inputCustomerName.current.focus()}
    }, [])

    const fetchCustomers = useCallback(async () => {
        if ( formData.name && formData.second_name &&
            formData.email && formData.phone && formData.address) {
            const war = await handleSubmitPost(
                "http://127.0.0.1:8000/register_customers/", formData
            )
            if (war.response === 201) {
                dispatch(changeWarning(war.data.msg))
                handleClearForm()
            } else {
                dispatch(changeWarning(war.data.msg))
            }
        } else {
            dispatch(changeWarning('Faltam Dados no Formulario'))
            {inputCustomerName.current.focus()}
        }
    }, [formData, handleClearForm, dispatch])

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            fetchCustomers()
        }
    }

    const clearButton = useMemo(() => <ClearButton click={handleClearForm}/>, [handleClearForm])
    const submitButton = useMemo(() => <ClientSubmitButton click={fetchCustomers}/>, [fetchCustomers])
    return (
        <>
            <Warning/>
            <div className="client-form">
                <label htmlFor="name">Nome</label>
                <input ref={inputCustomerName} value={formData.name}
                onChange={handleChange} type="text" name="name" id="name" />
                <label htmlFor="second_name">Sobrenome</label>
                <input value={formData.second_name}
                onChange={handleChange} type="text" name="second_name" id="second_name" />
                <label htmlFor="email">E-mail</label>
                <input value={formData.email}
                    onChange={handleChange} type="email" name="email" id="email" />
                <label htmlFor="phone">Telefone</label>
                <input value={formData.phone}
                    onChange={handleChange} type="number" name="phone" id="phone" />
                <label htmlFor="adress">Endereço</label>
                <input value={formData.address}
                    onChange={handleChange} type="text" name="address" id="address"
                    onKeyDown={handleKeyPress}
                />
            </div>
            {clearButton}
            {submitButton}
        </>
    )
}
