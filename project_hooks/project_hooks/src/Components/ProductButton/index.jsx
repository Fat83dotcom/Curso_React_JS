// import './style.css'

import { Button } from '@mantine/core'

export const ProductButton = (click) => {
    return (
        // <button className='style-button' onClick={click.click}>Cadastrar Produto</button>
        <Button variant='submitButton' onClick={click.click}>Cadastrar Produto</Button>
    )
}
