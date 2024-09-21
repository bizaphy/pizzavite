import { Route, Routes } from "react-router-dom";
import { CartProvider } from "./context/cartcontext";
import { UserProvider } from "./context/userContext"; // Importamos el UserProvider
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Carrito from "./pages/Carrito";
import Pizza from "./pages/Pizza";
import CardPizza from "./components/CardPizza";

import "./App.css";

function App() {
  return (
    <CartProvider>
      <UserProvider>
        <div id="root">
          <div className="content">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Carrito />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/pizzas/:id" element={<Pizza />} />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </UserProvider>
    </CartProvider>
  );
}

export default App;