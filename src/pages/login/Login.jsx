import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Alerta } from "../../components/Alerta"; //Mensajes de alerta
import clienteAxios from "../../../config/clienteAxios"; //Cliente que conecta front con back
import useAuth from "../../hooks/useAuth"; //hook personalizado con contexto de autenticacion

const Login = () => {
  //trae datos de formulario
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //trae datos de formulario

  const [alerta, setAlerta] = useState({}); //useState para Alert
  const navigate = useNavigate(); //useNavigate para redirigir a una ruta

  //-----hook personalizado de contexto de autenticacion-----
  const { setAuth } = useAuth();

  //-----hook personalizado de contexto de autenticacion-----

  //funcion con formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    //valida que se llenen todos los campos
    if ([email, password].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }
    //valida que se llenen todos los campos

    //envia datos a API
    try {
      const { data } = await clienteAxios.post("/usuarios/login", {
        email,
        password,
      });
      setAlerta({}); //Borra alertas
      localStorage.setItem("token", data.token); //genera un token de sesion en localStorange
      setAuth(data); //guarda token en contexto autenticacion
      navigate("/store-pied-piper");
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
    //envia datos a API
  };
  //funcion con formulario

  const { msg } = alerta; //establece alerta

  return (
    <>
      <h1 className="text-emerald-700 font-black text-5xl capitalize text-center">
        Inicia sesión <br />
        <span className="text-slate-700">Pied-Piper</span>
      </h1>

      {msg && <Alerta alerta={alerta} />}

      <form
        className="my-10 bg-white shadow rounded-lg p-8"
        onSubmit={handleSubmit}
      >
        <div className="my-5">
          <label
            className="uppercase tex-gray-600 block text-xl font-bold"
            htmlFor="email"
          >
            Correo
          </label>
          <input
            id="email"
            type="email"
            placeholder="Ingresa tu correo"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div className="my-5">
          <label
            className="uppercase tex-gray-600 block text-xl font-bold"
            htmlFor="password"
          >
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            placeholder="Ingresa tu contraseña"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <input
          type="submit"
          value="Iniciar Sesión"
          className="bg-emerald-700 -5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-emerald-800 trasition-colors"
        />
        <div className="text-center">
          <br />
          <h3>---cuentas de pruebas---</h3>
          <p>admin@piedpiper.com pass:administrador</p>
          <p>cliente@piedpiper.com pass:cliente</p>
        </div>
      </form>
      <nav className="ld:flex lg:justify-between">
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="registrar"
        >
          ¿No tienes una cuenta? Regístrate
        </Link>
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="olvide-password"
        >
          Olvide Mi Contraseña
        </Link>
      </nav>
    </>
  );
};

export { Login };
