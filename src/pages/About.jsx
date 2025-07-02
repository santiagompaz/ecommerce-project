import React from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import banner from "../assets/banner.png";
import "./AboutStyles.css";

export const About = () => {
  return (
    <div>
      <Header />
      <div className="about-container">
        <div className="about-image">
          <img src={banner} alt="Banner principal" />
        </div>
        <div className="about-text">
          <h2>La Selección - Huevos & Regionales</h2>
          <p>
            Todo comenzó con una simple pregunta: ¿Qué pasaría si los huevos no
            solo fueran más sanos, sino también más felices?
            <br />
            <br />
            Así nació <strong>La Selección - Huevos & Regionales</strong>, un proyecto familiar
            con una misión clara: llevar a tu mesa productos naturales, de
            calidad y con una historia que contar.
            <br />
            <br />
            Nuestros protagonistas no están encerrados ni forzados a producir:
            son <strong>Gallinas Felices</strong>, libres de jaulas, de estrés y de químicos.
            Viven al aire libre, en campos abiertos, donde caminan, picotean
            alfalfa y maíz natural, y ponen sus huevos cuando lo desean. Sin
            apuros, sin presiones. Porque creemos que el bienestar animal no es
            un detalle, sino el corazón de lo que hacemos.
            <br />
            <br />
            🌿 <strong>Huevos agroecológicos, 100% libres de pesticidas</strong>, con el sabor
            auténtico de lo simple y lo bien hecho.
            <br />
            📍 Nos encontrás en <strong>Bogotá 826, CABALLITO</strong>. Lunes a viernes de 09:30 a
            12:30 y 16:30 a 19:00hs. Sábados de 09:30 a 13:30hs.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

