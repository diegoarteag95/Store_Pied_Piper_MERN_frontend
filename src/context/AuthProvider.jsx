//conex para la autenticacion del usaurio
import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../../config/clienteAxios";

const AuthContext = createContext();
//Rodea toda la aplicacion en un context
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({}); //Para almacenar el token de login del usuario
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate();
  //useEfect para validar si existe un token en local storange
  useEffect(() => {
    const autenticarUsuario = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setCargando(false);
        return;
      }
      //verificar si hay una sesion activa con JWT
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const { data } = await clienteAxios("/usuarios/perfil", config);
        setAuth(data);
        navigate("/store-pied-piper");
      } catch (error) {
        setAuth({});
      }
      setCargando(false);
      //verificar si hay una sesion activa con JWT
    };
    autenticarUsuario();
  }, []);

  //useEfect para validar si existe un token en local storange

  const cerrarSesionAuth = () => {
    setAuth({});
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, cargando, cerrarSesionAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
//Rodea toda la aplicacion en un context

export { AuthProvider };
export default AuthContext;
