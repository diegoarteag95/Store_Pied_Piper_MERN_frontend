import "../../styles/tarjetaProductos.css";
import { Link } from "react-router-dom";

const TarjetaProductos = ({ el, agreagarCarrito }) => {
  let { img, nombre, precio, stock, id } = el;

  //formateador de moneda
  function formatearMoneda(numero) {
    return new Intl.NumberFormat().format(numero);
  }
  //formateador de moneda

  return (
    <div className="section__container-productos">
      <div className="product">
        <img className="product__img" src={el.img} alt="producto" />
        <Link to={`${el._id}`}>
          <h2 className="product__name">{el.nombre}</h2>
        </Link>
        <div className="product__details">
          <p className="product__price">
            $
            <span className="product__price-cost">
              {formatearMoneda(el.precio)}
            </span>
          </p>
          <p className="product__stock">
            Stock:
            <span className="product__stock-count">{el.stock}</span>
          </p>
          <button
            className={el.stock > 0 ? "AddCartBtn" : "NoDisponibleBtn"}
            onClick={
              el.stock > 0
                ? () => agreagarCarrito(el)
                : () =>
                    alert(
                      "Lo sentimos en el momento no contamos con este producto. pero pronto lo traeremos de nuevo!"
                    )
            }
          >
            {el.stock > 0 ? "Agragar" : "No Disponible 😢"}
          </button>
        </div>
      </div>
    </div>
  );
};

export { TarjetaProductos };
