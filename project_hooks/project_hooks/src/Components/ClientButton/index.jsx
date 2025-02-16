// import './style.css'
import P from 'prop-types'
import { Button } from '@mantine/core'

export const ClientSubmitButton = ({click}) => {
    return (
        // <button className='style-button'  >Cadastrar Cliente</button>
        <Button variant='submitButton' onClick={click}>Cadastrar Cliente</Button>
    )
}

ClientSubmitButton.propTypes = {
    click: P.func
}
