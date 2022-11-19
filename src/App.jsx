import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout"; //Contenedor Area Publica
//-----PAGINAS LOGIN-----
import { Login } from "./pages/login/Login";
import { Registrar } from "./pages/login/Registrar";
import { ConfirmarCuenta } from "./pages/login/ConfirmarCuenta";
import { NuevoPassword } from "./pages/login/NuevoPassword";
import { OlvidePassword } from "./pages/login/OlvidePassword";
//-----PAGINAS LOGIN-----
//-----CONTEXT-----
import { AuthProvider } from "./context/AuthProvider";
import { ProductosProvaider } from "./context/ProductoProvider";
//-----CONTEXT-----
import { RutaProtegida } from "./layouts/RutaProtegida";
//-----PAGINAS STORE-----
import { Store } from "./pages/store/Store";
import { ProductosAdmin } from "./pages/store/ProductosAdmin";
import { Carrito } from "./pages/store/Carrito";
import { VentasAdmin } from "./pages/store/VentasAdmin";
import { Producto } from "./pages/store/Producto";
//-----PAGINAS STORE-----

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProductosProvaider>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="registrar" element={<Registrar />} />
              <Route path="olvide-password" element={<OlvidePassword />} />
              <Route
                path="olvide-password/:token"
                element={<NuevoPassword />}
              />
              <Route path="confirmar/:id" element={<ConfirmarCuenta />} />
            </Route>

            <Route path="/store-pied-piper" element={<RutaProtegida />}>
              <Route index element={<Store />} />
              <Route path="carrito" element={<Carrito />} />
              <Route path="productos-admin" element={<ProductosAdmin />} />
              <Route path="ventas-admin" element={<VentasAdmin />} />
              <Route path=":id" element={<Producto />} />
            </Route>
          </Routes>
        </ProductosProvaider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
