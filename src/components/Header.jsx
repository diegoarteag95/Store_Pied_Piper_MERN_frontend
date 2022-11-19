import { Link } from "react-router-dom";
import "../styles/header.css";
import logo from "../images/LogoPiedPiper.png";
import cerrarsesion from "../images/opcion-de-cerrar-sesion.png";
import useAuth from "../hooks/useAuth";
import useProductos from "../hooks/useProductos";

const Header = () => {
  const { cerrarSesionProductos } = useProductos();
  const { cerrarSesionAuth, auth } = useAuth();

  const handleCerrarSesion = () => {
    cerrarSesionProductos();
    cerrarSesionAuth();
    localStorage.removeItem("token");
  };

  console.log(auth.rol);
  return (
    <header className="header">
      <div className="header__contenedor-logo">
        <img src={logo} alt="logo" className="header__logo" />
      </div>

      <div className="header__contenedor__nav-salir">
        <div className="header__contenedor-nav">
          <nav className="header__nav">
            <ul className=" header__ul">
              <Link to="/store-pied-piper">
                <li className="header__li">Tienda</li>
              </Link>
              <Link to="carrito">
                <li className="header__li">Carrito</li>
              </Link>
              <Link to="productos-admin">
                <li
                  className={`header__li ${
                    auth.rol === "cliente" ? "ocultar" : ""
                  } `}
                >
                  Productos-Admin
                </li>
              </Link>
              <Link to="ventas-admin">
                <li
                  className={`header__li ${
                    auth.rol === "cliente" ? "ocultar" : ""
                  } `}
                >
                  Ventas
                </li>
              </Link>
            </ul>
          </nav>
        </div>

        <div className="header__contenedor-salir">
          <img
            src={cerrarsesion}
            alt="salir"
            className="header__salir"
            onClick={handleCerrarSesion}
          />
        </div>
      </div>
    </header>
  );
};

export { Header };
