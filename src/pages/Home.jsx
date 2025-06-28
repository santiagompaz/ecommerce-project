import React, { useContext } from 'react'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { Nav } from '../components/Nav'
import { ProductList } from '../components/ProductList'
import spinner from '../assets/loading.gif'
import { CartContext } from '../context/CartContext'

export const Home = () => {

  const { loading } = useContext(CartContext);

  return (
    <div>
        <Header />
        <Nav/>
        <main>
          <h1>Home</h1>
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
