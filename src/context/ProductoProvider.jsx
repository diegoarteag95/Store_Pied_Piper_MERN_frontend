import { useState, useEffect, createContext } from "react";
import clienteAxios from "../../config/clienteAxios";
import useAuth from "../hooks/useAuth";

const ProductosContext = createContext();
const ProductosProvaider = ({ children }) => {
  const [productos, setProductos] = useState({});
  const [alerta, setAlerta] = useState({}); //generar alertas de productos
  const [producto, setProducto] = useState({});
  const [cargando, setCargando] = useState(false);

  const { auth } = useAuth();

  //trar productos con useEfect
  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await clienteAxios.get("/productos", config);
        setProductos(data);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerProductos();
  }, [auth]);

  //trar productos con useEfect

  //genera alerta y la oculta en 5 seg
  const mostrarAlerta = (alerta) => {
    setAlerta(alerta);

    setTimeout(() => {
      setAlerta({});
    }, 5000);
  };
  //genera alerta y la oculta en 5 seg

  // Agregar nuevo producto
  const submitProducto = async (producto) => {
    if (DataToEdit) {
      await editarProducto(producto);
    } else await nuevoProducto(producto);
  };
  // Obtener producto
  const obtenerProducto = async (id) => {
    setCargando(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.get(`/productos/${id}`, config);
      setProducto(data);
    } catch (error) {
      console.log(error);
    }
    setCargando(false);
  };
  // Obtener producto

  //Auto llenar formulario para editar
  const [DataToEdit, setDataToEdit] = useState(null);
  const editarProducto = async (producto) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.put(
        `/productos/${DataToEdit._id}`,
        producto,
        config
      );
      const productosActualizados = productos.map((productoState) =>
        productoState._id === data._id ? data : productoState
      );
      setProductos(productosActualizados);

      setAlerta({
        msg: "✔️ Producto modificado correctamente. ",
        error: false,
      });

      setTimeout(() => {
        setAlerta({});
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };
  const nuevoProducto = async (producto) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post("/productos", producto, config);

      setProductos([...productos, data]); //actualiza vista de productos

      setAlerta({
        msg: "✔️ Producto agregado correctamente. ",
        error: false,
      });

      setTimeout(() => {
        setAlerta({});
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };
  //Auto llenar formulario para editar

  //eliminar producto
  const deleteProyecto = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.delete(`/productos/${id}`, config);

      const productosActualizados = productos.filter(
        (productoState) => productoState._id !== id
      );

      setProductos(productosActualizados);

      setAlerta({
        msg: "⛔ Producto eliminado correctamente. ",
        error: false,
      });

      setTimeout(() => {
        setAlerta({});
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };
  //eliminar producto

  //cerrar sesion
  const cerrarSesionProductos = () => {
    setProducto({});
    setProductos({});
    setAlerta({});
  };
  //cerrar sesion

  return (
    <ProductosContext.Provider
      value={{
        productos,
        mostrarAlerta,
        alerta,
        submitProducto,
        obtenerProducto,
        producto,
        cargando,
        DataToEdit,
        setDataToEdit,
        deleteProyecto,
        cerrarSesionProductos,
      }}
    >
      {children}
    </ProductosContext.Provider>
  );
};
export { ProductosProvaider };
export default ProductosContext;
