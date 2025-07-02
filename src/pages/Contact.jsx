import React from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Nav } from "../components/Nav";

export const Contact = () => {
  return (
    <div>
      <Header />
      <h1 style={{margin:"2rem"}}>Formulario de contacto</h1>

      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">
          Ingrese su e-mail
        </label>
        <input
          type="email"
          class="form-control"
          id="exampleFormControlInput1"
          placeholder="usuario@dominio.com"
        />
      </div>
      <div class="mb-3">
        <label for="exampleFormControlTextarea1" class="form-label">
          Ingrese su consulta
        </label>
        <textarea
          class="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
          placeholder="Escriba su consulta..."
        ></textarea>
      </div>
      <div className="button-area">
        <button className="button-primary">
          Enviar
        </button>
      </div>
      <Footer />
    </div>
  );
};
