import React from 'react'
import './FooterStyles.css'
import { Link, NavLink } from 'react-router-dom'

export const Footer = () => {
  return (
    <footer>
      <section className='footer'>
        <div>
          <h2>Categorías</h2>
          <div><NavLink to='/'><i className="bi bi-house-door"></i> Inicio</NavLink></div>
          <div><NavLink to='/about'><i className="bi bi-person"></i> Sobre nosotros</NavLink></div>
          <div><NavLink to='/gallery'><i className="bi bi-bag"></i> Galería de productos</NavLink></div>
          {/*<div><NavLink to='/faq'><i className="bi bi-question-circle"></i> Preguntas frecuentes</NavLink></div>*/}
          <div><NavLink to='/contact'><i className="bi bi-telephone"></i> Contáctanos</NavLink></div>
        </div>
        <div>
          <h2>Contáctanos</h2>
          <a href="" className='group'><i className="bi bi-whatsapp"></i> +54 11 54876452</a>
          <a href='' className='group'><i className="bi bi-envelope"></i> santiagom.paz@gmail.com</a>
          <a href='https://www.google.com/maps/place/Bogot%C3%A1+826,+C1405CMD+Cdad.+Aut%C3%B3noma+de+Buenos+Aires/@-34.6175992,-58.4479193,17z/data=!3m1!4b1!4m6!3m5!1s0x95bcca3e5545bddb:0xbf9d103ac85f55b1!8m2!3d-34.6176037!4d-58.4430484!16s%2Fg%2F11b8v84384?entry=ttu&g_ep=EgoyMDI1MDUwNy4wIKXMDSoASAFQAw%3D%3D' className='group'><i className="bi bi-geo-alt"></i> Bogota 826, CABA</a>
        </div>
        <div>
          <h2>Sigamos conectados</h2>
          <a href='https://www.instagram.com/hueveria.laseleccion/'><i className="bi bi-instagram"></i> Instagram</a>
          <a href='https://www.facebook.com/people/Huever%C3%ADa-La-Selecci%C3%B3n/100095354264839/'><i className="bi bi-facebook"></i> Facebook</a>
        </div>
      </section>
      <section className="legal">
        <p>
          &copy; La Selección - Huevos & Regionales - 2025. Todos los derechos reservados. Defensa de las y los consumidores. Para reclamos <a href="https://autogestion.produccion.gob.ar/consumidores">ingresá acá</a> / Botón de arrepentimiento
        </p>
      </section>
    </footer>
  )
}
