import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import RegisterCustomer from './Pages/RegisterCustomers/ResgisterCustomer'
import RegisterProduct from './Pages/RegisterProduct/RegisterProduct'
import { HeaderNavBar } from './Components/HeaderNavBar'

export const Home = () => {
    const [homeComponent, setHomeComponent] = useState(<h1>Escolha uma opção!</h1>)

    const handleHeaderClick = (setComponent) => {
        {setComponent === 'customer' && setHomeComponent(<RegisterCustomer/>)}
        {setComponent === 'product' && setHomeComponent(<RegisterProduct/>)}
        {setComponent === 'order' && setHomeComponent(<h2>Página de vendas</h2>)}
    }

    return (
        <>
            <HeaderNavBar click={handleHeaderClick}/>
            {homeComponent}
        </>
    )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Home/>
  </StrictMode>,
)
