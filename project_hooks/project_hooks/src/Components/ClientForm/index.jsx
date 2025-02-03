import './style.css'
import { useState, useMemo, useRef } from 'react'
import { ClientSubmitButton } from '../ClientButton'
import { ClearButton } from '../ClearButton'
import { handleSubmitPost } from '../../Utils/ApiCalls'
import { Warning } from '../Warning'
import { useCallback } from 'react'

export const ClientForm = () => {
    const [registerStatus, setRegisterStatus] = useState('')

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

    const handleWarning = useCallback(async (msg) => {
        setRegisterStatus(msg)
        await new Promise(() => setTimeout(() => {setRegisterStatus('')}, 3000))
    }, [])

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

    const handleClick = useCallback(async () => {
        if ( formData.name && formData.second_name &&
            formData.email && formData.phone && formData.address) {
                const war = await handleSubmitPost(
                    "http://127.0.0.1:8000/register_customers/", formData
                )
                handleClearForm()

                handleWarning(war.data.msg)
        } else {
            handleWarning('Faltam Dados no Formulario')
            {inputCustomerName.current.focus()}
        }
    }, [formData, handleClearForm, handleWarning])

    const handleKeyPress = async (e) => {
        {e.key === 'Enter' && await handleClick()}
        {e.key === 'Enter' && handleClearForm()}
    }

    return (
        <>
            <Warning warning={registerStatus}/>
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

            {useMemo(() => <ClearButton click={handleClearForm}/>, [handleClearForm])}
            {useMemo(() => <ClientSubmitButton click={handleClick}/>, [handleClick])}
        </>
    )
}
