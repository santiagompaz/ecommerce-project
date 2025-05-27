import React from 'react'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { Nav } from '../components/Nav'

export const About = ({emptyCart, addToCart, removeFromCart, removeItem, cart}) => {
  return (
    <div>
        <Header emptyCart={emptyCart} addToCart={addToCart} removeFromCart={removeFromCart} removeItem={removeItem} cartProducts={cart}/>
        <Nav/>
        <h1>About</h1>
        <Footer/>
    </div>
  )
}
