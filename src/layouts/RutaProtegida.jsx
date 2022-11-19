import { Outlet, Navigate } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import useAuth from "../hooks/useAuth";
import { Loader } from "./loader/Loader";

const RutaProtegida = () => {
  const { auth, cargando } = useAuth();

  if (cargando) return <Loader />;
  return (
    <>
      {auth._id ? (
        <div>
          <Header />
          <main>
            <Outlet></Outlet>
          </main>
          <Footer />
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export { RutaProtegida };
