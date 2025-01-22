import './style.css'

export const ClientSubmitButton = (click) => {
    return (
        <button className='style-button' onClick={click.click}>Cadastrar Cliente</button>
    )
}
