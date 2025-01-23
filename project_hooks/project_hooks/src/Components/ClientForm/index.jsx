import './style.css'
import { useState } from 'react'
import { ClientSubmitButton } from '../ClientButton'
import { ClearButton } from '../ClearButton'

export const ClientForm = () => {
    const [formData, setFormData] = useState(
        {
            name: '',
            secondName: '',
            email: '',
            phone: '',
            adress: '',
        }
    )
    // const [buttonStatus, setButtonStatus] = useState(false)

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({...prevData, [name]: value,}));
        console.log(formData);
    }

    const handleClick = () => {
        {
            formData.name && formData.secondName &&
            formData.email && formData.phone && formData.adress ?
            console.log('Grava dados no banco.') :
            console.log('Falta dados no formulario.');
        }
    }

    const handleClearForm = () => {
        setFormData(
            {
                name: '',
                secondName: '',
                email: '',
                phone: '',
                adress: '',
            }
        )
    }

    return (
        <>
            <div className="client-form">
                <label htmlFor="name">Nome</label>
                <input value={formData.name}
                onChange={handleChange} type="text" name="name" id="name" />
                <label htmlFor="secondName">Sobrenome</label>
                <input value={formData.secondName}
                onChange={handleChange} type="text" name="secondName" id="secondName" />
                <label htmlFor="email">E-mail</label>
                <input value={formData.email}
                    onChange={handleChange} type="email" name="email" id="email" />
                <label htmlFor="phone">Telefone</label>
                <input value={formData.phone}
                    onChange={handleChange} type="number" name="phone" id="phone" />
                <label htmlFor="adress">Endereço</label>
                <input value={formData.adress}
                    onChange={handleChange} type="text" name="adress" id="adress" />
            </div>
            <ClearButton click={handleClearForm}/>
            <ClientSubmitButton click={handleClick}/>
        </>
    )
}
