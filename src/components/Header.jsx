import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";

const Header = () => (
  <header>
    <nav>
      <ul>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Início
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/alunos"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Alunos
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/batimentos"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Batimentos
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/sobre"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Sobre
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contato"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Contato
          </NavLink>
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;
