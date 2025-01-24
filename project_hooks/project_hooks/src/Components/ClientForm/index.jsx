import './style.css'
import { useEffect, useState } from 'react'
import { ClientSubmitButton } from '../ClientButton'
import { ClearButton } from '../ClearButton'
import { handleSubmitData } from '../../Utils/ApiCalls'
import { Warning } from '../Warning'

export const ClientForm = () => {
    const [registerStatus, setRegisterStatus] = useState('')
    const [formData, setFormData] = useState(
        {
            name: '',
            second_name: '',
            email: '',
            phone: '',
            address: '',
        }
    )
    // const [buttonStatus, setButtonStatus] = useState(false)

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({...prevData, [name]: value,}));
        console.log(formData);
    }

    const handleClick = async () => {
        if ( formData.name && formData.second_name &&
            formData.email && formData.phone && formData.address) {
            const war = await handleSubmitData("http://127.0.0.1:8000/register_customers/", 'POST', formData, handleClearForm)
            console.log(war);

            handleWarning(war)
        } else {
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
                second_name: '',
                email: '',
                phone: '',
                address: '',
            }
        )
    }



    return (
        <>
            <div className="client-form">
                <label htmlFor="name">Nome</label>
                <input value={formData.name}
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
                    onChange={handleChange} type="text" name="address" id="address" />
            </div>

            <ClearButton click={handleClearForm}/>
            <ClientSubmitButton click={handleClick}/>
            <Warning warning={registerStatus}/>
        </>
    )
}
