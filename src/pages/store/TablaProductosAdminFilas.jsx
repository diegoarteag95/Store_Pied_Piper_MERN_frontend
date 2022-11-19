import deleteImg from "../../images/delete.png";
import editImg from "../../images/edit.png";
import useProductos from "../../hooks/useProductos";

const TablaProductosAdminFilas = ({ el, editarProductoBtn }) => {
  let { img, nombre, precio, stock, id } = el;

  //formateador de moneda
  function formatearMoneda(numero) {
    return new Intl.NumberFormat().format(numero);
  }
  //formateador de moneda

  const { setDataToEdit, deleteProyecto } = useProductos();

  const eliminarProducto = () => {
    if (confirm("¿Deseas eliminar este producto?")) {
      deleteProyecto(el._id);
    }
  };

  return (
    <tr>
      <td>
        <img
          src={el.img}
          alt="imagen"
          className="listaProductos__img-producto"
        />
      </td>
      <td>{el.nombre}</td>
      <td>${formatearMoneda(el.precio)}</td>
      <td>{el.stock}</td>
      <td className="listaProductos__acciones">
        <img
          src={editImg}
          alt="icono editar"
          className="listaProductos__icono"
          onClick={() => setDataToEdit(el)}
        />
        <img
          src={deleteImg}
          className="listaProductos__icono"
          onClick={() => eliminarProducto(el)}
        />
      </td>
    </tr>
  );
};

export { TablaProductosAdminFilas };
