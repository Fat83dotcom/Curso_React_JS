import './style.css'

export const HeaderNavBar = (click) => {
    return (
        <>
        <nav className='header'>
            <div>
                <span onClick={() => click.click('customer')}>Cadastrar Cliente</span>
                <span onClick={() => click.click('product')}>Cadastar Produto</span>
                <span onClick={() => click.click('order')}>Efetuar Venda</span>
                <span onClick={() => click.click('searchCustomers')}>Consultar Clientes</span>
                <span onClick={() => click.click('searchProducts')}>Consultar Produtos</span>
                <span onClick={() => click.click('SearchOrders')}>Consultar Vendas</span>
            </div>
        </nav>
        </>
    )
}
