import './style.css'

export const ClearButton = (click) => {
    return (
        <button className='style-button' onClick={click.click}>Limpar formulário</button>
    )
}
