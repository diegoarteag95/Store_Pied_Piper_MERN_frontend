import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Alerta } from "../../components/Alerta";
import clienteAxios from "../../../config/clienteAxios";

const ConfirmarCuenta = () => {
  const [alerta, setAlerta] = useState({}); //useState para alerta
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false); //use State para valiar cuenta confirmada

  // Traer token en url usando params
  const params = useParams();
  const { id } = params;
  // Traer token en url usando params

  //para leer la url - y que el codigo se ejecute una vez al abrir la pagina
  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `/usuarios/confirmar/${id}`; //se guarda la url para poder enviar a API
        const { data } = await clienteAxios.get(url); //envia url a API si es valida confirma usuario

        setAlerta({
          msg: data.msg,
          error: false,
        });

        setCuentaConfirmada(true);
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true,
        });
      }
    };

    confirmarCuenta(); //llama la funcion en el useEffect
  }, []);
  //para leer la url - y que el codigo se ejecute una vez al abrir la pagina

  const { msg } = alerta; //define alerta

  return (
    <>
      <h1 className="text-emerald-700 font-black text-5xl capitalize text-center">
        Confirma tu cuenta <span className="text-slate-700">Pied-Piper</span>
      </h1>
      <div className="mt-20 md:mt-10 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg && <Alerta alerta={alerta} />}
        {cuentaConfirmada && (
          <Link
            className="block text-center my-5 text-slate-500 uppercase text-sm"
            to="/"
          >
            Inicia Sesión
          </Link>
        )}
      </div>
    </>
  );
};

export { ConfirmarCuenta };
