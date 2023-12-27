import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/Signup/Signup";
import HomePage from "./Pages/HomePage/HomePage";
import ProductsPage from "./Pages/ProductsPage/ProductsPage";
import CategoryProducts from "./Pages/CategoryProducts/CategoryProducts";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route
          path="/products/category/:category"
          element={<CategoryProducts />}
        />
        <Route path="/products/:id" element={<ProductDetails />} />

        <Route path="/profile/login" element={<Login />} />
        <Route path="/profile/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
