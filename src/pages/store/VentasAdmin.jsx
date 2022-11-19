import { VentasTabalaCabecera } from "./VentasTabalaCabecera";
import { useState, useEffect } from "react";
import clienteAxios from "../../../config/clienteAxios";
import "../../styles/ventas.css";

const VentasAdmin = () => {
  const [ventas, setVentas] = useState([]);

  //trar productos con useEfect
  useEffect(() => {
    const obtenerVentas = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await clienteAxios.get("/ventas", config);
        setVentas(data);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerVentas();
  }, []);
  //trar ventas con useEfect

  return (
    <>
      <div className="section__titulo-container">
        <h1 className="section__titulo">Reporte de ventas</h1>
      </div>

      <div className="section__contenedor-tarjetas-ventas">
        <VentasTabalaCabecera ventas={ventas} />
      </div>
    </>
  );
};

export { VentasAdmin };
