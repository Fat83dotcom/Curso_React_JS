import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import RegisterCustomer from './Pages/RegisterCustomers/ResgisterCustomer'
import RegisterProduct from './Pages/RegisterProduct/RegisterProduct'
import { HeaderNavBar } from './Components/HeaderNavBar'
import { SearchCustomerPage } from './Pages/SearchCustmers'
import { SearchOrdersPage } from './Pages/SearchOrders'
import { SearchProducts } from './Pages/SearchProducts'
import { RegisterOrder } from './Pages/OrderPage/RegisterOrder'
import store from './store'
import { Provider } from 'react-redux'
import '@mantine/core'
import { MantineProvider } from '@mantine/core'
import { theme } from './assets/MantineTheme/theme'


export const Home = () => {
    const [homeComponent, setHomeComponent] = useState(<h1>Escolha uma opção!</h1>)

    const handleHeaderClick = (setComponent) => {
        {setComponent === 'customer' && setHomeComponent(<RegisterCustomer/>)}
        {setComponent === 'product' && setHomeComponent(<RegisterProduct/>)}
        {setComponent === 'order' && setHomeComponent(<RegisterOrder/>)}
        {setComponent === 'searchCustomers' && setHomeComponent(<SearchCustomerPage/>)}
        {setComponent === 'searchProducts' && setHomeComponent(<SearchProducts/>)}
        {setComponent === 'SearchOrders' && setHomeComponent(<SearchOrdersPage/>)}
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
    <MantineProvider theme={theme}>
        <Provider store={store}>
            <Home/>
        </Provider>
    </MantineProvider>
 </StrictMode>,
)
