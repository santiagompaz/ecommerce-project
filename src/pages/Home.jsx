import React, { useContext } from 'react'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { ProductList } from '../components/ProductList'
import spinner from '../assets/loading.gif'
import banner from '../assets/banner.png'
import { CartContext } from '../context/CartContext'

export const Home = () => {

  const { loading } = useContext(CartContext);

  return (
    <div>
        <Header />
        <main>
          <img src={banner} alt="Banner principal" style={{ width: '100%', height: 'auto', marginBottom: '1rem' }} />
          {
            loading ? 
              <img src={spinner} alt='Cargando...'/> 
            :
              <ProductList />
          }
        </main>
        <Footer/>
    </div>
  )
}
