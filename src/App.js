import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import Navbar from "./components/Navbar";
import CartScreen from "./screens/CartScreen";
import SigninScreen from "./screens/SigninScreen";

function App() {
  return (
    <BrowserRouter>
      <div>
        <header className="">
          <Navbar />
        </header>
        <main className="container px-20 m-auto">
          <Routes>
            <Route path="/signin" element={<SigninScreen />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/product/:slug" element={<ProductScreen />} />
            <Route path="/" element={<HomeScreen />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
