import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import RegisterCustomer from './Pages/RegisterCustomers/ResgisterCustomer'
import RegisterProduct from './Pages/RegisterProduct/RegisterProduct'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RegisterCustomer/>
    <RegisterProduct/>
  </StrictMode>,
)
