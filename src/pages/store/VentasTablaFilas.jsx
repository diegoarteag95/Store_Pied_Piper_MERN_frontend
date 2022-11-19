const VentasTablaFilas = ({ el }) => {
  //formateador de moneda
  function formatearMoneda(numero) {
    return new Intl.NumberFormat().format(numero);
  }
  //formateador de moneda
  return (
    <tr>
      <td>{el.fecha}</td>
      <td>{el._id}</td>
      <td>{el.cantidad}</td>
      <td>${formatearMoneda(el.valor)}</td>
    </tr>
  );
};

export { VentasTablaFilas };
