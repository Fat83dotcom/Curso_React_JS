import './style.css'

export const HeaderNavBar = (click) => {
    return (
        <>
        <nav className='header'>
            <div>
                <span onClick={() => click.click('customer')}>Cadastrar Cliente</span>
                <span onClick={() => click.click('product')}>Cadastar Produto</span>
                <span onClick={() => click.click('order')}>Efetuar Venda</span>
            </div>
        </nav>
        </>
    )
}
