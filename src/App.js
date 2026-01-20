import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import RegistrationPage from "./pages/RegistrationPage";
import QuizPage from "./pages/QuizPage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./components/PrivateRoute";
import CalendarPage from "./pages/CalendarPage";


function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Navigate to="/registration" />} />

        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* ✅ Protected Routes */}
        <Route
          path="/quiz"
          element={
            <PrivateRoute>
              <QuizPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/products/:id"
          element={
            <PrivateRoute>
              <ProductDetailsPage />
            </PrivateRoute>
          }
        />
        <Route
  path="/calendar"
  element={
    <PrivateRoute>
      <CalendarPage />
    </PrivateRoute>
  }
/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
