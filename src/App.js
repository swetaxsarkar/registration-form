import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import RegistrationPage from "./pages/RegistrationPage";
import QuizPage from "./pages/QuizPage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Navigate to="/registration" />} />

        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/quiz" element={<QuizPage />} />

        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
