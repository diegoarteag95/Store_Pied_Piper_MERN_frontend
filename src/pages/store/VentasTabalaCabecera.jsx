import { VentasTablaFilas } from "./VentasTablaFilas";

const VentasTabalaCabecera = ({ ventas }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Mes/Dia/Año - Hora</th>
            <th>ID Venta</th>
            <th>Cantidad Productos</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {ventas.map((el) => (
            <VentasTablaFilas key={el._id} el={el} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export { VentasTabalaCabecera };
