import React from 'react'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { Nav } from '../components/Nav'
import { ProductList } from '../components/ProductList'
import spinner from '../assets/loading.gif'

export const Home = ({emptyCart, removeFromCart, addToCart, removeItem, cart, products, loading}) => {
  return (
    <div>
        <Header emptyCart={emptyCart} addToCart={addToCart} removeFromCart={removeFromCart} removeItem={removeItem} cartProducts={cart}/>
        <Nav/>
        <main>
          <h1>Home</h1>
          {
            loading ? 
              <img src={spinner} alt='Cargando...'/> 
            :
              <ProductList addToCart={addToCart} products={products}/>
          }
        </main>
        <Footer/>
    </div>
  )
}
