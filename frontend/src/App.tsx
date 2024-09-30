import "./App.css";
import Header from "./components/Header";
import RecentAds from "./components/RecentAds";

function App() {
  return (
    <>
      <Header />
      <main className="main-content">
        <RecentAds />
      </main>
    </>
  );
}

export default App;
