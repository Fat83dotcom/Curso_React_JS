import './style.css'
import P from 'prop-types'

export const ClientSubmitButton = ({click}) => {
    return (
        <button className='style-button' onClick={click}>Cadastrar Cliente</button>
    )
}

ClientSubmitButton.propTypes = {
    click: P.func
}
