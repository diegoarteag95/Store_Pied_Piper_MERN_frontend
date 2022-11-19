import { TablaProductosAdminFilas } from "./TablaProductosAdminFilas";

const TablaProductosAdminCabezera = ({ data }) => {
  return (
    <div>
      <h3 className="listaProductos__titulo">Lista de todos los productos</h3>
      <table>
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.length ? (
            data.map((el) => <TablaProductosAdminFilas key={el._id} el={el} />)
          ) : (
            <tr>
              <td colSpan={6}>Sin datos</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export { TablaProductosAdminCabezera };
