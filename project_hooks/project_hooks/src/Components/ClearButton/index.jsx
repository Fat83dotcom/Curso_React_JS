import './style.css'
import { Button } from '@mantine/core'

export const ClearButton = (click) => {
    return (
        // <button className='style-button' onClick={click.click}>Limpar formulário</button>
        <Button variant='submitButton' onClick={click.click}>Limpar Formulário</Button>
    )
}
