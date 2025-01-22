import './style.css'

export const ProductButton = (click) => {
    return (
        <button className='style-button' onClick={click.click}>Cadastrar Produto</button>
    )
}
