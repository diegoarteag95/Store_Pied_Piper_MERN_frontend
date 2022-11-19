import "../../styles/productosAdmin.css";
import { TablaProductosAdminCabezera } from "./TablaProductosAdminCabezera";
import { FormularioProductosAdmin } from "./FormularioProductosAdmin";
import useProductos from "../../hooks/useProductos";
import { useState } from "react";

const ProductosAdmin = () => {
  const { productos } = useProductos();

  return (
    <section className="section">
      <div className="section__titulo-container">
        <h1 className="section__titulo">Administrador de productos</h1>
      </div>
      <div className="listaProductos__contenedor">
        <div className="listaProductos__tabla">
          <TablaProductosAdminCabezera data={productos} />
        </div>
        <div className="listaProductos__formulario">
          <FormularioProductosAdmin />
        </div>
      </div>
    </section>
  );
};

export { ProductosAdmin };
