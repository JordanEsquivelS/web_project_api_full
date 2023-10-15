import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import ojoBlanco from "../images/ojo_blanco.png";
import ojoEsconderBlanco from "../images/ojo_esconderBlanco.png";

function Register({
  onRegister,
  loggedIn,
  setShowTooltip,
  setIsSuccess,
  setTooltipMessage,
}) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password.length < 5 || password.length > 15) {
      setTooltipMessage("La contraseña debe tener entre 5 y 15 caracteres.");
      setIsSuccess(false);
      setShowTooltip(true);
      return;
    }

    if (email && password) {
      onRegister(password, email)
        .then(() => {
          if (loggedIn) {
            navigate("/main");
          } else {
            navigate("/signin");
          }
        })
        .catch((error) => {
          setTooltipMessage("Hubo un error al registrar. Inténtalo de nuevo.");
          setIsSuccess(false);
          setShowTooltip(true);
        });
    } else {
      setTooltipMessage("Por favor, completa todos los campos.");
      setIsSuccess(false);
      setShowTooltip(true);
    }
  };

  return (
    <div className="auth">
      <h2 className="auth__title">Regístrate</h2>

      <form className="auth__form" onSubmit={handleSubmit}>
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

        <button className="auth__button">Regístrate</button>
      </form>

      <span className="auth__link">
        ¿Ya eres miembro?
        <Link to="/signin" className="auth__linkAnchor">
          Inicia sesión aquí
        </Link>
      </span>
    </div>
  );
}

export default Register;
