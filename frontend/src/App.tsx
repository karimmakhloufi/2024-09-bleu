import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./pages/Layout";
import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage";
import AdDetailsPage from "./pages/AdDetailsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="ad/:id" element={<AdDetailsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
