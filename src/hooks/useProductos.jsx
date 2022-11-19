import { useContext } from "react";
import ProductosContext from "../context/ProductoProvider";

const useProductos = () => {
  return useContext(ProductosContext);
};

export default useProductos;
