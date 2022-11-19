import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Alerta } from "../../components/Alerta";
import clienteAxios from "../../../config/clienteAxios";

const NuevoPassword = () => {
  //trae datos de formulario
  const [password, setPassword] = useState("");
  //trae datos de formulario

  const [iniciaSesion, setIniciaSesion] = useState(false); //useState link inicia sesion
  const [tokenValido, setTokenValido] = useState(false); //useState para estado del token
  const [alerta, setAlerta] = useState({}); //useState Alerta

  //trae token de URL usando params
  const params = useParams();
  const { token } = params;
  //trae token de URL usando params

  //useEffect para traer datos de URL al cargar la pagina
  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await clienteAxios.get(`/usuarios/olvide-password/${token}`); //Envia URL con token a API y valida si es correcta
        setTokenValido(true);
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true,
        });
      }
    };
    comprobarToken();
  }, []);
  //useEffect para traer datos de URL al cargar la pagina

  //funcion con datos del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    //valida si la contraseña es mayor a 6 caracteres
    if (password.length < 6) {
      setAlerta({
        msg: "La contraseña debe ser minimo de 6 caracteres.",
        error: true,
      });
      return;
    }
    //valida si la contraseña es mayor a 6 caracteres

    try {
      const url = `/usuarios/olvide-password/${token}`;
      const { data } = await clienteAxios.post(url, { password });
      setAlerta({
        msg: data.msg,
        error: false,
      });
      setTokenValido(false);
      setIniciaSesion(true);
      setPassword("");
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };
  //funcion con datos del formulario

  const { msg } = alerta;
  return (
    <>
      <h1 className="text-emerald-700 font-black text-5xl capitalize text-center">
        Restablece tu contraseña <br />
        <span className="text-slate-700"> Pied-Piper</span>
      </h1>
      {msg && <Alerta alerta={alerta} />}
      {tokenValido && (
        <form
          className="my-10 bg-white shadow rounded-lg p-8"
          onSubmit={handleSubmit}
        >
          <div className="my-5">
            <label
              className="uppercase tex-gray-600 block text-xl font-bold"
              htmlFor="password"
            >
              Nueva Contraseña
            </label>
            <input
              id="password"
              type="password"
              placeholder="Ingresa tu nueva contraseña"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <input
            type="submit"
            value="Cambiar Contraseña"
            className="bg-emerald-700 mb -5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-emerald-800 trasition-colors"
          />
        </form>
      )}
      {iniciaSesion && (
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/"
        >
          Inicia Sesión
        </Link>
      )}
    </>
  );
};

export { NuevoPassword };
