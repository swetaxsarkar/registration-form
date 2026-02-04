import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";

import RegistrationPage from "./pages/RegistrationPage";
import RegistrationList from "./pages/RegistrationList";
import QuizPage from "./pages/QuizPage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPage from "./pages/CartPage";          // ✅ STEP 5
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./components/PrivateRoute";
import CalendarPage from "./pages/CalendarPage";
import CovidChartPage from "./pages/CovidChartPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Navigate to="/registration" />} />

        {/* Public Routes */}
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/registration-list" element={<RegistrationList />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/cart" element={<CartPage />} />        {/* ✅ STEP 5 */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/covid-chart" element={<CovidChartPage />} />

        {/* Protected Routes */}
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
