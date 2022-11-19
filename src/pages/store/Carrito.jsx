import { useState, useEffect } from "react";
import "../../styles/carrito.css";
import iconMinus from "../../images/icon-minus.svg";
import iconPlus from "../../images/icon-plus.svg";
import iconDelete from "../../images/icon-delete.svg";
import carritoVacio from "../../images/carrito-de-compras.png";
import carritoArreglo from "../../helpers/carritoDb";
import clienteAxios from "../../../config/clienteAxios";
import useProductos from "../../hooks/useProductos";

const Carrito = () => {
  //formateador de moneda
  function formatearMoneda(numero) {
    return new Intl.NumberFormat().format(numero);
  }
  //formateador de moneda

  // Eliminar un producto ------------------------------------------------------------
  const [cart, setCart] = useState(carritoArreglo);
  const eliminarProducto = (productId) => {
    const carroActualizado = cart.filter(
      (producto) => producto._id !== productId
    );
    setCart(carroActualizado);
  };

  const eliminar = (productId) => {
    for (let i = 0; i < carritoArreglo.length; i++) {
      if (carritoArreglo[i]._id === productId) {
        carritoArreglo.splice(i, 1);
        eliminarProducto(productId);
        break;
      }
    }
  };
  // Eliminar un producto ------------------------------------------------------------

  // Aumentar cantidad ------------------------------------------------------------
  const [counterPlus, setCounterPlus] = useState(1);
  const aumentarCantidad = (productId) => {
    for (let i = 0; i < carritoArreglo.length; i++) {
      if (carritoArreglo[i]._id === productId) {
        if (carritoArreglo[i].stock <= carritoArreglo[i].cantidad) {
          alert("no contamos con mas unidades");
        } else {
          setCounterPlus(counterPlus + 1);
          carritoArreglo[i].cantidad = carritoArreglo[i].cantidad + 1;
          carritoArreglo[i].total =
            carritoArreglo[i].precio * carritoArreglo[i].cantidad;
        }
        break;
      }
    }
  };
  // Aumentar cantidad ------------------------------------------------------------

  // Disminuir cantidad ------------------------------------------------------------
  const [counterMinus, setCounterMinus] = useState(1);
  const disminuirCantidad = (productId) => {
    for (let i = 0; i < carritoArreglo.length; i++) {
      if (carritoArreglo[i]._id === productId) {
        if (carritoArreglo[i].cantidad <= 1) {
          eliminar(productId);
        } else {
          setCounterMinus(counterMinus + 1);
          carritoArreglo[i].cantidad = carritoArreglo[i].cantidad - 1;
          carritoArreglo[i].total =
            carritoArreglo[i].precio * carritoArreglo[i].cantidad;
        }

        break;
      }
    }
  };
  // Disminuir cantidad ------------------------------------------------------------

  // Verificar total------------------------------------------------------------
  let [contadorTotal, setContadorTotal] = useState(0);
  contadorTotal = carritoArreglo.reduce(
    (acc, el) => parseInt(acc) + parseInt(el.total),
    0
  );

  // Verificar total------------------------------------------------------------

  // Verificar totalProductos------------------------------------------------------------
  let [contadorProductos, setContadorProductos] = useState(0);
  contadorProductos = carritoArreglo.reduce((acc, el) => acc + el.cantidad, 0);

  // Verificar totalProductos------------------------------------------------------------

  // cancelar compra ------------------------------------------------------------

  const cancelarCompra = () => {
    alert("tu carrito sera eliminado");
    carritoArreglo.splice(0, carritoArreglo.length);
    eliminarProducto();
  };
  // cancelar compra ------------------------------------------------------------

  // realizar compra ------------------------------------------------------------
  let newCompra = {};
  const fechaActual = new Date();
  let fechaVenta = `${fechaActual.getDate()}/${
    fechaActual.getMonth() + 1
  }/${fechaActual.getFullYear()} - ${fechaActual.toLocaleTimeString("es-co")}`;

  //AGREGAR VENTA DB
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

  const nuevaVenta = async (venta) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post("/ventas", venta, config);

      setVentas([...ventas, data]); //actualiza vista de ventas
    } catch (error) {
      console.log(error);
    }
  };
  //AGREGAR VENTA DB

  //Restar cantidades a productos
  const { submitProducto, productos } = useProductos();
  let descontarStock = () => {
    for (let iProduct = 0; iProduct < productos.length; iProduct++) {
      for (let iCard = 0; iCard < carritoArreglo.length; iCard++) {
        if (productos[iProduct].id == carritoArreglo[iCard].id) {
          const newDataProduct = { ...productos[iProduct] };
          newDataProduct.stock -= carritoArreglo[iCard].cantidad;
          const stock = 4;
          //submitProducto({ stock });
        }
      }
    }
  };
  //Restar cantidades a productos

  const finalizarCompra = () => {
    newCompra = {
      fecha: fechaVenta,
      cantidad: contadorProductos,
      valor: contadorTotal,
    };
    nuevaVenta(newCompra);
    descontarStock();
    alert(
      `¡GRACIAS POR TU COMPRA! \n Total productos: ${contadorProductos} \n Total a pagar: ${formatearMoneda(
        contadorTotal
      )}`
    );
    carritoArreglo.splice(0, carritoArreglo.length);
    eliminarProducto();
  };

  // realizar compra ------------------------------------------------------------

  return carritoArreglo.length ? (
    <section className="section, section__carrito">
      <div className="section__titulo-container">
        <h1 className="section__titulo">Tus productos</h1>
      </div>
      <div className="carrito__contenedor">
        <div className="carrito__contenedor-izquierda">
          <div className="carrito__compras-titulo-contenedor">
            <h3 className="carrito__compras-titulo-imagen">Imagen</h3>
            <h3 className="carrito__compras-titulo-cantidad">Cantidad</h3>
            <h3 className="carrito__compras-titulo-producto">Producto</h3>
            <h3 className="carrito__compras-titulo-valor">Valor</h3>
            <h3 className="carrito__compras-titulo-total">Total</h3>
          </div>

          {/* productos carrito */}

          {carritoArreglo.map((el) => (
            <div className="producto-carrito__contenedor" key={el._id}>
              <div className="producto-carrito__contenedor-item">
                <img
                  src={el.img}
                  alt="imagen producto"
                  className="producto-carrito__imagen"
                />
              </div>
              <div className="producto-carrito__contenedor-item">
                <div className="producto-carrito__cantidad-input-contenedor">
                  <img
                    src={iconMinus}
                    alt="icono menos"
                    onClick={() => disminuirCantidad(el._id)}
                  />
                  <p>{el.cantidad}</p>
                  <img
                    src={iconPlus}
                    alt="icono mas"
                    onClick={() => aumentarCantidad(el._id)}
                  />
                </div>
                <div className="productCard__table-delete">
                  <img src={iconDelete} onClick={() => eliminar(el._id)} />
                </div>
              </div>
              <div className="producto-carrito__contenedor-item">
                <p className="productCard__table-producto">{el.nombre}</p>
              </div>
              <div className="producto-carrito__contenedor-item">
                <p className="productCard__table-vu">
                  ${formatearMoneda(el.precio)}
                </p>
              </div>
              <div className="producto-carrito__contenedor-item">
                <p className="productCard__table-vt">
                  ${formatearMoneda(el.precio * el.cantidad)}
                </p>
              </div>
            </div>
          ))}

          {/* productos carrito */}
        </div>
        <div className="carrito__contenedor-derecha">
          <h2 className="carrito__subtitulos">Detalle de compra</h2>
          <p className="carrito__total">
            Total a pagar: ${" "}
            <span className="carrito__costo">
              {formatearMoneda(contadorTotal)}
            </span>
          </p>
          <p className="carrito__total-productos">
            Cantidad de productos: {contadorProductos}
          </p>
          <div className="carrito__conenedor-btn">
            <button
              className="carrito__btn-finalizar-compra"
              onClick={() => finalizarCompra()}
            >
              Finalizar Compra
            </button>
            <button className="carrito__btn-cancelar" onClick={cancelarCompra}>
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </section>
  ) : (
    <section className="section__carrito">
      <div className="section__titulo-container">
        <h1 className="section__titulo">Tus productos</h1>
      </div>
      <div className="container__carrito-vacio">
        <img src={carritoVacio} alt="imagen carrito" />
        <p>Tu carrito está vacío, agrega tu primer producto 😎</p>
      </div>
    </section>
  );
};

export { Carrito };
