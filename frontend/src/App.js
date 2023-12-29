import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/Signup/Signup";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import HomePage from "./Pages/HomePage/HomePage";
import ProductsPage from "./Pages/ProductsPage/ProductsPage";
import CategoryProducts from "./Pages/CategoryProducts/CategoryProducts";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import Cart from "./Pages/Cart/Cart";
import AdminProducts from "./Pages/AdminProducts/AdminProducts";
import AdminOrders from "./Pages/AdminOrders/AdminOrders";

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

        <Route path="/cart" element={<Cart />} />

        <Route path="/profile/login" element={<Login />} />
        <Route path="/profile/signup" element={<SignUp />} />

        <Route path="/profile" element={<ProfilePage />} />

        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
