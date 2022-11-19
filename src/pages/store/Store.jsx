import "../../styles/store.css";
import { TarjetaProductos } from "./TarjetaProductos";
import useProductos from "../../hooks/useProductos";
import { useState } from "react";
import carritoDb from "../../helpers/carritoDb";

const Store = () => {
  const { productos } = useProductos();

  //useState para data de carrito
  const [DbCarrito, setDbCarrito] = useState(carritoDb);
  //useState para data de

  //verificar si producto existe en carrito
  let existe = false;
  let existeEnCarro = (elemento) => {
    if (DbCarrito.length) {
      if (DbCarrito.find((el) => elemento._id === el._id)) {
        existe = true;
      } else {
        existe = false;
      }
    } else {
      existe = false;
    }
  };
  //verificar si producto existe en carrito

  //agregar a carrito
  let agreagarCarrito = (el) => {
    existeEnCarro(el);
    if (!existe) {
      DbCarrito.push({
        _id: el._id,
        img: el.img,
        nombre: el.nombre,
        precio: el.precio,
        stock: el.stock,
        total: el.precio,
        cantidad: 1,
      });
    } else {
      alert("este producto ya esta en tu carrito");
    }
  };
  //agregar a carrito

  return (
    <>
      <section className="section">
        <div className="section__titulo-container">
          <h1 className="section__titulo">Productos pied piper </h1>
        </div>
        <div className="section__contenedor-tarjetas-productos">
          {productos.length
            ? productos.map((el) => (
                <TarjetaProductos
                  key={el._id}
                  el={el}
                  agreagarCarrito={agreagarCarrito}
                />
              ))
            : ""}
        </div>
      </section>
    </>
  );
};

export { Store };
