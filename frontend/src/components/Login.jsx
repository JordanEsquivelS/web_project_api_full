import React, { useState } from "react";
import { Link } from "react-router-dom";
import ojoBlanco from "../images/ojo_blanco.png";
import ojoEsconderBlanco from "../images/ojo_esconderBlanco.png";

function Login({ onLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email && password) {
      onLogin(password, email);
    } else {
      alert("Por favor, completa todos los campos.");
    }
  };

  return (
    <div className="auth" id="login-container">
      <h2 className="auth__title">Inicia sesión</h2>

      <form className="auth__form" id="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          required
          className="auth__input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="auth__passwordContainer">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Contraseña"
            required
            className="auth__input"
            value={password}
            maxLength={10}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            onClick={togglePasswordVisibility}
            className="auth__togglePassword"
          >
            <img
              className="auth__toggleImg"
              src={showPassword ? ojoEsconderBlanco : ojoBlanco}
              alt={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            />
          </span>
        </div>

        <button className="auth__button">Inicia sesión</button>
      </form>

      <span className="auth__link">
        ¿Aún no eres miembro?
        <Link to="/signup" className="auth__linkAnchor">
          Regístrate aquí
        </Link>
      </span>
    </div>
  );
}

export default Login;
