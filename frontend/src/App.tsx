import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./pages/Layout";
import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage";
import AdDetailsPage from "./pages/AdDetailsPage";
import CounterPage from "./pages/CounterPage";
import NewAdFormPage from "./pages/NewAdForm";
import NewCategoryFormPage from "./pages/NewCategoryForm";
import AdSearchPage from "./pages/AdSearchPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="ad/new" element={<NewAdFormPage />} />
        <Route path="ad/search/:keyword" element={<AdSearchPage />} />
        <Route path="ad/:id" element={<AdDetailsPage />} />
        <Route path="category/new" element={<NewCategoryFormPage />} />
        <Route path="counter" element={<CounterPage />} />
      </Route>
    </Routes>
  );
}

export default App;
