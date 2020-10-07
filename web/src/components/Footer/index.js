import React from "react";
import { Container } from "./styles";
import { Link } from "react-router-dom";
import {
  FaMapMarkedAlt,
  FaPhone,
  FaInstagram,
  FaFacebook,
  FaWhatsapp,
} from "react-icons/fa";
function Footer() {
  return (
    <>
      <Container>
        <div>
          <h2>Categorias</h2>
          <ul>
            <li>
              <Link to="/">Todas as categorias</Link>
            </li>
            <li>
              <Link to="/">Perifericos</Link>
            </li>
            <li>
              <Link to="/">Acessórios</Link>
            </li>
            <li>
              <Link to="/">Smartphones</Link>
            </li>
          </ul>
        </div>

        <div>
          <h2>Contato</h2>
          <ul className="contact">
            <li>
              <span>
                <FaMapMarkedAlt />
              </span>
              Av. Agamenon Magalhães, 646, M. Nassau - Caruaru/PE
            </li>
            <li>
              <span>
                <FaPhone />
              </span>
              (81) 2103-7300
            </li>
          </ul>
        </div>

        <div>
          <h2>Nossas Redes</h2>
          <ul className="social">
            <li>
              <span>
                <FaInstagram size={24} />
              </span>
            </li>
            <li>
              <span>
                <FaFacebook size={24} />
              </span>
            </li>

            <li>
              <span>
                <FaWhatsapp size={24} />
              </span>
            </li>
          </ul>
        </div>

        <p className="copy">© 2020 Copyright: CSM Tecnologia da Informação</p>
      </Container>
    </>
  );
}

export default Footer;
