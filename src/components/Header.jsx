import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import './HeaderStyles.css'
import Cart from './Cart'
import { Menu } from './Menu'
import logo from '../assets/logo.jpg'

export const Header = ({emptyCart, addToCart, removeFromCart, removeItem, cartProducts}) => {

    const [showCart, setShowCart] = useState(false)
    const [showMenu, setShowMenu] = useState(false)

    console.log("removeItem en Header:", removeItem);
    
    return (
        <header>
            <ul className='header'>
                <li>
                    <img src={logo} alt="Huevería La Selección" className="logo"></img>
                </li>
                <li><h1 className='title'>{'Huevería La Selección'}</h1></li>
                <ul className="sections">
                    <li>
                        <button onClick={() => setShowCart(!showCart)}><i className="bi bi-cart"></i></button>
                    </li>
                    {/*<li>
                        <button onClick={() => setShowMenu(!showMenu)}><i className="bi bi-list"></i></button>
                    </li>*/}
                </ul>
                <div className={`cart-sidebar ${showCart ? 'open' : ''}`}> 
                    <Cart emptyCart={emptyCart} addToCart={addToCart} removeFromCart={removeFromCart} removeItem={removeItem} cartProducts={cartProducts} showCart={showCart} onClose={()=>setShowCart(false)}/>
                </div>
                <div className={`menu-sidebar ${showMenu ? 'open' : ''}`}> 
                    <Menu />
                </div>
            </ul>
        </header>
    )
}
